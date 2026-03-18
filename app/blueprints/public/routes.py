# [수정] 2026-02-20: 성공사례 페이지 필터/상세 구조 렌더링을 위한 데이터 가공 로직 추가
import re
from typing import Any

from flask import abort, current_app, flash, redirect, render_template, request, url_for

from app.blueprints.public import public_bp
from app.blueprints.public.forms import ConsultForm
from app.extensions import db, limiter
# [수정] 2026-02-20: 공개 Blog 페이지 제거에 따라 Post 모델 의존성을 삭제
from app.models import Case, Inquiry


def _find_practice_area_by_slug(slug: str) -> dict | None:
    # [수정] 2026-02-19: 업무분야 상세 라우팅을 위한 slug 조회 로직 공용화
    practice_areas = current_app.config.get("PRACTICE_AREAS", [])
    return next((area for area in practice_areas if area.get("slug") == slug), None)


def _to_filter_key(value: str) -> str:
    normalized = re.sub(r"[^0-9a-zA-Z가-힣]+", "-", (value or "").strip().lower())
    return normalized.strip("-") or "other"


def _normalize_case_outcome_key(result_text: str) -> str:
    text = (result_text or "").replace(" ", "")
    if any(keyword in text for keyword in ["무혐의", "혐의없음", "불기소", "불송치"]):
        return "no_charge"
    if "집행유예" in text:
        return "suspended_sentence"
    if any(keyword in text for keyword in ["합의", "조정", "화해"]):
        return "settlement_success"
    if any(keyword in text for keyword in ["감형", "감경", "기소유예", "선처", "벌금"]):
        return "reduced_sentence"
    return "other"


def _build_case_detail_sections(case_item: Case) -> dict[str, Any]:
    lines = [line.strip() for line in (case_item.content or "").splitlines() if line.strip()]

    # [수정] 2026-02-20: 콘텐츠 형식이 제각각이어도 공통 5단 구조를 안정적으로 렌더링하도록 기본 문구 보정
    defaults = {
        "background": case_item.summary,
        "client_state": "의뢰인은 초기 대응 시점에서 불확실성과 절차 부담이 큰 상황이었습니다.",
        "legal_issue": "사실관계와 법리 포인트를 분리해 핵심 쟁점을 구조화했습니다.",
        "risk_factor": "조사·공판 단계의 위험 요소를 선제적으로 정리해 대응 우선순위를 설정했습니다.",
        "strategy_summary": "초기 진술·증거 정리·협상/소송 병행 전략으로 실행안을 수립했습니다.",
        "result_conversion": f"{case_item.result} 결과를 확보했습니다.",
        "impact_meaning": "의뢰인의 리스크와 절차적 부담을 줄이고 사건 종결 이후까지 관리했습니다.",
    }

    strategy_points: list[str] = []
    for line in lines:
        compact = line.lstrip("-•* ")
        if line.startswith(("-", "•", "*")) and compact:
            strategy_points.append(compact)

    if not strategy_points:
        strategy_points = [
            "초기 진술 방향 설계",
            "디지털 증거 반박 논리 구성",
            "피해자 합의 선제적 접근",
        ]

    values = {
        "background": lines[0] if len(lines) > 0 else defaults["background"],
        "client_state": lines[1] if len(lines) > 1 else defaults["client_state"],
        "legal_issue": lines[2] if len(lines) > 2 else defaults["legal_issue"],
        "risk_factor": lines[3] if len(lines) > 3 else defaults["risk_factor"],
        "strategy_summary": lines[4] if len(lines) > 4 else defaults["strategy_summary"],
        "result_conversion": lines[5] if len(lines) > 5 else defaults["result_conversion"],
        "impact_meaning": lines[6] if len(lines) > 6 else defaults["impact_meaning"],
    }

    return {
        "overview": {
            "background": values["background"],
            "client_state": values["client_state"],
        },
        "issues": {
            "legal_issue": values["legal_issue"],
            "risk_factor": values["risk_factor"],
        },
        "strategy": {
            "summary": values["strategy_summary"],
            "points": strategy_points[:3],
        },
        "result": {
            "final": case_item.result,
            "conversion": values["result_conversion"],
        },
        "impact": {
            "meaning": values["impact_meaning"],
        },
    }


@public_bp.route("/")
def home():
    case_highlights = (
        Case.query.filter_by(published=True).order_by(Case.created_at.desc()).limit(3).all()
    )
    return render_template("public/home.html", case_highlights=case_highlights)


