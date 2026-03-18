import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases | Portfolio Law Firm",
};

const heroSettings = {
  hero_eyebrow: "성공사례",
  hero_title: "검증된 전략과 결과",
  hero_subtitle: "사건 유형별 대응 구조와 실질 결과를 핵심 쟁점 중심으로 확인할 수 있습니다.",
  hero_image: "uploads/cases_hero.png",
  search_placeholder: "무혐의, 공판, 합의, 감형 등 키워드 검색",
  hero_metrics: [
    { value: "4,500+", label: "누적 수행" },
    { value: "97%", label: "이상 만족도" },
    { value: "72", suffix: "시간", label: "평균 대응 이내" },
  ],
};

const categoryFilters = [
  { key: "all", label: "전체" },
  { key: "형사", label: "형사" },
  { key: "민사", label: "민사" },
  { key: "기업자문", label: "기업자문" },
  { key: "노동", label: "노동" },
  { key: "가사", label: "가사" },
  { key: "조세", label: "조세" },
];

// Demo case data for static rendering
const demoCases = [
  {
    id: 1,
    slug: "case-1",
    category: "형사",
    category_key: "형사",
    title: "특정경제범죄 무혐의 처분",
    summary: "초기 진술 정리와 디지털 증거 반박 논리로 혐의없음 결정을 이끌었습니다.",
    result: "무혐의 처분",
    outcome_key: "no_charge",
    outcome_label: "무혐의",
    detail: {
      overview: {
        background: "의뢰인은 특정경제범죄 혐의로 수사기관의 조사를 받게 되었습니다.",
        client_state: "의뢰인은 초기 대응 시점에서 불확실성과 절차 부담이 큰 상황이었습니다.",
      },
      issues: {
        legal_issue: "사실관계와 법리 포인트를 분리해 핵심 쟁점을 구조화했습니다.",
        risk_factor: "조사·공판 단계의 위험 요소를 선제적으로 정리해 대응 우선순위를 설정했습니다.",
      },
      strategy: {
        summary: "초기 진술·증거 정리·협상/소송 병행 전략으로 실행안을 수립했습니다.",
        points: ["초기 진술 방향 설계", "디지털 증거 반박 논리 구성", "피해자 합의 선제적 접근"],
      },
      result: {
        final: "무혐의 처분",
        conversion: "무혐의 처분 결과를 확보했습니다.",
      },
      impact: {
        meaning: "의뢰인의 리스크와 절차적 부담을 줄이고 사건 종결 이후까지 관리했습니다.",
      },
    },
    search_text: "형사 특정경제범죄 무혐의 처분 초기 진술",
  },
  {
    id: 2,
    slug: "case-2",
    category: "민사",
    category_key: "민사",
    title: "손해배상 청구 40% 감액",
    summary: "청구 구조 재분석과 입증 포인트 재배치로 배상 범위를 실질적으로 낮췄습니다.",
    result: "손해배상 40% 감액",
    outcome_key: "settlement_success",
    outcome_label: "합의성공",
    detail: {
      overview: {
        background: "상대방으로부터 과도한 손해배상을 청구받은 의뢰인의 방어 사건입니다.",
        client_state: "의뢰인은 예상치 못한 고액 청구에 큰 부담을 느끼고 있었습니다.",
      },
      issues: {
        legal_issue: "청구 금액의 산정 근거와 인과관계 입증 구조를 집중 분석했습니다.",
        risk_factor: "전액 인용 시 의뢰인의 재정적 리스크가 매우 컸습니다.",
      },
      strategy: {
        summary: "청구 근거별 반박 논리를 체계적으로 구성해 감액을 이끌었습니다.",
        points: ["청구 구조 재분석", "입증 포인트 재배치", "합의 병행 전략 운영"],
      },
      result: {
        final: "손해배상 40% 감액",
        conversion: "청구 금액 대비 40% 감액 결과를 확보했습니다.",
      },
      impact: {
        meaning: "의뢰인의 재정적 부담을 대폭 줄이고 합리적 수준에서 분쟁을 종결했습니다.",
      },
    },
    search_text: "민사 손해배상 감액 합의 청구 구조",
  },
  {
    id: 3,
    slug: "case-3",
    category: "노동",
    category_key: "노동",
    title: "부당해고 구제 성공",
    summary: "인사 절차 하자와 증빙 공백을 구조화해 구제 절차에서 복직 결정을 확보했습니다.",
    result: "부당해고 구제 인용",
    outcome_key: "other",
    outcome_label: "기타",
    detail: {
      overview: {
        background: "의뢰인은 정당한 사유 없이 해고 통보를 받았습니다.",
        client_state: "갑작스러운 해고로 생계와 경력에 큰 불안을 느끼고 있었습니다.",
      },
      issues: {
        legal_issue: "해고 절차의 적법성과 해고 사유의 정당성을 쟁점으로 설정했습니다.",
        risk_factor: "사측이 절차적 하자를 사후 보완할 가능성에 대비해야 했습니다.",
      },
      strategy: {
        summary: "인사 절차 하자와 증빙 공백을 구조화해 구제 신청을 진행했습니다.",
        points: ["해고 절차 위법성 입증", "증빙 자료 체계화", "노동위원회 심문 전략 수립"],
      },
      result: {
        final: "부당해고 구제 인용",
        conversion: "복직 결정과 함께 미지급 임금 지급 명령을 확보했습니다.",
      },
      impact: {
        meaning: "의뢰인의 고용 안정성을 회복하고 사측의 부당한 인사조치를 시정했습니다.",
      },
    },
    search_text: "노동 부당해고 구제 복직 인사 절차",
  },
  {
    id: 4,
    slug: "case-4",
    category: "형사",
    category_key: "형사",
    title: "음주운전 집행유예 확보",
    summary: "반성 자료와 양형 사유를 체계적으로 구성해 실형을 면했습니다.",
    result: "집행유예",
    outcome_key: "suspended_sentence",
    outcome_label: "집행유예",
    detail: {
      overview: {
        background: "음주운전 혐의로 기소된 의뢰인의 공판 사건입니다.",
        client_state: "실형 선고 가능성에 큰 불안을 느끼고 있었습니다.",
      },
      issues: {
        legal_issue: "양형 기준상 실형 구간에 해당하는 혈중알코올농도였습니다.",
        risk_factor: "전과 기록이 양형에 불리하게 작용할 수 있었습니다.",
      },
      strategy: {
        summary: "반성문·사회봉사·치료 이력 등 양형 자료를 구조적으로 구성했습니다.",
        points: ["양형 사유 체계적 정리", "반성 자료 구조화", "재범 방지 계획 제시"],
      },
      result: {
        final: "집행유예",
        conversion: "실형 대신 집행유예를 선고받았습니다.",
      },
      impact: {
        meaning: "의뢰인의 사회생활 복귀를 가능하게 했습니다.",
      },
    },
    search_text: "형사 음주운전 집행유예 양형 반성",
  },
  {
    id: 5,
    slug: "case-5",
    category: "기업자문",
    category_key: "기업자문",
    title: "계약분쟁 사전 합의 성공",
    summary: "거래 구조 리스크를 사전에 진단하고 합의안을 설계해 소송을 회피했습니다.",
    result: "소송 전 합의 성립",
    outcome_key: "settlement_success",
    outcome_label: "합의성공",
    detail: {
      overview: {
        background: "거래처와의 계약 해석 분쟁이 소송 직전까지 격화된 상황이었습니다.",
        client_state: "소송 비용과 거래 관계 단절에 대한 우려가 컸습니다.",
      },
      issues: {
        legal_issue: "계약 조항의 해석 차이와 이행 범위가 핵심 쟁점이었습니다.",
        risk_factor: "소송 진행 시 거래 관계 회복이 어려울 수 있었습니다.",
      },
      strategy: {
        summary: "법적 포지션을 명확히 한 후 실익 중심 합의안을 설계했습니다.",
        points: ["계약 조항 법리 분석", "합의안 시나리오 설계", "협상 커뮤니케이션 전략"],
      },
      result: {
        final: "소송 전 합의 성립",
        conversion: "양측 합의로 소송 없이 분쟁을 종결했습니다.",
      },
      impact: {
        meaning: "소송 비용을 절감하고 거래 관계를 유지할 수 있었습니다.",
      },
    },
    search_text: "기업자문 계약분쟁 합의 소송회피 거래구조",
  },
  {
    id: 6,
    slug: "case-6",
    category: "형사",
    category_key: "형사",
    title: "사기 혐의 감형 성공",
    summary: "피해 회복 노력과 양형 자료를 정리해 구형 대비 대폭 감형을 이끌었습니다.",
    result: "구형 대비 50% 감형",
    outcome_key: "reduced_sentence",
    outcome_label: "감형",
    detail: {
      overview: {
        background: "사기 혐의로 기소된 의뢰인의 양형 사건입니다.",
        client_state: "구형이 높아 실형에 대한 우려가 컸습니다.",
      },
      issues: {
        legal_issue: "피해 금액과 범행 경위에 대한 쟁점을 정리했습니다.",
        risk_factor: "피해자 다수로 양형이 불리할 수 있었습니다.",
      },
      strategy: {
        summary: "피해 회복 노력과 양형 사유를 체계적으로 구성했습니다.",
        points: ["피해 회복 계획 수립", "양형 자료 체계 구성", "피해자 합의 진행"],
      },
      result: {
        final: "구형 대비 50% 감형",
        conversion: "구형 대비 대폭 감형된 선고를 받았습니다.",
      },
      impact: {
        meaning: "의뢰인의 형사 리스크를 최소화하고 사회 복귀 기반을 마련했습니다.",
      },
    },
    search_text: "형사 사기 감형 양형 피해회복",
  },
];

