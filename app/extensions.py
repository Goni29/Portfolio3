# [수정] 2026-02-18: Flask 확장 객체를 중앙에서 초기화하도록 추가
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect


db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
csrf = CSRFProtect()
limiter = Limiter(key_func=get_remote_address)

login_manager.login_view = "admin.login"
login_manager.login_message = "관리자 로그인이 필요합니다."
login_manager.login_message_category = "warning"
