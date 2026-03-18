# [수정] 2026-02-20: 온라인 상담 폼 라벨/버튼 문구를 한글로 정리
from flask import current_app
from flask_wtf import FlaskForm
from wtforms import BooleanField, EmailField, SelectField, StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, Optional, ValidationError


# [수정] 2026-02-20: 온라인 상담 폼 검증 메시지를 한국어로 중앙화
CONSULT_VALIDATION_MESSAGES = {
    "required": "필수 입력 항목입니다.",
    "name_max": "이름은 100자 이하로 입력해주세요.",
    "phone_max": "연락처는 50자 이하로 입력해주세요.",
    "email_invalid": "올바른 이메일 형식이 아닙니다.",
    "email_max": "이메일은 255자 이하로 입력해주세요.",
    "category_required": "상담 분야를 선택해주세요.",
    "category_invalid": "유효한 상담 분야를 선택해주세요.",
    "message_required": "상담 내용을 입력해주세요.",
    "message_length": "상담 내용은 %(min)d자 이상 %(max)d자 이하로 입력해주세요.",
    "privacy_required": "개인정보 동의가 필요합니다.",
}


class ConsultForm(FlaskForm):
    # [수정] 2026-02-20: 상담 폼 필드 라벨을 서비스 문구에 맞게 정리
    name = StringField(
        "이름",
        validators=[
            DataRequired(message=CONSULT_VALIDATION_MESSAGES["required"]),
            Length(max=100, message=CONSULT_VALIDATION_MESSAGES["name_max"]),
        ],
    )
    phone = StringField(
        "연락처",
        validators=[
            DataRequired(message=CONSULT_VALIDATION_MESSAGES["required"]),
            Length(max=50, message=CONSULT_VALIDATION_MESSAGES["phone_max"]),
        ],
    )
    email = EmailField(
        "이메일",
        validators=[
            Optional(),
            Email(message=CONSULT_VALIDATION_MESSAGES["email_invalid"]),
            Length(max=255, message=CONSULT_VALIDATION_MESSAGES["email_max"]),
        ],
    )
    category = SelectField(
        "상담 분야",
        validators=[DataRequired(message=CONSULT_VALIDATION_MESSAGES["category_required"])],
        choices=[],
    )
    message = TextAreaField(
        "상담 내용",
        validators=[
            DataRequired(message=CONSULT_VALIDATION_MESSAGES["message_required"]),
            Length(min=10, max=3000, message=CONSULT_VALIDATION_MESSAGES["message_length"]),
        ],
    )
    privacy_consent = BooleanField(
        "개인정보 수집 및 이용에 동의합니다.",
        validators=[DataRequired(message=CONSULT_VALIDATION_MESSAGES["privacy_required"])],
    )
    submit = SubmitField("24시간 상담 접수하기")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # [수정] 2026-02-18: 상담 카테고리 옵션을 설정값에서 동적으로 로드
        categories = current_app.config.get("CONSULT_CATEGORIES", [])
        self.category.choices = [(category, category) for category in categories]

    # [수정] 2026-02-20: 위변조된 카테고리 값 제출 시 한국어 오류 메시지로 안내
    def validate_category(self, field):
        categories = current_app.config.get("CONSULT_CATEGORIES", [])
        if field.data not in categories:
            raise ValidationError(CONSULT_VALIDATION_MESSAGES["category_invalid"])
