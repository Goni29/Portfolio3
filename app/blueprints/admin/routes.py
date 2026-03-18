# [수정] 2026-02-18: 관리자 인증, 상담 관리, 블로그/성공사례 CRUD 추가
import os
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from flask import current_app, flash, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.utils import secure_filename

from app.blueprints.admin import admin_bp
from app.blueprints.admin.forms import CaseForm, InquiryStatusForm, LoginForm, PostForm
from app.extensions import db
from app.models import Case, Inquiry, Post, User, generate_unique_slug


def _is_allowed_extension(filename: str) -> bool:
    # [수정] 2026-02-18: 이미지 확장자 화이트리스트 검증 함수 추가
    if "." not in filename:
        return False
    extension = filename.rsplit(".", 1)[1].lower()
    allowed = current_app.config.get("ALLOWED_IMAGE_EXTENSIONS", set())
    return extension in allowed


def _save_cover_image(file_storage) -> str | None:
    # [수정] 2026-02-18: 이미지 타입/사이즈 검증 후 uploads 경로 저장
    if not file_storage or not file_storage.filename:
        return None

    sanitized_name = secure_filename(file_storage.filename)
    if not sanitized_name:
        raise ValueError("파일 이름이 올바르지 않습니다.")
    if not _is_allowed_extension(sanitized_name):
        raise ValueError("이미지 형식은 png/jpg/jpeg/webp만 허용됩니다.")

    file_storage.stream.seek(0, os.SEEK_END)
    file_size = file_storage.stream.tell()
    file_storage.stream.seek(0)

    max_size = current_app.config.get("MAX_CONTENT_LENGTH", 2 * 1024 * 1024)
    if file_size > max_size:
        raise ValueError("이미지 파일은 최대 2MB까지 업로드할 수 있습니다.")

    extension = sanitized_name.rsplit(".", 1)[1].lower()
    unique_filename = f"{uuid4().hex}.{extension}"
    upload_root = Path(current_app.root_path).parent / current_app.config["UPLOAD_FOLDER"]
    upload_root.mkdir(parents=True, exist_ok=True)
    file_storage.save(upload_root / unique_filename)
    return f"uploads/{unique_filename}"


def _apply_publish_state(entity, should_publish: bool) -> None:
    # [수정] 2026-02-18: Post/Case 공통 발행 상태 갱신 로직 추가
    if should_publish:
        entity.published = True
        if entity.published_at is None:
            entity.published_at = datetime.utcnow()
    else:
        entity.published = False
        entity.published_at = None


@admin_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("admin.dashboard"))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.strip().lower()).first()
        # [수정] 2026-02-18: 관리자(role=admin) 계정만 로그인 허용
        if user and user.role == "admin" and user.check_password(form.password.data):
            login_user(user, remember=form.remember.data)
            user.last_login_at = datetime.utcnow()
            db.session.commit()

            destination = request.args.get("next")
            flash("관리자 로그인에 성공했습니다.", "success")
            return redirect(destination or url_for("admin.dashboard"))

        flash("이메일 또는 비밀번호가 올바르지 않습니다.", "danger")

    return render_template("admin/login.html", form=form)


@admin_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("로그아웃되었습니다.", "info")
    return redirect(url_for("admin.login"))


@admin_bp.route("/")
@login_required
def dashboard():
    summary = {
        "new_inquiries": Inquiry.query.filter_by(status="new").count(),
        "published_posts": Post.query.filter_by(published=True).count(),
        "published_cases": Case.query.filter_by(published=True).count(),
        "total_inquiries": Inquiry.query.count(),
    }
    return render_template("admin/dashboard.html", summary=summary)


@admin_bp.route("/inquiries")
@login_required
def inquiries_list():
    status_filter = request.args.get("status", "all")
    allowed_statuses = current_app.config.get("INQUIRY_STATUS_OPTIONS", [])

    query = Inquiry.query.order_by(Inquiry.created_at.desc())
    if status_filter in allowed_statuses:
        query = query.filter_by(status=status_filter)

    inquiries = query.all()
    return render_template(
        "admin/inquiries_list.html",
        inquiries=inquiries,
        status_filter=status_filter,
        status_options=allowed_statuses,
    )


