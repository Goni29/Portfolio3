import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Portfolio Law Firm",
};

const heroMetrics = [
  { value: "18+", label: "경력 기반 전문 변호사" },
  { value: "4,500+", label: "누적 수행 사건 경험" },
  { value: "97%", label: "신속 대응 만족도" },
];

const valueCheckpoints = [
  "경험 있는 변호사와 실무팀의 유기적 협업",
  "오직 의뢰인을 위한 전담 변호사 배정",
  "사건 단계별 지연 없는 책임 대응",
];

const strengthCards = [
  {
    icon: "bi-shield-check",
    title: "경력 18년 이상의 전문 변호사",
    description: "형사·민사·기업 분쟁까지 실무 중심 대응",
    chip: "전문 영역 밀착 대응",
  },
  {
    icon: "bi-briefcase",
    title: "4,500건 이상의 수행 노하우",
    description: "유사 사건 데이터 기반 전략 수립",
    chip: "누적 경험 근거 기획",
  },
  {
    icon: "bi-hourglass-split",
    title: "초기 대응 중심 전담 운영",
    description: "접수 직후 리스크 분석과 우선순위 정렬",
    chip: "속도·정확성 균형 수행",
  },
];

const historyItems = [
  {
    year: "2016",
    title: "Portfolio Law Firm 설립",
    detail: "초기 구성원 5인으로 시작해 분쟁 대응 표준 프로세스를 구축했습니다.",
  },
  {
    year: "2020",
    title: "누적 상담 3,000건 돌파",
    detail: "기업 법무 자문팀을 신설해 대응 범위와 운영 체계를 확장했습니다.",
  },
  {
    year: "2023",
    title: "금융·중대 형사 전담 셀 개설",
    detail: "전담 배정 체계를 고도화하고 분야별 협업 프로토콜을 정착했습니다.",
  },
];

function parseMetric(rawValue: string) {
  const suffix = rawValue.includes("+") ? "+" : rawValue.includes("%") ? "%" : "";
  const target = rawValue.replace(/,/g, "").replace("+", "").replace("%", "");
  return { target, suffix };
}

export default function AboutPage() {
  return (
    <>
      <section className="section-block about-premium-page">
        <div className="container">
          <article className="about-hero-panel">
            <div className="about-hero-main">
              <div className="about-hero-copy">
                <p className="eyebrow mb-2">Portfolio Law Firm</p>
                <h1 className="section-title about-hero-title">법률 서비스의 새로운 기준</h1>
                <p className="about-hero-summary mb-2">
                  신뢰를 기반으로 사건의 본질을 읽고, 결과로 답하는 전담 로펌 시스템을 운영합니다.
                </p>
                <p className="card-text mb-0">
                  초기 상담부터 사건 종결까지 전략, 소통, 실행을 하나의 팀으로 일관되게 수행합니다.
                </p>
              </div>
            </div>

            <div className="about-hero-metrics" role="list" aria-label="핵심 지표">
              {heroMetrics.map((metric) => {
                const { target, suffix } = parseMetric(metric.value);
                return (
                  <div key={metric.label} className="about-hero-metric" role="listitem">
                    <p
                      className="about-metric-value js-countup mb-1"
                      data-target={target}
                      data-suffix={suffix}
                    >
                      1{suffix}
                    </p>
                    <p className="about-metric-label mb-0">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="section-block pt-0 about-premium-page">
        <div className="container">
          <article className="about-value-panel">
            <div className="about-value-copy">
              <h2 className="section-title mb-3">고객의 신뢰는 우리의 가장 큰 가치입니다.</h2>
              <p className="card-text mb-3">
                각 사건의 상황과 목표를 입체적으로 분석하고, 의뢰인이 이해할 수 있는 언어로 전략을 설명합니다.
              </p>
              <ul className="about-value-list">
                {valueCheckpoints.map((cp, i) => (
                  <li key={i}>{cp}</li>
                ))}
              </ul>
              <p className="about-value-caption mb-0">
                사건의 본질을 놓치지 않도록, 핵심 쟁점과 일정 관리를 끝까지 밀도 있게 수행합니다.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block pt-0 about-premium-page">
        <div className="container">
          <div className="section-header about-strength-header">
            <p className="eyebrow mb-2">Expertise</p>
            <h2 className="section-title mb-2">검증된 법률 전문가 집합</h2>
            <p className="card-text mb-0">분야별 전문성을 결합해 사건의 방향을 설계하고 실행합니다.</p>
          </div>

          <div className="about-strength-grid">
            {strengthCards.map((card, i) => (
              <article key={i} className="about-strength-card">
                <div className="about-strength-icon-wrap">
                  <i className={`bi ${card.icon}`} aria-hidden="true"></i>
                </div>
                <h3 className="about-strength-title">{card.title}</h3>
                <p className="about-strength-desc">{card.description}</p>
                <p className="about-strength-chip mb-0">{card.chip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pt-0 about-premium-page">
        <div className="container">
          <div className="section-header about-history-header">
            <p className="eyebrow mb-2">History</p>
            <h2 className="section-title mb-2">걸어온 길, 나아갈 미래</h2>
            <p className="card-text mb-0">
              형사·민사·기업자문 중심의 전담 체계를 단계적으로 고도화해 왔습니다.
            </p>
          </div>

          <div id="history-timeline" className="about-history-timeline" role="list" aria-label="연혁 타임라인">
            {historyItems.map((item, index) => (
              <article
                key={item.year}
                className={`about-history-item ${index % 2 === 0 ? "is-left" : "is-right"}`}
                role="listitem"
              >
                <span className="about-history-node" aria-hidden="true"></span>
                <div className="about-history-content">
                  <p className="about-history-year mb-1">{item.year}</p>
                  <h3 className="about-history-title mb-1">{item.title}</h3>
                  <p className="about-history-detail mb-0">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
