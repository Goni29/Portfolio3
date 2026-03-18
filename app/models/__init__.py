# [수정] 2026-02-18: 모델 패키지 공개 및 공통 slug 유틸 추가
import re
import unicodedata

from app.extensions import db

from .case import Case
from .inquiry import Inquiry
from .post import Post
from .user import User


def slugify_ascii(value: str) -> str:
    # [수정] 2026-02-18: ASCII 안전 slug 문자열 생성
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", normalized.lower()).strip("-")
    return slug or "item"


def generate_unique_slug(model_cls, source_text: str, current_id: int | None = None) -> str:
    # [수정] 2026-02-18: 중복 시 -2, -3 접미어를 붙여 유니크 보장
    base_slug = slugify_ascii(source_text)
    candidate = base_slug
    suffix = 2

    while True:
        stmt = db.select(model_cls.id).where(model_cls.slug == candidate)
        if current_id is not None:
            stmt = stmt.where(model_cls.id != current_id)

        exists = db.session.execute(stmt).scalar_one_or_none()
        if exists is None:
            return candidate

        candidate = f"{base_slug}-{suffix}"
        suffix += 1


__all__ = [
    "User",
    "Inquiry",
    "Post",
    "Case",
    "slugify_ascii",
    "generate_unique_slug",
]
