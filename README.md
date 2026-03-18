# Portfolio3 - 법무법인 웹사이트 MVP

<!-- [수정] 2026-02-18: Flask SSR 기반 MVP 실행/구성 문서 추가 -->

Flask(Jinja2) 기반 한국 법무법인 웹사이트 MVP입니다. 퍼블릭 페이지와 관리자 포털(`/admin`)을 포함합니다.

## 기술 스택

- Python 3.11+
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-Login
- Flask-WTF (CSRF)
- Flask-Limiter
- Bootstrap 5 + 커스텀 다크 프리미엄 테마
- SQLite(개발), PostgreSQL(DATABASE_URL) 대응

## 빠른 실행 (PowerShell)

```powershell
cd .\Portfolio3
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
flask --app run.py db init
flask --app run.py db migrate
flask --app run.py db upgrade
flask --app run.py seed-admin
pytest -q
flask --app run.py run
```

`Activate.ps1` 실행이 막히면:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## 주요 경로

- 퍼블릭: `/`, `/about`, `/attorneys`, `/practice`, `/cases`, `/blog`, `/blog/<slug>`, `/consult`
- 관리자: `/admin/login`, `/admin`, `/admin/inquiries`, `/admin/posts`, `/admin/cases`

## 관리자 시드 계정

- `ADMIN_EMAIL`, `ADMIN_PASSWORD`를 `.env`에 설정 후:

```powershell
flask --app run.py seed-admin
```

환경변수가 비어 있으면 명령이 종료 코드 `1`로 중단됩니다.