function parseMetric(rawValue: string, explicitSuffix?: string) {
  const autoSuffix = rawValue.includes("+") ? "+" : rawValue.includes("%") ? "%" : "";
  const suffix = explicitSuffix || autoSuffix;
  const target = rawValue.replace(/,/g, "").replace("+", "").replace("%", "");
  return { target, suffix };
}

export default function CasesPage() {
  return (
    <section className="section-block cases-hub-page" data-case-hub="">
      <div className="container">
        <header
          className="cases-hub-hero case-reveal"
          style={{ "--cases-hero-image": `url('/${heroSettings.hero_image}')` } as React.CSSProperties}
        >
          <div className="cases-hub-hero-copy">
            <p className="eyebrow mb-2">{heroSettings.hero_eyebrow}</p>
            <h1 className="section-title cases-hub-title mb-2">{heroSettings.hero_title}</h1>
            <p className="card-text mb-0">{heroSettings.hero_subtitle}</p>
          </div>

          <div className="cases-hub-hero-metrics" role="list" aria-label="핵심 지표">
            {heroSettings.hero_metrics.map((metric) => {
              const { target, suffix } = parseMetric(metric.value, (metric as { suffix?: string }).suffix);
              return (
                <div key={metric.label} className="cases-hub-metric" role="listitem">
                  <p className="cases-hub-metric-value js-countup mb-1" data-target={target} data-suffix={suffix}>
                    1{suffix}
                  </p>
                  <p className="cases-hub-metric-label mb-0">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </header>

        <section className="cases-hub-filter case-reveal" aria-label="성공사례 필터">
          <div className="cases-hub-filter-row">
            <div className="cases-hub-pill-group" data-filter-group="category">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={`cases-hub-pill ${filter.key === "all" ? "is-active" : ""}`}
                  data-filter-category={filter.key}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <label className="cases-hub-search" htmlFor="caseSearchInput">
              <input
                id="caseSearchInput"
                type="search"
                className="form-control premium-input"
                placeholder={heroSettings.search_placeholder}
                data-filter-search=""
              />
              <i className="bi bi-search" aria-hidden="true"></i>
            </label>
          </div>
        </section>

        <section id="cases-list-anchor" className="cases-hub-grid" aria-label="성공사례 목록">
          {demoCases.map((caseCard) => (
            <article
              key={caseCard.id}
              className="cases-hub-card case-reveal"
              data-case-card=""
              data-case-id={caseCard.id}
              data-case-slug={caseCard.slug}
              data-case-category={caseCard.category_key}
              data-case-outcome={caseCard.outcome_key}
              data-case-search={caseCard.search_text}
            >
              <div className="cases-hub-card-head">
                <span className="cases-hub-tag">{caseCard.category}</span>
                <span className="cases-hub-outcome-tag">{caseCard.outcome_label}</span>
              </div>

              <h2 className="cases-hub-card-title">{caseCard.title}</h2>
              <p className="cases-hub-card-summary">{caseCard.summary}</p>

              <div className="cases-hub-result-box">
                <p className="cases-hub-result-label mb-1">결과</p>
                <p className="cases-hub-result-text mb-0">{caseCard.result}</p>
              </div>

              <button type="button" className="cases-hub-detail-toggle" data-case-detail-toggle="">
                자세히 보기 <span aria-hidden="true">&rarr;</span>
              </button>

              <div className="cases-hub-detail" data-case-detail="" hidden>
                <section className="cases-hub-detail-block">
                  <h3>{"\u2460"} 사건 개요</h3>
                  <p><strong>사건 배경</strong> {caseCard.detail.overview.background}</p>
                  <p><strong>의뢰인 상황</strong> {caseCard.detail.overview.client_state}</p>
                </section>

                <section className="cases-hub-detail-block">
                  <h3>{"\u2461"} 쟁점 분석</h3>
                  <p><strong>법적 쟁점</strong> {caseCard.detail.issues.legal_issue}</p>
                  <p><strong>위험 요소</strong> {caseCard.detail.issues.risk_factor}</p>
                </section>

                <section className="cases-hub-detail-block">
                  <h3>{"\u2462"} 전략 수립</h3>
                  <p><strong>변호 전략</strong> {caseCard.detail.strategy.summary}</p>
                  <div className="cases-hub-strategy-box">
                    <p className="cases-hub-strategy-title mb-2">핵심 전략</p>
                    <ul>
                      {caseCard.detail.strategy.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="cases-hub-detail-block">
                  <h3>{"\u2463"} 결과</h3>
                  <p><strong>최종 결과</strong> {caseCard.detail.result.final}</p>
                  <p><strong>결과 변화</strong> {caseCard.detail.result.conversion}</p>
                </section>

                <section className="cases-hub-detail-block mb-0">
                  <h3>{"\u2464"} 의미</h3>
                  <p><strong>의뢰인 변화</strong> {caseCard.detail.impact.meaning}</p>
                </section>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