@public_bp.route("/about")
def about():
    return render_template("public/about.html")


@public_bp.route("/attorneys")
def attorneys():
    return render_template("public/attorneys.html")


@public_bp.route("/practice")
def practice():
    # [수정] 2026-02-19: 업무분야 페이지를 목록 + 상세 링크 렌더링 형태로 확장
    practice_areas = current_app.config.get("PRACTICE_AREAS", [])
    return render_template("public/practice.html", practice_areas=practice_areas)


@public_bp.route("/practice/<slug>")
def practice_detail(slug: str):
    # [수정] 2026-02-19: 업무분야별 상세 페이지 라우트 추가
    area = _find_practice_area_by_slug(slug)
    if area is None:
        abort(404)
    return render_template("public/practice_detail.html", area=area)


@public_bp.route("/cases")
def cases():
    # [수정] 2026-02-20: 성공사례 페이지용 필터/상세 구조 렌더링 데이터 가공
    published_cases = Case.query.filter_by(published=True).order_by(Case.created_at.desc()).all()

    cases_page_settings = current_app.config.get("CASES_PAGE_SETTINGS", {})
    configured_category_labels = current_app.config.get("CASE_CATEGORIES", [])
    configured_outcome_filters = current_app.config.get("CASE_RESULT_FILTERS", [])

    category_filters = [{"key": "all", "label": "전체"}]
    category_filters.extend(
        {
            "key": _to_filter_key(label),
            "label": label,
        }
        for label in configured_category_labels
    )

    outcome_map = {item.get("key"): item for item in configured_outcome_filters}
    case_cards: list[dict[str, Any]] = []

    for case_item in published_cases:
        outcome_key = _normalize_case_outcome_key(case_item.result)
        outcome_label = outcome_map.get(outcome_key, {}).get("label", "기타")

        category_label = (case_item.category or "기타").strip()
        category_key = _to_filter_key(category_label)

        detail_sections = _build_case_detail_sections(case_item)
        search_text = " ".join(
            [
                category_label,
                case_item.title,
                case_item.summary,
                case_item.result,
                detail_sections["overview"]["background"],
                detail_sections["issues"]["legal_issue"],
                detail_sections["strategy"]["summary"],
            ]
        ).lower()

        case_cards.append(
            {
                "id": case_item.id,
                "slug": case_item.slug,
                "category": category_label,
                "category_key": category_key,
                "title": case_item.title,
                "summary": case_item.summary,
                "result": case_item.result,
                "outcome_key": outcome_key,
                "outcome_label": outcome_label,
                "detail": detail_sections,
                "search_text": search_text,
            }
        )

    # [수정] 2026-02-20: DB에 있는 카테고리가 설정 목록에 없을 경우 필터에 자동 추가
    existing_category_keys = {item["key"] for item in category_filters}
    for card in case_cards:
        if card["category_key"] not in existing_category_keys:
            category_filters.append(
                {
                    "key": card["category_key"],
                    "label": card["category"],
                }
            )
            existing_category_keys.add(card["category_key"])

    return render_template(
        "public/cases.html",
        cases=published_cases,
        case_cards=case_cards,
        case_category_filters=category_filters,
        case_outcome_filters=configured_outcome_filters,
        cases_page_settings=cases_page_settings,
    )


@public_bp.route("/consult", methods=["GET", "POST"])
@limiter.limit("5 per minute", methods=["POST"])
def consult():
    form = ConsultForm()

    if form.validate_on_submit():
        ip_address = request.headers.get("X-Forwarded-For", request.remote_addr or "")
        if "," in ip_address:
            ip_address = ip_address.split(",")[0].strip()

        inquiry = Inquiry(
            name=form.name.data.strip(),
            phone=form.phone.data.strip(),
            email=(form.email.data or "").strip() or None,
            category=form.category.data,
            message=form.message.data.strip(),
            consent_privacy=form.privacy_consent.data,
            ip_address=ip_address[:64],
            user_agent=(request.user_agent.string or "")[:255],
        )
        db.session.add(inquiry)
        db.session.commit()

        flash("상담 요청이 접수되었습니다. 담당자가 빠르게 연락드리겠습니다.", "success")
        return redirect(url_for("public.consult"))

    return render_template("public/consult.html", form=form)
