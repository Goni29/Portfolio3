# [수정] 2026-02-18: 퍼블릭 블루프린트 등록
from flask import Blueprint


public_bp = Blueprint("public", __name__)

from app.blueprints.public import routes  # noqa: E402,F401
