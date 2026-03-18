# [수정] 2026-02-18: Flask 앱 엔트리포인트 추가
from app import create_app


app = create_app()


if __name__ == "__main__":
    app.run()
