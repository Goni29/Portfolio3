import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Portfolio Law Firm",
};

const trustMetrics = [
  { value: "18+", label: "법조 경력" },
  { value: "4,500+", label: "누적 자문·소송" },
  { value: "97%", label: "의뢰인 만족도" },
];

const practiceAreas = [
  {
    slug: "criminal-defense",
    name: "형사",
    name_en: "Criminal Defense",
    key_points: [
      "초기 72시간 대응 프로토콜 운영",
      "디지털 증거·계좌내역 등 사실관계 정밀 검토",
      "사건 종결 이후 재발 방지 체크리스트 제공",
    ],
  },
  {
    slug: "civil-litigation",
    name: "민사",
    name_en: "Civil Litigation",
    key_points: [
      "초기 증거 보전 및 법적 포지션 명확화",
      "협상안/소송안 병행 제시로 의사결정 지원",
      "집행 가능성까지 고려한 종결 전략 설계",
    ],
  },
  {
    slug: "corporate-advisory",
    name: "기업자문",
    name_en: "Corporate Advisory",
    key_points: [
      "업종별 체크리스트 기반 상시 자문 운영",
      "법무·재무·실무부서 협업형 이슈 관리",
      "분쟁 발생 시 보고 체계와 커뮤니케이션 일원화",
    ],
  },
  {
    slug: "labor-employment",
    name: "노동",
    name_en: "Labor & Employment",
    key_points: [
      "사내 문서 기준 정비로 분쟁 선제 예방",
      "노사관계 이슈별 증거 수집 포맷 표준화",
      "조정·합의와 소송의 병행 전략 운영",
    ],
  },
  {
    slug: "family-inheritance",
    name: "가사",
    name_en: "Family & Inheritance",
    key_points: [
      "분쟁 장기화를 줄이기 위한 합의 프레임 설계",
      "재산 현황 파악 및 증빙 체계화",
      "판결 이후 이행 확보 방안까지 사전 검토",
    ],
  },
  {
    slug: "tax-investigation",
    name: "조세",
    name_en: "Tax Investigation",
    key_points: [
      "쟁점별 사실관계와 법리 분리 검토",
      "조사 단계 커뮤니케이션 창구 단일화",
      "사후 동일 이슈 재발 방지 체계 수립",
    ],
  },
];

const attorneys = [
  {
    slug: "kim-seoyun",
    name: "김서윤",
    role: "대표 변호사",
    description: "형사·기업 위기관리 전담, 주요 사건 초기 대응 경험 다수",
    image: "/uploads/lawyer1.png",
  },
  {
    slug: "park-dohun",
    name: "박도훈",
    role: "파트너 변호사",
    description: "민사·부동산 분쟁, 집행 단계까지 이어지는 결과 중심 수행",
    image: "/uploads/lawyer2.png",
  },
  {
    slug: "lee-hayun",
    name: "이하윤",
    role: "파트너 변호사",
    description: "노동·가사 자문, 협상과 소송 병행으로 갈등 비용 최소화",
    image: "/uploads/lawyer3.png",
  },
];

const fallbackCases = [
  {
    category: "형사",
    result: "무혐의 처분",
    summary: "초기 진술 정리와 디지털 증거 반박 논리로 혐의없음 결정을 이끌었습니다.",
  },
  {
    category: "민사",
    result: "손해배상 40% 감액",
    summary: "청구 구조 재분석과 입증 포인트 재배치로 배상 범위를 실질적으로 낮췄습니다.",
  },
  {
    category: "노동",
    result: "부당해고 구제 성공",
    summary: "인사 절차 하자와 증빙 공백을 구조화해 구제 절차에서 복직 결정을 확보했습니다.",
  },
];

const whyUsPoints = [
  {
    title: "24시간 대응 시스템",
    description: "사건 접수 직후 사실관계·리스크·우선순위를 빠르게 구조화합니다.",
  },
  {
    title: "사건 유형별 전담 배정",
    description: "사건 성격에 맞는 변호사와 실무진을 즉시 구성해 대응 밀도를 높입니다.",
  },
  {
    title: "디지털 증거 분석 체계",
    description: "메신저·계좌·포렌식 자료를 법리와 연결해 주장 완성도를 높입니다.",
  },
];

const processSteps = [
  { step: "01", title: "사건 분석", description: "핵심 사실관계와 쟁점을 정리하고 대응 우선순위를 수립합니다." },
  { step: "02", title: "전략 수립", description: "증거, 절차, 협상/소송 경로를 결합한 실행 전략을 제안합니다." },
  { step: "03", title: "실행 및 대응", description: "조사·공판·협상 각 단계에서 계획된 대응을 신속하게 실행합니다." },
  { step: "04", title: "결과 및 사후 관리", description: "사건 종결 이후 이행 점검과 재발 방지 포인트까지 관리합니다." },
];

function parseMetric(rawValue: string) {
  const suffix = rawValue.includes("+") ? "+" : rawValue.includes("%") ? "%" : "";
  const target = rawValue.replace(/,/g, "").replace("+", "").replace("%", "");
  return { target, suffix };
}

