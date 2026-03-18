# [수정] 2026-02-19: 테스트가 로컬 개발 DB를 건드리지 않도록 테스트 전용 설정으로 분리
import pytest

from app import create_app
from app.config import Config
from app.extensions import db


class TestConfig(Config):
    # [수정] 2026-02-19: in-memory DB를 사용해 테스트 종료 후 개발 DB가 보존되도록 설정
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    WTF_CSRF_ENABLED = False
    RATELIMIT_ENABLED = False


@pytest.fixture()
def app():
    app = create_app(TestConfig)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.mark.parametrize(
    "path",
    [
        "/",
        "/about",
        "/attorneys",
        "/practice",
        # [수정] 2026-02-19: 업무분야 상세 라우트 정상 응답 확인 케이스 추가
        "/practice/criminal-defense",
        "/cases",
        # [수정] 2026-02-20: 공개 Blog 페이지 제거에 따라 스모크 테스트 경로에서 제외
        "/consult",
        "/admin/login",
    ],
)
def test_required_pages_return_200(client, path):
    response = client.get(path)
    assert response.status_code == 200