@admin_bp.route("/inquiries/<int:inquiry_id>", methods=["GET", "POST"])
@login_required
def inquiry_detail(inquiry_id: int):
    inquiry = Inquiry.query.get_or_404(inquiry_id)
    form = InquiryStatusForm(status=inquiry.status)

    if form.validate_on_submit():
        inquiry.status = form.status.data
        db.session.commit()
        flash("상담 상태를 변경했습니다.", "success")
        return redirect(url_for("admin.inquiry_detail", inquiry_id=inquiry.id))

    return render_template("admin/inquiry_detail.html", inquiry=inquiry, form=form)


def _fill_post_from_form(post: Post, form: PostForm) -> None:
    # [수정] 2026-02-18: Post 생성/수정 중복 로직 공용화
    new_title = form.title.data.strip()
    title_changed = post.title != new_title

    post.title = new_title
    post.excerpt = form.excerpt.data.strip()
    post.content = form.content.data.strip()
    if title_changed or not post.slug:
        post.slug = generate_unique_slug(Post, post.title, current_id=post.id)

    if form.cover_image.data and form.cover_image.data.filename:
        post.cover_image = _save_cover_image(form.cover_image.data)

    _apply_publish_state(post, bool(form.published.data))


@admin_bp.route("/posts")
@login_required
def posts_list():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template("admin/posts_list.html", posts=posts)


@admin_bp.route("/posts/new", methods=["GET", "POST"])
@login_required
def post_create():
    form = PostForm()

    if form.validate_on_submit():
        post = Post()
        try:
            _fill_post_from_form(post, form)
        except ValueError as upload_error:
            flash(str(upload_error), "danger")
        else:
            db.session.add(post)
            db.session.commit()
            flash("게시물을 저장했습니다.", "success")
            return redirect(url_for("admin.posts_list"))

    return render_template("admin/post_edit.html", form=form, post=None)


@admin_bp.route("/posts/<int:post_id>/edit", methods=["GET", "POST"])
@login_required
def post_edit(post_id: int):
    post = Post.query.get_or_404(post_id)
    form = PostForm(obj=post)

    if form.validate_on_submit():
        try:
            _fill_post_from_form(post, form)
        except ValueError as upload_error:
            flash(str(upload_error), "danger")
        else:
            db.session.commit()
            flash("게시물을 수정했습니다.", "success")
            return redirect(url_for("admin.posts_list"))

    return render_template("admin/post_edit.html", form=form, post=post)


def _fill_case_from_form(case_item: Case, form: CaseForm) -> None:
    # [수정] 2026-02-18: Case 생성/수정 중복 로직 공용화
    new_title = form.title.data.strip()
    title_changed = case_item.title != new_title

    case_item.category = form.category.data
    case_item.title = new_title
    case_item.summary = form.summary.data.strip()
    case_item.result = form.result.data.strip()
    case_item.content = form.content.data.strip()
    if title_changed or not case_item.slug:
        case_item.slug = generate_unique_slug(Case, case_item.title, current_id=case_item.id)

    if form.cover_image.data and form.cover_image.data.filename:
        case_item.cover_image = _save_cover_image(form.cover_image.data)

    _apply_publish_state(case_item, bool(form.published.data))


@admin_bp.route("/cases")
@login_required
def cases_list():
    cases = Case.query.order_by(Case.created_at.desc()).all()
    return render_template("admin/cases_list.html", cases=cases)


@admin_bp.route("/cases/new", methods=["GET", "POST"])
@login_required
def case_create():
    form = CaseForm()

    if form.validate_on_submit():
        case_item = Case()
        try:
            _fill_case_from_form(case_item, form)
        except ValueError as upload_error:
            flash(str(upload_error), "danger")
        else:
            db.session.add(case_item)
            db.session.commit()
            flash("성공사례를 저장했습니다.", "success")
            return redirect(url_for("admin.cases_list"))

    return render_template("admin/case_edit.html", form=form, case_item=None)


@admin_bp.route("/cases/<int:case_id>/edit", methods=["GET", "POST"])
@login_required
def case_edit(case_id: int):
    case_item = Case.query.get_or_404(case_id)
    form = CaseForm(obj=case_item)

    if form.validate_on_submit():
        try:
            _fill_case_from_form(case_item, form)
        except ValueError as upload_error:
            flash(str(upload_error), "danger")
        else:
            db.session.commit()
            flash("성공사례를 수정했습니다.", "success")
            return redirect(url_for("admin.cases_list"))

    return render_template("admin/case_edit.html", form=form, case_item=case_item)
