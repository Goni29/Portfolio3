"use client";

import { useState, FormEvent } from "react";

const consultUI = {
  hero_eyebrow: "CONSULT",
  hero_title: "온라인 상담 신청",
  hero_subtitle: "초기 대응이 결과를 좌우합니다.",
  hero_notice: "접수 후 24시간 이내 회신드립니다.",
  trust_points: [
    { icon: "bi-clock-history", text: "24시간 대응" },
    { icon: "bi-person-badge", text: "사건 유형별 전담 배정" },
    { icon: "bi-shield-lock", text: "비밀보장" },
  ],
  message_guide: "사건 개요 / 진행 상황 / 긴급 여부를 작성해주세요.",
  submit_label: "24시간 상담 접수하기",
  privacy_note: "※ 모든 상담 내용은 철저히 비밀 보장됩니다.",
};

const categories = ["형사", "민사", "기업자문", "노동", "가사", "조세"];

export default function ConsultPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    const name = (formData.get("name") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();
    const privacy = formData.get("privacy_consent");

    if (!name) newErrors.name = "이름을 입력해주세요.";
    if (!phone) newErrors.phone = "연락처를 입력해주세요.";
    if (!message) newErrors.message = "상담 내용을 입력해주세요.";
    if (!privacy) newErrors.privacy = "개인정보 수집에 동의해주세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  return (
    <section className="section-block consult-page">
      <div className="container">
        <div className="consult-hero text-center">
          <p className="eyebrow mb-2">{consultUI.hero_eyebrow}</p>
          <h1 className="section-title consult-title mb-2">{consultUI.hero_title}</h1>
          <p className="consult-subtitle mb-1">{consultUI.hero_subtitle}</p>
          <p className="consult-reply-note mb-0">{consultUI.hero_notice}</p>
          <div className="consult-trust-list mt-4">
            {consultUI.trust_points.map((point) => (
              <p key={point.text} className="consult-trust-item mb-0">
                <i className={`bi ${point.icon}`} aria-hidden="true"></i>
                <span>{point.text}</span>
              </p>
            ))}
          </div>
        </div>

        {submitted && (
          <div className="container py-3">
            <div className="alert alert-success border-0 shadow-sm" role="alert">
              상담 요청이 접수되었습니다. 담당자가 빠르게 연락드리겠습니다.
            </div>
          </div>
        )}

        <div className="row justify-content-center mt-4">
          <div className="col-12">
            <form onSubmit={handleSubmit} className="consult-glass-form" noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating consult-floating">
                    <input
                      type="text"
                      name="name"
                      className="form-control premium-input"
                      id="consult-name"
                      placeholder=" "
                      autoComplete="name"
                    />
                    <label htmlFor="consult-name">이름 *</label>
                  </div>
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                <div className="col-md-6">
                  <div className="form-floating consult-floating">
                    <input
                      type="tel"
                      name="phone"
                      className="form-control premium-input"
                      id="consult-phone"
                      placeholder=" "
                      autoComplete="tel"
                    />
                    <label htmlFor="consult-phone">연락처 *</label>
                  </div>
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div className="col-md-6">
                  <div className="form-floating consult-floating">
                    <input
                      type="email"
                      name="email"
                      className="form-control premium-input"
                      id="consult-email"
                      placeholder=" "
                      autoComplete="email"
                    />
                    <label htmlFor="consult-email">이메일</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating consult-floating consult-select-wrap">
                    <select
                      name="category"
                      className="form-select premium-input consult-select"
                      id="consult-category"
                    >
                      <option value="">-- 선택 --</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <label htmlFor="consult-category">상담 분야</label>
                  </div>
                </div>

                <div className="col-12">
                  <p className="consult-message-guide mb-2">{consultUI.message_guide}</p>
                  <div className="form-floating consult-floating consult-textarea-wrap">
                    <textarea
                      name="message"
                      className="form-control premium-input consult-textarea"
                      id="consult-message"
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="consult-message">상담 내용 *</label>
                  </div>
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>

                <div className="col-12">
                  <div className="consult-consent">
                    <div className="form-check mb-0">
                      <input
                        type="checkbox"
                        name="privacy_consent"
                        className="form-check-input"
                        id="consult-privacy"
                        value="y"
                      />
                      <label className="form-check-label" htmlFor="consult-privacy">
                        개인정보 수집·이용에 동의합니다 *
                      </label>
                    </div>
                  </div>
                  {errors.privacy && <div className="form-error">{errors.privacy}</div>}
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-consult-submit">
                    {consultUI.submit_label}
                  </button>
                  <p className="consult-secret-note mb-0">{consultUI.privacy_note}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
