# [수정] 2026-02-18: 관리자 로그인/상담/콘텐츠 관리 폼 추가
from flask import current_app
from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import (
    BooleanField,
    PasswordField,
    SelectField,
    StringField,
    SubmitField,
    TextAreaField,
)
from wtforms.validators import DataRequired, Email, Length


class LoginForm(FlaskForm):
    email = StringField("이메일", validators=[DataRequired(), Email(), Length(max=255)])
    password = PasswordField("비밀번호", validators=[DataRequired(), Length(min=8, max=128)])
    remember = BooleanField("로그인 유지")
    submit = SubmitField("로그인")


class InquiryStatusForm(FlaskForm):
    status = SelectField("진행 상태", validators=[DataRequired()], choices=[])
    submit = SubmitField("상태 저장")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        status_options = current_app.config.get("INQUIRY_STATUS_OPTIONS", [])
        status_labels = current_app.config.get("INQUIRY_STATUS_LABELS", {})
        self.status.choices = [
            (status_key, status_labels.get(status_key, status_key))
            for status_key in status_options
        ]


class PostForm(FlaskForm):
    title = StringField("제목", validators=[DataRequired(), Length(max=200)])
    excerpt = TextAreaField("요약", validators=[DataRequired(), Length(max=300)])
    content = TextAreaField("본문", validators=[DataRequired()])
    cover_image = FileField("커버 이미지")
    published = BooleanField("즉시 발행")
    submit = SubmitField("저장")


class CaseForm(FlaskForm):
    category = SelectField("카테고리", validators=[DataRequired()], choices=[])
    title = StringField("제목", validators=[DataRequired(), Length(max=200)])
    summary = TextAreaField("요약", validators=[DataRequired(), Length(max=300)])
    result = StringField("결과", validators=[DataRequired(), Length(max=200)])
    content = TextAreaField("본문", validators=[DataRequired()])
    cover_image = FileField("커버 이미지")
    published = BooleanField("즉시 발행")
    submit = SubmitField("저장")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        categories = current_app.config.get("CASE_CATEGORIES", [])
        self.category.choices = [(category, category) for category in categories]
