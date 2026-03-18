# [수정] 2026-02-19: 설정 문자열 깨짐 복구 및 변호사 이미지 경로 연동
import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent


def _as_bool(value: str | None, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _as_list(value: str | None, default: list[str]) -> list[str]:
    if not value:
        return default
    parsed = [item.strip() for item in value.split(",") if item.strip()]
    return parsed or default


_raw_database_url = os.getenv("DATABASE_URL", "sqlite:///local.db")
if _raw_database_url.startswith("postgres://"):
    _raw_database_url = _raw_database_url.replace("postgres://", "postgresql://", 1)


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
    SQLALCHEMY_DATABASE_URI = _raw_database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WTF_CSRF_TIME_LIMIT = None
    RATELIMIT_STORAGE_URI = os.getenv("RATELIMIT_STORAGE_URI", "memory://")
    RATELIMIT_HEADERS_ENABLED = True

    # [수정] 2026-02-19: 보안 쿠키 기본값 중앙 설정
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = _as_bool(os.getenv("SESSION_COOKIE_SECURE"), False)
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_SECURE = SESSION_COOKIE_SECURE

    MAX_CONTENT_LENGTH = int(os.getenv("MAX_CONTENT_LENGTH", 2 * 1024 * 1024))
    UPLOAD_FOLDER = "app/static/uploads"
    ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}

    SITE_SETTINGS = {
        # [수정] 2026-02-19: 로펌 표시명을 Portfolio로 통일
        "site_name": os.getenv("SITE_NAME", "Portfolio Law Firm"),
        "phone_number": os.getenv("PHONE_NUMBER", "02-0000-0000"),
        "office_address": os.getenv("OFFICE_ADDRESS", "Seoul, Korea"),
        "hero_headline": os.getenv("HERO_HEADLINE", "신뢰로 해결을 설계합니다"),
        "hero_subhead": os.getenv(
            "HERO_SUBHEAD", "형사·민사·기업자문, 한 번의 상담부터 끝까지 함께합니다"
        ),
        "slogan": os.getenv("SITE_SLOGAN", "증거와 전략으로 결과를 만듭니다"),
        # [수정] 2026-02-21: 핵심 업무 분야 섹션 안내 문구를 설정으로 중앙화
        "practice_showcase_note": os.getenv(
            "PRACTICE_SHOWCASE_NOTE",
            "분야별 페이지에서 주요 대응 범위와 진행 방식, 준비 자료를 확인하실 수 있습니다.",
        ),
        # [수정] 2026-02-19: 손상된 비디오 교체에 맞춰 Hero 배경 비디오 기본 경로를 720p 파일로 갱신
        "hero_video": os.getenv("HERO_VIDEO", "uploads/hero_720p.mp4"),
        # [수정] 2026-02-20: Footer 오시는길/지도 설정을 환경변수 기반으로 중앙화
        "directions_label": os.getenv("DIRECTIONS_LABEL", "오시는길"),
        "directions_address": os.getenv(
            "DIRECTIONS_ADDRESS", "서울특별시 OO구 OO로 123"
        ),
        "map_center_city": os.getenv("MAP_CENTER_CITY", "서울특별시"),
        "map_zoom": os.getenv("MAP_ZOOM", "11"),
        # [수정] 2026-02-20: Footer 지도 렌더링을 Google embed URL 방식으로 전환
        "map_embed_url": os.getenv(
            "MAP_EMBED_URL",
            "https://maps.google.com/maps?q=Seoul&t=&z=15&ie=UTF8&iwloc=&output=embed",
        ),
    }

    # [수정] 2026-02-20: 공개 메뉴에서 Blog 항목 제거
    NAV_ITEMS = [
        {"endpoint": "public.home", "label": "Home"},
        {"endpoint": "public.about", "label": "About"},
        {"endpoint": "public.attorneys", "label": "Attorneys"},
        {"endpoint": "public.practice", "label": "Practice"},
        {"endpoint": "public.cases", "label": "Cases"},
        {"endpoint": "public.consult", "label": "Consult"},
    ]

    # [수정] 2026-02-21: Footer 프리미엄 3컬럼 + 하단 바 구성을 위한 링크/문구 설정 중앙화
    FOOTER_SETTINGS = {
        "firm_title": os.getenv("FOOTER_FIRM_TITLE", "Portfolio Law Firm"),
        "firm_slogan": os.getenv("FOOTER_FIRM_SLOGAN", "신뢰로 해결을 설계합니다."),
        "quick_links_title": os.getenv("FOOTER_QUICK_LINKS_TITLE", "Quick Links"),
        "visit_title": os.getenv("FOOTER_VISIT_TITLE", "Visit Us"),
        "view_map_label": os.getenv("FOOTER_VIEW_MAP_LABEL", "지도에서 보기"),
        "legal_links": [
            {"label": "Privacy", "href": "#"},
            {"label": "Terms", "href": "#"},
            {"label": "Business Info", "href": "#"},
        ],
    }

    FOOTER_QUICK_LINKS = [
        {"endpoint": "public.about", "label": "About"},
        {"endpoint": "public.attorneys", "label": "Attorneys"},
        {"endpoint": "public.practice", "label": "Practice"},
        {"endpoint": "public.cases", "label": "Cases"},
        {"endpoint": "public.consult", "label": "Consult"},
    ]

    TRUST_METRICS = [
        {"value": "18+", "label": "법조 경력"},
        {"value": "4,500+", "label": "누적 자문·소송"},
        {"value": "97%", "label": "의뢰인 만족도"},
    ]

    # [수정] 2026-02-20: 메인페이지(변호사 소개 하단) 섹션 문구/카드/타임라인/CTA를 중앙 설정으로 통합
    HOME_PAGE_SETTINGS = {
        "case_highlight": {
            "eyebrow": os.getenv("HOME_CASE_EYEBROW", "Cases"),
            "title": os.getenv("HOME_CASE_TITLE", "성공사례 하이라이트"),
            "empty_text": os.getenv(
                "HOME_CASE_EMPTY_TEXT", "아직 공개된 성공사례가 없습니다."
            ),
            "fallback_cards": [
                {
                    "category": "형사",
                    "result": "무혐의 처분",
                    "summary": "초기 진술 정리와 디지털 증거 반박 논리로 혐의없음 결정을 이끌었습니다.",
                },
                {
                    "category": "민사",
                    "result": "손해배상 40% 감액",
                    "summary": "청구 구조 재분석과 입증 포인트 재배치로 배상 범위를 실질적으로 낮췄습니다.",
                },
                {
                    "category": "노동",
                    "result": "부당해고 구제 성공",
                    "summary": "인사 절차 하자와 증빙 공백을 구조화해 구제 절차에서 복직 결정을 확보했습니다.",
                },
            ],
        },
        "why_us": {
            "eyebrow": os.getenv("HOME_WHY_EYEBROW", "Why Portfolio"),
            "title": os.getenv("HOME_WHY_TITLE", "검증된 전략. 체계적인 대응."),
            "subtitle": os.getenv(
                "HOME_WHY_SUBTITLE", "초기 72시간이 결과를 바꿉니다."
            ),
            "points": [
                {
                    "title": "24시간 대응 시스템",
                    "description": "사건 접수 직후 사실관계·리스크·우선순위를 빠르게 구조화합니다.",
                },
                {
                    "title": "사건 유형별 전담 배정",
                    "description": "사건 성격에 맞는 변호사와 실무진을 즉시 구성해 대응 밀도를 높입니다.",
                },
                {
                    "title": "디지털 증거 분석 체계",
                    "description": "메신저·계좌·포렌식 자료를 법리와 연결해 주장 완성도를 높입니다.",
                },
            ],
        },
        "process_timeline": {
            "eyebrow": os.getenv("HOME_PROCESS_EYEBROW", "Process"),
            "title": os.getenv("HOME_PROCESS_TITLE", "상담 진행 절차"),
            "steps": [
                {
                    "step": "01",
                    "title": "사건 분석",
                    "description": "핵심 사실관계와 쟁점을 정리하고 대응 우선순위를 수립합니다.",
                },
                {
                    "step": "02",
                    "title": "전략 수립",
                    "description": "증거, 절차, 협상/소송 경로를 결합한 실행 전략을 제안합니다.",
                },
                {
                    "step": "03",
                    "title": "실행 및 대응",
                    "description": "조사·공판·협상 각 단계에서 계획된 대응을 신속하게 실행합니다.",
                },
                {
                    "step": "04",
                    "title": "결과 및 사후 관리",
                    "description": "사건 종결 이후 이행 점검과 재발 방지 포인트까지 관리합니다.",
                },
            ],
        },
        "strong_cta": {
            "headline": os.getenv("HOME_STRONG_CTA_HEADLINE", "중요한 결정일수록"),
            "subheadline": os.getenv(
                "HOME_STRONG_CTA_SUBHEADLINE", "빠른 법률 검토가 필요합니다."
            ),
            "button_label": os.getenv("HOME_STRONG_CTA_BUTTON_LABEL", "24시간 상담 신청"),
        },
    }

    # [수정] 2026-02-19: About 페이지 문구/지표/강점 카드를 중앙 설정으로 분리
    ABOUT_PAGE_SETTINGS = {
        "hero": {
            "eyebrow": os.getenv("ABOUT_HERO_EYEBROW", "Portfolio Law Firm"),
            "title": os.getenv("ABOUT_HERO_TITLE", "법률 서비스의 새로운 기준"),
            "summary": os.getenv(
                "ABOUT_HERO_SUMMARY",
                "신뢰를 기반으로 사건의 본질을 읽고, 결과로 답하는 전담 로펌 시스템을 운영합니다.",
            ),
            "description": os.getenv(
                "ABOUT_HERO_DESCRIPTION",
                "초기 상담부터 사건 종결까지 전략, 소통, 실행을 하나의 팀으로 일관되게 수행합니다.",
            ),
            "metrics": [
                {"value": "18+", "label": "경력 기반 전문 변호사"},
                {"value": "4,500+", "label": "누적 수행 사건 경험"},
                {"value": "97%", "label": "신속 대응 만족도"},
            ],
        },
        "value_section": {
            "title": os.getenv("ABOUT_VALUE_TITLE", "고객의 신뢰는 우리의 가장 큰 가치입니다."),
            "description": os.getenv(
                "ABOUT_VALUE_DESCRIPTION",
                "각 사건의 상황과 목표를 입체적으로 분석하고, 의뢰인이 이해할 수 있는 언어로 전략을 설명합니다.",
            ),
            "checkpoints": [
                "경험 있는 변호사와 실무팀의 유기적 협업",
                "오직 의뢰인을 위한 전담 변호사 배정",
                "사건 단계별 지연 없는 책임 대응",
            ],
            "caption": os.getenv(
                "ABOUT_VALUE_CAPTION",
                "사건의 본질을 놓치지 않도록, 핵심 쟁점과 일정 관리를 끝까지 밀도 있게 수행합니다.",
            ),
        },
        "strength_section": {
            "eyebrow": os.getenv("ABOUT_STRENGTH_EYEBROW", "Expertise"),
            "title": os.getenv("ABOUT_STRENGTH_TITLE", "검증된 법률 전문가 집합"),
            "description": os.getenv(
                "ABOUT_STRENGTH_DESCRIPTION",
                "분야별 전문성을 결합해 사건의 방향을 설계하고 실행합니다.",
            ),
            "cards": [
                {
                    "icon": "bi-shield-check",
                    "title": "경력 18년 이상의 전문 변호사",
                    "description": "형사·민사·기업 분쟁까지 실무 중심 대응",
                    "chip": "전문 영역 밀착 대응",
                },
                {
                    "icon": "bi-briefcase",
                    "title": "4,500건 이상의 수행 노하우",
                    "description": "유사 사건 데이터 기반 전략 수립",
                    "chip": "누적 경험 근거 기획",
                },
                {
                    "icon": "bi-hourglass-split",
                    "title": "초기 대응 중심 전담 운영",
                    "description": "접수 직후 리스크 분석과 우선순위 정렬",
                    "chip": "속도·정확성 균형 수행",
                },
            ],
        },
        # [수정] 2026-02-21: About 페이지 History 타임라인 섹션 데이터를 중앙 설정으로 추가
        "history_section": {
            "eyebrow": os.getenv("ABOUT_HISTORY_EYEBROW", "History"),
            "title": os.getenv("ABOUT_HISTORY_TITLE", "걸어온 길, 나아갈 미래"),
            "description": os.getenv(
                "ABOUT_HISTORY_DESCRIPTION",
                "형사·민사·기업자문 중심의 전담 체계를 단계적으로 고도화해 왔습니다.",
            ),
            "items": [
                {
                    "year": "2016",
                    "title": "Portfolio Law Firm 설립",
                    "detail": "초기 구성원 5인으로 시작해 분쟁 대응 표준 프로세스를 구축했습니다.",
                },
                {
                    "year": "2020",
                    "title": "누적 상담 3,000건 돌파",
                    "detail": "기업 법무 자문팀을 신설해 대응 범위와 운영 체계를 확장했습니다.",
                },
                {
                    "year": "2023",
                    "title": "금융·중대 형사 전담 셀 개설",
                    "detail": "전담 배정 체계를 고도화하고 분야별 협업 프로토콜을 정착했습니다.",
                },
            ],
        },
        "cta": {
            "title": os.getenv("ABOUT_CTA_TITLE", "지금, 결과 중심 전략을 시작하세요"),
            "description": os.getenv(
                "ABOUT_CTA_DESCRIPTION",
                "사건 유형과 긴급도를 남기면 전담 변호사가 빠르게 상담을 제안합니다.",
            ),
            "button_label": os.getenv("ABOUT_CTA_BUTTON_LABEL", "상담 신청하기"),
        },
    }

    # [수정] 2026-02-20: 성공사례 페이지 Hero/필터/CTA 문구와 결과 필터 목록을 중앙 설정으로 분리
    # [수정] 2026-02-20: 성공사례 Hero 기본 이미지를 cases_hero.png로 변경
    CASES_PAGE_SETTINGS = {
        "hero_eyebrow": os.getenv("CASES_HERO_EYEBROW", "성공사례"),
        "hero_title": os.getenv("CASES_HERO_TITLE", "검증된 전략과 결과"),
        "hero_subtitle": os.getenv(
            "CASES_HERO_SUBTITLE",
            "사건 유형별 대응 구조와 실질 결과를 핵심 쟁점 중심으로 확인할 수 있습니다.",
        ),
        "hero_image": os.getenv("CASES_HERO_IMAGE", "uploads/cases_hero.png"),
        "hero_metrics": [
            {"value": "4,500+", "label": "누적 수행"},
            {"value": "97%", "label": "이상 만족도"},
            {"value": "72", "suffix": "시간", "label": "평균 대응 이내"},
        ],
        "search_placeholder": os.getenv(
            "CASES_SEARCH_PLACEHOLDER", "무혐의, 공판, 합의, 감형 등 키워드 검색"
        ),
        "mid_cta_title": os.getenv("CASES_MID_CTA_TITLE", "유사한 사건으로 고민 중이신가요?"),
        "mid_cta_text": os.getenv("CASES_MID_CTA_TEXT", "초기 대응이 결과를 좌우합니다."),
        "bottom_cta_title": os.getenv(
            "CASES_BOTTOM_CTA_TITLE", "결과는 준비된 전략에서 시작됩니다."
        ),
        "bottom_cta_text": os.getenv(
            "CASES_BOTTOM_CTA_TEXT", "핵심 쟁점 분석과 대응 순서 설계로 결과 가능성을 높입니다."
        ),
    }

    CASE_RESULT_FILTERS = [
        {"key": "all", "label": "전체"},
        {"key": "no_charge", "label": "무혐의"},
        {"key": "suspended_sentence", "label": "집행유예"},
        {"key": "settlement_success", "label": "합의성공"},
        {"key": "reduced_sentence", "label": "감형"},
        {"key": "other", "label": "기타"},
    ]

    # [수정] 2026-02-19: 업무분야별 상세 페이지 구성을 위해 slug/상세 데이터 필드 확장
    PRACTICE_AREAS = [
        {
            "slug": "criminal-defense",
            "name": "형사",
            "name_en": "Criminal Defense",
            "description": "수사 초기 대응부터 영장·공판 변론까지 위기 대응 컨트롤타워",
            "lead": "초기 진술과 증거 보전 단계에서 사건 방향이 결정됩니다. 조사 전 전략 수립으로 불필요한 리스크를 줄입니다.",
            "service_scope": [
                {
                    "title": "경찰·검찰 조사 입회 및 진술 전략 수립",
                    "detail": "조사 전 사실관계와 진술 포인트를 정리해 모순 진술과 불필요한 리스크를 줄입니다.",
                },
                {
                    "title": "구속영장 실질심사, 보석·석방 대응",
                    "detail": "영장 사유를 반박할 자료를 선별해 제출하고, 불구속 수사 전환 가능성을 높입니다.",
                },
                {
                    "title": "공판 단계 변론과 양형 자료 구성",
                    "detail": "증거능력·사실관계·양형 사유를 분리해 재판부가 이해하기 쉬운 구조로 변론합니다.",
                },
                {
                    "title": "피해자 합의 및 손해배상 연계 자문",
                    "detail": "합의 절차와 손해배상 계획을 함께 설계해 처분 및 양형에 반영될 수 있도록 대응합니다.",
                },
            ],
            "key_points": [
                "초기 72시간 대응 프로토콜 운영",
                "디지털 증거·계좌내역 등 사실관계 정밀 검토",
                "사건 종결 이후 재발 방지 체크리스트 제공",
            ],
            "recommended_docs": [
                "소환장·출석요구서 사본",
                "메신저/통화기록 캡처 및 원본 파일",
                "사건 경위 타임라인 메모",
            ],
        },
        {
            "slug": "civil-litigation",
            "name": "민사",
            "name_en": "Civil Litigation",
            "description": "계약·손해배상·부동산 분쟁의 전략 수립과 소송 수행",
            "lead": "문서와 사실관계를 구조화해 협상과 소송의 우선순위를 정합니다. 비용 대비 결과를 고려한 실행안을 제시합니다.",
            "service_scope": [
                {
                    "title": "계약 분쟁·채권 회수·손해배상 청구",
                    "detail": "계약 해석과 이행 경과를 재구성해 청구·방어 포지션을 명확하게 설정합니다.",
                },
                {
                    "title": "부동산 매매·임대차·하자 분쟁 대응",
                    "detail": "권리관계와 하자·대금 쟁점을 분리해 분쟁의 핵심 포인트를 선명하게 만듭니다.",
                },
                {
                    "title": "가압류·가처분 등 보전처분 신청",
                    "detail": "판결 전 자산 보전 필요성을 입증해 회수 가능성과 협상력을 함께 확보합니다.",
                },
                {
                    "title": "판결 이후 강제집행 단계까지 후속 수행",
                    "detail": "확정판결 이후 집행 절차를 연속 수행해 실질 회수까지 이어지도록 관리합니다.",
                },
            ],
            "key_points": [
                "초기 증거 보전 및 법적 포지션 명확화",
                "협상안/소송안 병행 제시로 의사결정 지원",
                "집행 가능성까지 고려한 종결 전략 설계",
            ],
            "recommended_docs": [
                "계약서·합의서·세금계산서 등 거래 문서",
                "대금 지급 내역(계좌이체/영수증)",
                "상대방과의 문자·이메일·내용증명",
            ],
        },
        {
            "slug": "corporate-advisory",
            "name": "기업자문",
            "name_en": "Corporate Advisory",
            "description": "거래 구조 설계, 컴플라이언스, 분쟁 예방 중심 리스크 관리",
            "lead": "사후 소송보다 사전 통제가 비용을 줄입니다. 계약·인사·규제 대응을 정례화해 분쟁 가능성을 낮춥니다.",
            "service_scope": [
                {
                    "title": "계약서 검토 및 거래 구조 리스크 진단",
                    "detail": "거래 목적에 맞는 계약 구조를 설계하고 불리한 조항을 사전에 조정합니다.",
                },
                {
                    "title": "내부통제·개인정보·공정거래 컴플라이언스",
                    "detail": "규제 이슈를 점검표 기반으로 관리해 감사·조사 리스크를 낮춥니다.",
                },
                {
                    "title": "이사회/주주총회 운영 및 지배구조 자문",
                    "detail": "의사결정 절차와 기록 체계를 정비해 사후 분쟁 가능성을 줄입니다.",
                },
                {
                    "title": "분쟁 징후 단계의 사전 협상·대응 체계 구축",
                    "detail": "분쟁이 본격화되기 전 사실관계 정리와 커뮤니케이션 기준을 선제적으로 마련합니다.",
                },
            ],
            "key_points": [
                "업종별 체크리스트 기반 상시 자문 운영",
                "법무·재무·실무부서 협업형 이슈 관리",
                "분쟁 발생 시 보고 체계와 커뮤니케이션 일원화",
            ],
            "recommended_docs": [
                "표준계약서 및 최근 체결 계약서",
                "내부 규정/업무 프로세스 문서",
                "최근 컴플라이언스 점검 결과",
            ],
        },
        {
            "slug": "labor-employment",
            "name": "노동",
            "name_en": "Labor & Employment",
            "description": "해고·징계·임금 분쟁 대응과 사용자·근로자 대리",
            "lead": "노동 분쟁은 문서와 절차의 완성도가 핵심입니다. 예방 자문과 분쟁 대응을 하나의 프로세스로 운영합니다.",
            "service_scope": [
                {
                    "title": "징계·해고·전보 등 인사조치 적법성 검토",
                    "detail": "절차 준수 여부와 입증자료를 점검해 부당징계·부당해고 위험을 사전에 관리합니다.",
                },
                {
                    "title": "임금·퇴직금·근로시간 관련 분쟁 대응",
                    "detail": "근로기록과 지급내역을 구조화해 쟁점별 대응 시나리오를 수립합니다.",
                },
                {
                    "title": "노동청 진정·노동위원회 구제 절차 대리",
                    "detail": "조사·심문 단계별 제출자료와 진술 전략을 설계해 대응 일관성을 높입니다.",
                },
                {
                    "title": "취업규칙·인사규정 개정 및 현장 교육",
                    "detail": "내부 규정 정비와 실무 교육을 병행해 분쟁 재발 가능성을 낮춥니다.",
                },
            ],
            "key_points": [
                "사내 문서 기준 정비로 분쟁 선제 예방",
                "노사관계 이슈별 증거 수집 포맷 표준화",
                "조정·합의와 소송의 병행 전략 운영",
            ],
            "recommended_docs": [
                "근로계약서·취업규칙·인사발령 문서",
                "급여대장·출퇴근기록·성과평가 자료",
                "사내 공지·경고장·면담 기록",
            ],
        },
        {
            "slug": "family-inheritance",
            "name": "가사",
            "name_en": "Family & Inheritance",
            "description": "이혼·상속·재산분할 쟁점의 비공개 맞춤형 대응",
            "lead": "감정 소모를 줄이면서도 재산·양육·상속의 핵심 쟁점을 놓치지 않는 균형형 전략을 제시합니다.",
            "service_scope": [
                {
                    "title": "이혼·재산분할·위자료·친권/양육권 분쟁",
                    "detail": "당사자 목표를 우선순위로 정리해 재산·양육 쟁점을 단계별로 대응합니다.",
                },
                {
                    "title": "상속재산 분할·유류분·유언 효력 검토",
                    "detail": "상속재산 범위와 기여분·유류분 계산을 근거 중심으로 정리합니다.",
                },
                {
                    "title": "가사조정·가압류 등 임시 처분 대응",
                    "detail": "조정·임시처분 절차를 활용해 장기 소송 전 실익을 선제 확보합니다.",
                },
                {
                    "title": "개인정보 보호를 고려한 비공개 절차 운영",
                    "detail": "민감한 가족정보 노출을 최소화하는 문서 작성·제출 방식을 적용합니다.",
                },
            ],
            "key_points": [
                "분쟁 장기화를 줄이기 위한 합의 프레임 설계",
                "재산 현황 파악 및 증빙 체계화",
                "판결 이후 이행 확보 방안까지 사전 검토",
            ],
            "recommended_docs": [
                "혼인관계·가족관계 증명서류",
                "부동산·금융자산·채무 관련 자료",
                "상속 관련 유언장·증여계약서",
            ],
        },
        {
            "slug": "tax-investigation",
            "name": "조세",
            "name_en": "Tax Investigation",
            "description": "세무조사 대응, 조세불복, 기업 세무 리스크 진단",
            "lead": "조세 이슈는 조사 초기 설명 방식과 자료 제출 전략이 핵심입니다. 과세 단계별 대응 시나리오를 사전에 마련합니다.",
            "service_scope": [
                {
                    "title": "국세·지방세 세무조사 대응",
                    "detail": "조사 통지 직후 쟁점별 자료 제출 계획을 수립해 조사 리스크를 줄입니다.",
                },
                {
                    "title": "과세전적부심·이의신청·심판청구",
                    "detail": "불복 절차별 주장 구조를 설계해 과세 처분의 위법·부당성을 체계적으로 다툽니다.",
                },
                {
                    "title": "법인·오너 리스크 점검 및 개선안 제시",
                    "detail": "거래·회계·의사결정 기록을 진단해 반복 노출되는 세무 리스크를 정리합니다.",
                },
                {
                    "title": "형사 조세 이슈 연계 대응",
                    "detail": "조세 쟁점과 형사 리스크가 연결된 사안을 통합 관점으로 대응합니다.",
                },
            ],
            "key_points": [
                "쟁점별 사실관계와 법리 분리 검토",
                "조사 단계 커뮤니케이션 창구 단일화",
                "사후 동일 이슈 재발 방지 체계 수립",
            ],
            "recommended_docs": [
                "세무조사 통지서 및 질의서",
                "회계장부·증빙·신고서 사본",
                "내부 의사결정 기록 및 거래 배경 문서",
            ],
        },
    ]

    # [수정] 2026-02-19: 업무분야 상세 페이지 공통 CTA/아이콘 설정을 중앙화
    PRACTICE_DETAIL_SETTINGS = {
        "cta_headline": os.getenv("PRACTICE_CTA_HEADLINE", "초기 대응이 결과를 좌우합니다."),
        "cta_subhead": os.getenv("PRACTICE_CTA_SUBHEAD", "사건 접수 후 72시간 이내 전략 수립"),
        "cta_button_label": os.getenv("PRACTICE_CTA_BUTTON_LABEL", "상담 신청하기"),
        "scope_heading": os.getenv("PRACTICE_SCOPE_HEADING", "주요 대응 범위"),
        "points_heading": os.getenv("PRACTICE_POINTS_HEADING", "핵심 수행 포인트"),
        "docs_heading": os.getenv("PRACTICE_DOCS_HEADING", "초기 상담 준비 자료"),
        "keyword_label": os.getenv("PRACTICE_KEYWORD_LABEL", "핵심 대응 키워드"),
        # [수정] 2026-02-19: 상세 Hero 공통 배경 이미지를 env 기반으로 중앙 관리
        # [수정] 2026-02-19: 상세 Hero 기본 이미지 확장자를 png 경로로 변경
        "default_hero_image": os.getenv("PRACTICE_DEFAULT_HERO_IMAGE", "uploads/practice_hero.png"),
    }
    # [수정] 2026-02-19: 주요 대응 범위 아이콘을 이모지에서 Bootstrap 라인 아이콘 클래스로 변경
    PRACTICE_SCOPE_ICONS = [
        "bi-search",
        "bi-file-earmark-text",
        "bi-bank",
        "bi-briefcase",
        "bi-shield-check",
        "bi-journal-check",
    ]
    # [수정] 2026-02-19: 업무분야별 주요 대응 범위 아이콘을 세부 매핑으로 분리
    PRACTICE_SCOPE_ICON_MAP = {
        "criminal-defense": [
            "bi-person-badge",
            "bi-file-earmark-ruled",
            "bi-bank2",
            # [수정] 2026-02-19: 형사 4번째 아이콘 누락 이슈를 위해 사용 가능한 라인 아이콘으로 교체
            "bi-person-check",
        ],
        "civil-litigation": [
            "bi-file-earmark-text",
            "bi-house-door",
            "bi-shield-check",
            "bi-hammer",
        ],
        "corporate-advisory": [
            "bi-diagram-3",
            "bi-check2-square",
            "bi-people",
            "bi-building-check",
        ],
        "labor-employment": [
            "bi-person-workspace",
            "bi-clock-history",
            "bi-building",
            "bi-journal-text",
        ],
        "family-inheritance": [
            "bi-people",
            "bi-file-earmark-text",
            "bi-shield-exclamation",
            "bi-eye-slash",
        ],
        "tax-investigation": [
            "bi-receipt",
            "bi-clipboard2-check",
            "bi-bar-chart-line",
            "bi-link-45deg",
        ],
    }

    # [수정] 2026-02-19: 변호사 상세 페이지 구성을 위해 프로필/탭/타임라인 데이터를 중앙화
    # [수정] 2026-02-19: 사용자 요청에 맞춰 변호사 이름/주력 사건 정보를 기존 값으로 원복
    # [수정] 2026-02-19: 카드 핵심문구/태그를 기존 설명 톤에 맞춰 미세조정
    ATTORNEYS = [
        {
            "slug": "kim-seoyun",
            "name": "김서윤",
            "role": "대표 변호사",
            "description": "형사·기업 위기관리 전담, 주요 사건 초기 대응 경험 다수",
            "headline": "형사·기업 위기관리 초기 대응 전담",
            "image": "uploads/lawyer1.png",
            "tags": ["형사", "기업", "위기관리"],
            "badges": ["대한변협 형사전문 등록", "서울지방변호사회 정회원"],
            "focus_expertise": [
                "형사 사건 초기 72시간 대응 체계 운영",
                "영장실질심사·구속적부심 대응",
                "기업 리스크 연계 형사 이슈 대응",
            ],
            "major_performance": [
                "경찰·검찰 조사 전략 수립 및 진술 코칭",
                "피해자 합의·손해배상 연계 협상",
                "공판 단계별 쟁점 구성 및 변론",
            ],
            "representative_cases": [
                {
                    "title": "특정경제범죄 방어",
                    "summary": "초기 진술 방향을 재정렬해 구속영장 기각을 이끌고 불구속 수사로 전환",
                },
                {
                    "title": "기업 위기관리 자문",
                    "summary": "형사 리스크와 대외 커뮤니케이션 이슈를 병행 관리해 피해 확산을 차단",
                },
                {
                    "title": "강제수사 대응 자문",
                    "summary": "압수수색 집행 단계부터 위법수집 증거 쟁점을 선제 제기",
                },
            ],
            "work_process": [
                "사건 접수 후 24시간 내 사실관계 정리",
                "핵심 리스크·우선 대응안 1차 브리핑",
                "수사·공판 단계별 실행 체크포인트 공유",
            ],
            "career_timeline": [
                {"year": "2025", "detail": "Portfolio 대표 변호사"},
                {"year": "2022", "detail": "형사 전문팀 파트너 변호사"},
                {"year": "2019", "detail": "검찰 수사관 출신 자문위원 협업체계 구축"},
                {"year": "2016", "detail": "사법연수원 수료 및 변호사 개업"},
            ],
        },
        {
            "slug": "park-dohun",
            "name": "박도훈",
            "role": "파트너 변호사",
            "description": "민사·부동산 분쟁, 집행 단계까지 이어지는 결과 중심 수행",
            "headline": "집행 단계까지 이어지는 결과 중심 수행",
            "image": "uploads/lawyer2.png",
            "tags": ["민사", "부동산", "집행"],
            "badges": ["대한변협 민사법 전문", "한국가족법학회 정회원"],
            "focus_expertise": [
                "민사·부동산 분쟁의 핵심 쟁점 구조화",
                "가압류·가처분 등 보전처분 선제 대응",
                "판결 후 강제집행 단계까지 연속 수행",
            ],
            "major_performance": [
                "손해배상 청구 및 방어 시나리오 설계",
                "피해자 대리 합의안 작성·이행관리",
                "부동산·금전채권 집행 절차 수행",
            ],
            "representative_cases": [
                {
                    "title": "부동산 매매대금 분쟁",
                    "summary": "보전처분과 본안 소송을 병행해 자금 회수 가능성을 높임",
                },
                {
                    "title": "공사대금 청구 사건",
                    "summary": "증빙 재구성으로 채권 인정 범위를 확대하고 판결 후 집행까지 완료",
                },
                {
                    "title": "손해배상 집행 사건",
                    "summary": "확정판결 이후 집행 단계까지 연속 대응해 실질 회수 성과 확보",
                },
            ],
            "work_process": [
                "분쟁 목적과 우선순위를 수치화해 목표 설정",
                "협상/소송 병행 시나리오를 단계별 제시",
                "진행 경과를 주간 단위로 공유",
            ],
            "career_timeline": [
                {"year": "2024", "detail": "Portfolio 파트너 변호사"},
                {"year": "2021", "detail": "민사·가사 소송 전담팀 리드"},
                {"year": "2018", "detail": "대형 로펌 분쟁해결그룹 근무"},
                {"year": "2015", "detail": "사법시험 합격 및 연수원 수료"},
            ],
        },
        {
            "slug": "lee-hayun",
            "name": "이하윤",
            "role": "파트너 변호사",
            "description": "노동·가사 자문, 협상과 소송 병행으로 갈등 비용 최소화",
            "headline": "협상·소송 병행으로 갈등 비용 최소화",
            "image": "uploads/lawyer3.png",
            "tags": ["노동", "가사", "협상"],
            "badges": ["노동법 실무연구회 회원", "가사소송 실무협의회 위원"],
            "focus_expertise": [
                "노동 분쟁의 절차·증거 리스크 진단",
                "가사 사건 협의/소송 병행 전략 수립",
                "장기 분쟁의 비용·시간 리스크 관리",
            ],
            "major_performance": [
                "해고·징계·임금 분쟁 대응 자문",
                "이혼·상속 분쟁의 협상안 설계",
                "조정·소송 병행으로 갈등 비용 최소화",
            ],
            "representative_cases": [
                {
                    "title": "부당해고 구제 사건",
                    "summary": "근로기준법 쟁점 정리로 조정 단계에서 합리적 종결안 도출",
                },
                {
                    "title": "임금·퇴직금 분쟁",
                    "summary": "정산 근거 재구성으로 손실 범위를 줄이고 조기 종결 유도",
                },
                {
                    "title": "상속재산 분할 협상",
                    "summary": "협상안 구조화와 소송 병행 전략으로 가족 간 갈등 비용 절감",
                },
            ],
            "work_process": [
                "상황 진단 후 협상/소송 우선순위 설정",
                "쟁점별 증거·일정 관리표 제공",
                "중간 점검 미팅으로 전략 유연하게 조정",
            ],
            "career_timeline": [
                {"year": "2024", "detail": "Portfolio 노동·가사 파트너"},
                {"year": "2020", "detail": "노동·가사 분쟁 팀장"},
                {"year": "2017", "detail": "분쟁해결그룹 노동·가사 전담"},
                {"year": "2014", "detail": "변호사 자격 취득"},
            ],
        },
    ]

    # [수정] 2026-02-19: 변호사 페이지의 Hero/탭/버튼 문구를 설정값으로 통합
    ATTORNEYS_PAGE_SETTINGS = {
        "hero_title": os.getenv("ATTORNEYS_HERO_TITLE", "전담 변호사 팀"),
        "hero_message": os.getenv(
            "ATTORNEYS_HERO_MESSAGE",
            "사건 성격에 맞는 전담팀을 빠르게 배정해 초기 대응부터 결과까지 밀도 있게 수행합니다.",
        ),
        "hero_metrics": [
            {"icon": "bi-clock-history", "label": "24시간 대응"},
            {"icon": "bi-people", "label": "전담 배정"},
            {"icon": "bi-diagram-3", "label": "사건 유형별 팀 구성"},
        ],
        "grid_title": "전담 변호사 선택",
        "grid_subtitle": "프로필을 비교하고 바로 상담으로 연결하세요.",
        "profile_button_label": "프로필 보기",
        "consult_button_label": "상담 신청",
        "detail_title": "선택된 변호사 상세",
        "detail_subtitle": "카드 선택 시 상세 정보가 즉시 전환됩니다.",
        "detail_tabs": [
            {"key": "focus_expertise", "label": "핵심 전문"},
            {"key": "major_performance", "label": "주요 수행"},
            {"key": "representative_cases", "label": "대표 사례"},
            {"key": "work_process", "label": "진행 방식"},
            {"key": "career_timeline", "label": "학력/경력"},
        ],
    }

    # [수정] 2026-02-19: 사용자가 빠르게 담당 변호사를 고를 수 있도록 케이스 매칭 규칙 추가
    ATTORNEY_MATCHING_RULES = [
        {
            "case_hint": "긴급체포/구속 가능성",
            "recommended_slug": "kim-seoyun",
            "recommended_text": "김서윤 대표 변호사 추천",
        },
        {
            "case_hint": "피해자 합의/손해배상",
            "recommended_slug": "park-dohun",
            "recommended_text": "박도훈 파트너 변호사 추천",
        },
        {
            "case_hint": "노동/가사 분쟁",
            "recommended_slug": "lee-hayun",
            "recommended_text": "이하윤 파트너 변호사 추천",
        },
    ]

    # [수정] 2026-02-19: 변호사 상세 하단 간편 상담 CTA 문구/선택지를 중앙화
    ATTORNEY_QUICK_FORM = {
        "title": "담당 변호사 배정 상담",
        "description": "사건유형·긴급도·연락처만 남겨주시면 24시간 이내 회신드립니다.",
        "urgency_options": ["긴급", "당일", "1~3일 내", "일반"],
        "submit_label": "상담 신청하기",
        "response_note": "24시간 이내 회신",
    }

    CASE_CATEGORIES = _as_list(
        os.getenv("CASE_CATEGORIES"),
        ["형사", "민사", "기업자문", "노동", "가사", "조세"],
    )
    CONSULT_CATEGORIES = _as_list(
        os.getenv("CONSULT_CATEGORIES"),
        ["형사", "민사", "기업자문", "노동", "가사", "조세"],
    )

    # [수정] 2026-02-20: 온라인 상담 페이지 Hero/신뢰포인트/폼 안내 문구를 중앙 설정으로 통합
    CONSULT_PAGE_SETTINGS = {
        "hero_eyebrow": os.getenv("CONSULT_HERO_EYEBROW", "CONSULT"),
        "hero_title": os.getenv("CONSULT_HERO_TITLE", "온라인 상담 신청"),
        "hero_subtitle": os.getenv(
            "CONSULT_HERO_SUBTITLE", "초기 대응이 결과를 좌우합니다."
        ),
        "hero_notice": os.getenv(
            "CONSULT_HERO_NOTICE", "접수 후 24시간 이내 회신드립니다."
        ),
        "trust_points": [
            {"icon": "bi-clock-history", "text": "24시간 대응"},
            {"icon": "bi-person-badge", "text": "사건 유형별 전담 배정"},
            {"icon": "bi-shield-lock", "text": "비밀보장"},
        ],
        "message_guide": os.getenv(
            "CONSULT_MESSAGE_GUIDE", "사건 개요 / 진행 상황 / 긴급 여부를 작성해주세요."
        ),
        "submit_label": os.getenv(
            "CONSULT_SUBMIT_LABEL", "24시간 상담 접수하기"
        ),
        "privacy_note": os.getenv(
            "CONSULT_PRIVACY_NOTE", "※ 모든 상담 내용은 철저히 비밀 보장됩니다."
        ),
    }

    CONSULT_STEPS = [
        {"step": "1", "title": "사실 확인", "description": "핵심 사실·증거·일정 리스크를 구조화합니다."},
        {"step": "2", "title": "전략 제시", "description": "성공 방향과 리스크를 수치 기반으로 설명합니다."},
        {"step": "3", "title": "실행", "description": "협상·조사·소송 단계별 실행안을 즉시 적용합니다."},
        {"step": "4", "title": "사후관리", "description": "종결 이후 재발 방지 조치까지 제공합니다."},
    ]

    FINAL_CTA = {
        "headline": "중요한 결정일수록 빠른 법률 검토가 필요합니다",
        "description": "지금 상담을 남기시면 담당 변호사가 우선 연락드립니다.",
    }

    INQUIRY_STATUS_OPTIONS = ["new", "in_progress", "done"]
    INQUIRY_STATUS_LABELS = {
        "new": "신규",
        "in_progress": "진행중",
        "done": "완료",
    }