export default function HomePage() {
  return (
    <>
      <section className="hero-section d-flex align-items-center">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/uploads/hero_720p.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-dim" aria-hidden="true"></div>
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <p className="eyebrow mb-3">증거와 전략으로 결과를 만듭니다</p>
              <h1 className="hero-title mb-3">신뢰로 해결을 설계합니다</h1>
              <p className="hero-subtitle mb-4">형사·민사·기업자문, 한 번의 상담부터 끝까지 함께합니다</p>
              <div className="hero-trust">
                <div className="trust-strip">
                  {trustMetrics.map((metric) => {
                    const { target, suffix } = parseMetric(metric.value);
                    return (
                      <div key={metric.label} className="trust-item">
                        <p className="metric-value js-countup" data-target={target} data-suffix={suffix}>
                          1{suffix}
                        </p>
                        <p className="metric-label mb-0">{metric.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="hero-actions">
                <a className="btn btn-premium-primary hero-btn" href="/consult">지금 상담 요청</a>
                <a className="btn btn-premium-ghost hero-btn" href="/practice">업무 분야 보기</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block practice-showcase-section">
        <div className="container">
          <div className="section-header practice-showcase-header">
            <p className="eyebrow mb-2">Expertise</p>
            <h2 className="section-title mb-2">핵심 업무 분야</h2>
            <p className="card-text mb-0">분야별 페이지에서 주요 대응 범위와 진행 방식, 준비 자료를 확인하실 수 있습니다.</p>
          </div>
          <div className="practice-showcase-grid">
            {practiceAreas.map((area) => (
              <a key={area.slug} className="practice-showcase-item" href={`/practice/${area.slug}`}>
                <p className="practice-showcase-en mb-0">{area.name_en}</p>
                <h3 className="practice-showcase-title">{area.name}</h3>
                <span className="practice-showcase-divider" aria-hidden="true"></span>
                <ul className="practice-showcase-points" aria-label={`${area.name} 핵심 포인트`}>
                  {area.key_points.slice(0, 3).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <span className="practice-showcase-arrow" aria-hidden="true">&#8594;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-2">Attorneys</p>
            <h2 className="section-title mb-0">전담 변호사 하이라이트</h2>
          </div>
          <div className="attorney-showcase" data-attorney-slider="">
            <button type="button" className="attorney-nav attorney-prev" data-slide="prev" aria-label="이전 변호사">
              <span aria-hidden="true">&#9664;</span>
            </button>
            <div className="attorney-stage">
              <span className="attorney-stage-line attorney-stage-line-left" aria-hidden="true"></span>
              <div className="attorney-stage-content">
                {attorneys.map((attorney, index) => (
                  <a
                    key={attorney.slug}
                    className={`attorney-profile ${index === 0 ? "is-active" : ""}`}
                    data-attorney-index={index}
                    href={`/attorneys?attorney=${attorney.slug}#attorney-card-anchor`}
                    aria-label={`${attorney.name} 변호사 카드로 이동`}
                    aria-hidden={index === 0 ? "false" : "true"}
                  >
                    <div className="attorney-avatar has-image">
                      <img
                        className="attorney-avatar-image"
                        src={attorney.image}
                        alt={`${attorney.name} 프로필 사진`}
                        loading="lazy"
                      />
                    </div>
                  </a>
                ))}
              </div>
              <span className="attorney-stage-line attorney-stage-line-right" aria-hidden="true"></span>
            </div>
            <div className="attorney-copy-track">
              {attorneys.map((attorney, index) => (
                <a
                  key={attorney.slug}
                  className={`attorney-copy-item ${index === 0 ? "is-active" : ""}`}
                  data-attorney-copy-index={index}
                  href={`/attorneys?attorney=${attorney.slug}#attorney-card-anchor`}
                  aria-label={`${attorney.name} 변호사 카드로 이동`}
                  aria-hidden={index === 0 ? "false" : "true"}
                >
                  <p className="card-meta mb-1">{attorney.role}</p>
                  <h3 className="card-title mb-2">{attorney.name}</h3>
                  <p className="card-text mb-0">{attorney.description}</p>
                </a>
              ))}
            </div>
            <button type="button" className="attorney-nav attorney-next" data-slide="next" aria-label="다음 변호사">
              <span aria-hidden="true">&#9654;</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section-block home-outcome-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-2">Cases</p>
            <h2 className="section-title mb-0">성공사례 하이라이트</h2>
          </div>
          <div className="home-outcome-grid">
            {fallbackCases.map((caseItem, index) => (
              <a key={index} className="home-outcome-card home-outcome-link" href="/cases" aria-label={`${caseItem.result} 상세 보기`}>
                <p className="home-outcome-tag mb-2">{caseItem.category}</p>
                <h3 className="home-outcome-result">{caseItem.result}</h3>
                <p className="home-outcome-summary mb-0">{caseItem.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block home-why-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-2">Why Portfolio</p>
            <h2 className="section-title mb-2">검증된 전략. 체계적인 대응.</h2>
            <p className="card-text mb-0">초기 72시간이 결과를 바꿉니다.</p>
          </div>
          <div className="home-why-grid">
            {whyUsPoints.map((item, index) => (
              <article key={index} className="home-why-item">
                <h3 className="home-why-item-title">{item.title}</h3>
                <p className="home-why-item-desc mb-0">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block home-process-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-2">Process</p>
            <h2 className="section-title mb-0">상담 진행 절차</h2>
          </div>
          <div className="home-process-timeline">
            {processSteps.map((step, index) => (
              <article key={index} className="home-process-item">
                <p className="home-process-number mb-0">{step.step}</p>
                <div className="home-process-copy">
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-text mb-0">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pt-0 home-strong-cta-section">
        <div className="container">
          <div className="home-strong-cta">
            <p className="home-strong-cta-headline mb-2">중요한 결정일수록</p>
            <p className="home-strong-cta-subheadline mb-4">빠른 법률 검토가 필요합니다.</p>
            <a className="btn btn-home-solid-gold" href="/consult">24시간 상담 신청</a>
          </div>
        </div>
      </section>
    </>
  );
}
