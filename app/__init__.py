# [수정] 2026-02-18: 앱 팩토리, 전역 컨텍스트, 관리자 시드 CLI 추가
import os
from datetime import datetime, timezone

import click
from dotenv import load_dotenv
from flask import Flask

from app.blueprints.admin import admin_bp
from app.blueprints.public import public_bp
from app.config import Config
from app.extensions import csrf, db, limiter, login_manager, migrate


@login_manager.user_loader
def load_user(user_id: str):
    # [수정] 2026-02-18: 로그인 사용자 로더 등록
    from app.models import User

    return db.session.get(User, int(user_id))


def create_app(config_object: type[Config] = Config) -> Flask:
    load_dotenv()

    app = Flask(__name__)
    app.config.from_object(config_object)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    csrf.init_app(app)
    limiter.init_app(app)

    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp, url_prefix="/admin")

    @app.context_processor
    def inject_global_context() -> dict:
        # [수정] 2026-02-18: 템플릿 전역 공통 데이터 주입
        return {
            "site_settings": app.config["SITE_SETTINGS"],
            "nav_items": app.config["NAV_ITEMS"],
            # [수정] 2026-02-21: Footer 전용 문구/링크 설정을 템플릿 전역 컨텍스트에 추가
            "footer_settings": app.config["FOOTER_SETTINGS"],
            "footer_quick_links": app.config["FOOTER_QUICK_LINKS"],
            "trust_metrics": app.config["TRUST_METRICS"],
            # [수정] 2026-02-20: 메인페이지 하단 섹션 구성을 위한 홈 전용 설정 컨텍스트 추가
            "home_page_settings": app.config["HOME_PAGE_SETTINGS"],
            # [수정] 2026-02-19: About 페이지 전용 콘텐츠 설정을 전역 컨텍스트에 주입
            "about_page_settings": app.config["ABOUT_PAGE_SETTINGS"],
            # [수정] 2026-02-20: 성공사례 페이지 전용 설정을 전역 컨텍스트에 주입
            "cases_page_settings": app.config["CASES_PAGE_SETTINGS"],
            "case_result_filters": app.config["CASE_RESULT_FILTERS"],
            "practice_areas": app.config["PRACTICE_AREAS"],
            # [수정] 2026-02-19: 업무분야 상세 페이지 공통 스타일/문구 설정을 전역 컨텍스트에 추가
            "practice_detail_settings": app.config["PRACTICE_DETAIL_SETTINGS"],
            "practice_scope_icons": app.config["PRACTICE_SCOPE_ICONS"],
            # [수정] 2026-02-19: 업무분야 상세 '주요 대응 범위' 아이콘 세부 매핑을 전역 컨텍스트에 추가
            "practice_scope_icon_map": app.config["PRACTICE_SCOPE_ICON_MAP"],
            "attorneys_profiles": app.config["ATTORNEYS"],
            # [수정] 2026-02-19: 변호사 상세 페이지 전용 문구/매칭/CTA 설정을 전역 컨텍스트에 추가
            "attorneys_page_settings": app.config["ATTORNEYS_PAGE_SETTINGS"],
            "attorney_matching_rules": app.config["ATTORNEY_MATCHING_RULES"],
            "attorney_quick_form": app.config["ATTORNEY_QUICK_FORM"],
            "consult_categories": app.config["CONSULT_CATEGORIES"],
            # [수정] 2026-02-20: 온라인 상담 페이지 Hero/폼 UI 문구 컨텍스트 추가
            "consult_page_settings": app.config["CONSULT_PAGE_SETTINGS"],
            "consult_steps": app.config["CONSULT_STEPS"],
            "final_cta": app.config["FINAL_CTA"],
            "inquiry_status_labels": app.config["INQUIRY_STATUS_LABELS"],
            "current_year": datetime.now(timezone.utc).year,
        }

    register_cli_commands(app)

    with app.app_context():
        from app.models import User, Case, Inquiry, Post  # noqa: F401
        db.create_all()

    return app


def register_cli_commands(app: Flask) -> None:
    @app.cli.command("seed-admin")
    def seed_admin() -> None:
        # [수정] 2026-02-18: 환경변수 기반 관리자 계정 생성 커맨드 추가
        from app.models import User

        admin_email = os.getenv("ADMIN_EMAIL", "").strip().lower()
        admin_password = os.getenv("ADMIN_PASSWORD", "").strip()

        if not admin_email or not admin_password:
            click.echo("ADMIN_EMAIL/ADMIN_PASSWORD 환경변수를 설정하세요.", err=True)
            raise SystemExit(1)

        existing_admin = User.query.filter_by(email=admin_email).first()
        if existing_admin:
            click.echo(f"이미 관리자 계정이 존재합니다: {admin_email}")
            return

        admin_user = User(email=admin_email, role="admin")
        admin_user.set_password(admin_password)
        db.session.add(admin_user)
        db.session.commit()
        click.echo(f"관리자 계정을 생성했습니다: {admin_email}")
