# [수정] 2026-02-18: 관리자 블루프린트 등록
from flask import Blueprint


admin_bp = Blueprint("admin", __name__)

from app.blueprints.admin import routes  # noqa: E402,F401
