import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attorneys | Portfolio Law Firm",
};

const attorneys = [
  {
    slug: "kim-seoyun",
    name: "김서윤",
    role: "대표 변호사",
    description: "형사·기업 위기관리 전담, 주요 사건 초기 대응 경험 다수",
    headline: "형사·기업 위기관리 초기 대응 전담",
    image: "/uploads/lawyer1.png",
    tags: ["형사", "기업", "위기관리"],
    badges: ["대한변협 형사전문 등록", "서울지방변호사회 정회원"],
    focus_expertise: [
      "형사 사건 초기 72시간 대응 체계 운영",
      "영장실질심사·구속적부심 대응",
      "기업 리스크 연계 형사 이슈 대응",
    ],
    major_performance: [
      "경찰·검찰 조사 전략 수립 및 진술 코칭",
      "피해자 합의·손해배상 연계 협상",
      "공판 단계별 쟁점 구성 및 변론",
    ],
    representative_cases: [
      { title: "특정경제범죄 방어", summary: "초기 진술 방향을 재정렬해 구속영장 기각을 이끌고 불구속 수사로 전환" },
      { title: "기업 위기관리 자문", summary: "형사 리스크와 대외 커뮤니케이션 이슈를 병행 관리해 피해 확산을 차단" },
      { title: "강제수사 대응 자문", summary: "압수수색 집행 단계부터 위법수집 증거 쟁점을 선제 제기" },
    ],
    work_process: [
      "사건 접수 후 24시간 내 사실관계 정리",
      "핵심 리스크·우선 대응안 1차 브리핑",
      "수사·공판 단계별 실행 체크포인트 공유",
    ],
    career_timeline: [
      { year: "2025", detail: "Portfolio 대표 변호사" },
      { year: "2022", detail: "형사 전문팀 파트너 변호사" },
      { year: "2019", detail: "검찰 수사관 출신 자문위원 협업체계 구축" },
      { year: "2016", detail: "사법연수원 수료 및 변호사 개업" },
    ],
  },
  {
    slug: "park-dohun",
    name: "박도훈",
    role: "파트너 변호사",
    description: "민사·부동산 분쟁, 집행 단계까지 이어지는 결과 중심 수행",
    headline: "집행 단계까지 이어지는 결과 중심 수행",
    image: "/uploads/lawyer2.png",
    tags: ["민사", "부동산", "집행"],
    badges: ["대한변협 민사법 전문", "한국가족법학회 정회원"],
    focus_expertise: [
      "민사·부동산 분쟁의 핵심 쟁점 구조화",
      "가압류·가처분 등 보전처분 선제 대응",
      "판결 후 강제집행 단계까지 연속 수행",
    ],
    major_performance: [
      "손해배상 청구 및 방어 시나리오 설계",
      "피해자 대리 합의안 작성·이행관리",
      "부동산·금전채권 집행 절차 수행",
    ],
    representative_cases: [
      { title: "부동산 매매대금 분쟁", summary: "보전처분과 본안 소송을 병행해 자금 회수 가능성을 높임" },
      { title: "공사대금 청구 사건", summary: "증빙 재구성으로 채권 인정 범위를 확대하고 판결 후 집행까지 완료" },
      { title: "손해배상 집행 사건", summary: "확정판결 이후 집행 단계까지 연속 대응해 실질 회수 성과 확보" },
    ],
    work_process: [
      "분쟁 목적과 우선순위를 수치화해 목표 설정",
      "협상/소송 병행 시나리오를 단계별 제시",
      "진행 경과를 주간 단위로 공유",
    ],
    career_timeline: [
      { year: "2024", detail: "Portfolio 파트너 변호사" },
      { year: "2021", detail: "민사·가사 소송 전담팀 리드" },
      { year: "2018", detail: "대형 로펌 분쟁해결그룹 근무" },
      { year: "2015", detail: "사법시험 합격 및 연수원 수료" },
    ],
  },
  {
    slug: "lee-hayun",
    name: "이하윤",
    role: "파트너 변호사",
    description: "노동·가사 자문, 협상과 소송 병행으로 갈등 비용 최소화",
    headline: "협상·소송 병행으로 갈등 비용 최소화",
    image: "/uploads/lawyer3.png",
    tags: ["노동", "가사", "협상"],
    badges: ["노동법 실무연구회 회원", "가사소송 실무협의회 위원"],
    focus_expertise: [
      "노동 분쟁의 절차·증거 리스크 진단",
      "가사 사건 협의/소송 병행 전략 수립",
      "장기 분쟁의 비용·시간 리스크 관리",
    ],
    major_performance: [
      "해고·징계·임금 분쟁 대응 자문",
      "이혼·상속 분쟁의 협상안 설계",
      "조정·소송 병행으로 갈등 비용 최소화",
    ],
    representative_cases: [
      { title: "부당해고 구제 사건", summary: "근로기준법 쟁점 정리로 조정 단계에서 합리적 종결안 도출" },
      { title: "임금·퇴직금 분쟁", summary: "정산 근거 재구성으로 손실 범위를 줄이고 조기 종결 유도" },
      { title: "상속재산 분할 협상", summary: "협상안 구조화와 소송 병행 전략으로 가족 간 갈등 비용 절감" },
    ],
    work_process: [
      "상황 진단 후 협상/소송 우선순위 설정",
      "쟁점별 증거·일정 관리표 제공",
      "중간 점검 미팅으로 전략 유연하게 조정",
    ],
    career_timeline: [
      { year: "2024", detail: "Portfolio 노동·가사 파트너" },
      { year: "2020", detail: "노동·가사 분쟁 팀장" },
      { year: "2017", detail: "분쟁해결그룹 노동·가사 전담" },
      { year: "2014", detail: "변호사 자격 취득" },
    ],
  },
];

const heroMetrics = [
  { icon: "bi-clock-history", label: "24시간 대응" },
  { icon: "bi-people", label: "전담 배정" },
  { icon: "bi-diagram-3", label: "사건 유형별 팀 구성" },
];

const detailTabs = [
  { key: "focus_expertise", label: "핵심 전문" },
  { key: "major_performance", label: "주요 수행" },
  { key: "representative_cases", label: "대표 사례" },
  { key: "work_process", label: "진행 방식" },
  { key: "career_timeline", label: "학력/경력" },
];

const matchingRules = [
  { case_hint: "긴급체포/구속 가능성", recommended_slug: "kim-seoyun", recommended_text: "김서윤 대표 변호사 추천" },
  { case_hint: "피해자 합의/손해배상", recommended_slug: "park-dohun", recommended_text: "박도훈 파트너 변호사 추천" },
  { case_hint: "노동/가사 분쟁", recommended_slug: "lee-hayun", recommended_text: "이하윤 파트너 변호사 추천" },
];

// Hero silhouette ordering: center = kim-seoyun, sides = others
const centerAttorney = attorneys.find((a) => a.slug === "kim-seoyun")!;
const sideAttorneys = attorneys.filter((a) => a.slug !== "kim-seoyun");

export default function AttorneysPage() {
  return (
    <>
      <section className="section-block attorney-team-page">
        <div className="container">
          <div className="attorney-team-hero">
            <div className="attorney-team-hero-copy">
              <p className="eyebrow mb-2">Attorneys Team</p>
              <h1 className="section-title mb-3">전담 변호사 팀</h1>
              <p className="card-text mb-0">
                사건 성격에 맞는 전담팀을 빠르게 배정해 초기 대응부터 결과까지 밀도 있게 수행합니다.
              </p>
            </div>
            <div className="attorney-team-hero-visual" aria-hidden="true">
              {sideAttorneys.length > 0 && (
                <figure className="attorney-team-silhouette is-left">
                  <img src={sideAttorneys[0].image} alt="" loading="lazy" />
                </figure>
              )}
              <figure className="attorney-team-silhouette is-center">
                <img src={centerAttorney.image} alt="" loading="lazy" />
              </figure>
              {sideAttorneys.length > 1 && (
                <figure className="attorney-team-silhouette is-right">
                  <img src={sideAttorneys[1].image} alt="" loading="lazy" />
                </figure>
              )}
            </div>
          </div>

          <div className="attorney-hero-metrics" role="list" aria-label="신뢰 지표">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="attorney-hero-metric" role="listitem">
                <i className={`bi ${metric.icon}`} aria-hidden="true"></i>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="attorney-card-anchor" className="section-block pt-0 attorney-team-page">
        <div className="container">
          <div className="section-header attorney-grid-header">
            <p className="eyebrow mb-2">Selection</p>
            <h2 className="section-title mb-2">전담 변호사 선택</h2>
            <p className="card-text mb-0">프로필을 비교하고 바로 상담으로 연결하세요.</p>
          </div>

          <div className="attorney-card-grid has-active" data-attorney-card-grid="">
            {attorneys.map((attorney, index) => (
              <article
                key={attorney.slug}
                className={`attorney-profile-card ${index === 0 ? "is-selected" : ""}`}
                data-attorney-card={attorney.slug}
                tabIndex={0}
                aria-label={`${attorney.name} 변호사 카드`}
              >
                <div className="attorney-profile-media">
                  <img src={attorney.image} alt={`${attorney.name} 변호사 프로필`} loading="lazy" />
                </div>

                <p className="card-meta mb-1">{attorney.role}</p>
                <h3 className="card-title mb-2">{attorney.name}</h3>

                <div className="attorney-tag-list" aria-label="전문 분야 태그">
                  {attorney.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="attorney-tag">{tag}</span>
                  ))}
                </div>

                <p className="attorney-headline mb-0">{attorney.headline}</p>

                <div className="attorney-card-actions">
                  <button
                    type="button"
                    className="btn btn-premium-ghost attorney-card-btn"
                    data-attorney-select={attorney.slug}
                    data-scroll-target="attorney-detail-anchor"
                  >
                    프로필 보기
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="attorney-detail-anchor" className="section-block pt-0 attorney-team-page">
        <div className="container">
          <div className="section-header attorney-detail-header">
            <p className="eyebrow mb-2">Profile</p>
            <h2 className="section-title mb-2">선택된 변호사 상세</h2>
            <p className="card-text mb-0">카드 선택 시 상세 정보가 즉시 전환됩니다.</p>
          </div>

          <div className="attorney-detail-stack" data-attorney-detail-stack="">
            {attorneys.map((attorney, index) => (
              <article
                key={attorney.slug}
                className={`attorney-detail-panel ${index === 0 ? "is-active" : ""}`}
                data-attorney-detail={attorney.slug}
                aria-hidden={index === 0 ? "false" : "true"}
              >
                <div className="attorney-detail-left">
                  <figure className="attorney-detail-image-wrap">
                    <img src={attorney.image} alt={`${attorney.name} 변호사 상세 프로필`} loading="lazy" />
                  </figure>
                  <div className="attorney-badge-wrap">
                    {attorney.badges.map((badge) => (
                      <span key={badge} className="attorney-badge">{badge}</span>
                    ))}
                  </div>
                </div>

                <div className="attorney-detail-right">
                  <p className="card-meta mb-1">{attorney.role}</p>
                  <h3 className="section-title attorney-detail-name">{attorney.name}</h3>
                  <p className="card-text attorney-detail-summary">{attorney.description}</p>

                  <div className="attorney-detail-tabs" role="tablist" aria-label={`${attorney.name} 상세 탭`}>
                    {detailTabs.map((tab, tabIndex) => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`attorney-tab-btn ${tabIndex === 0 ? "is-active" : ""}`}
                        data-tab-trigger={tab.key}
                        aria-selected={tabIndex === 0 ? "true" : "false"}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="attorney-tab-panels">
                    {detailTabs.map((tab, tabIndex) => (
                      <section
                        key={tab.key}
                        className={`attorney-tab-panel ${tabIndex === 0 ? "is-active" : ""}`}
                        data-tab-panel={tab.key}
                        aria-hidden={tabIndex === 0 ? "false" : "true"}
                      >
                        {tab.key === "career_timeline" ? (
                          <ol className="attorney-timeline">
                            {attorney.career_timeline.map((record) => (
                              <li key={record.year} className="attorney-timeline-item">
                                <p className="attorney-timeline-year mb-0">{record.year}</p>
                                <p className="attorney-timeline-detail mb-0">{record.detail}</p>
                              </li>
                            ))}
                          </ol>
                        ) : tab.key === "representative_cases" ? (
                          <>
                            <div className="attorney-case-cards">
                              {attorney.representative_cases.slice(0, 3).map((caseItem, ci) => (
                                <article key={ci} className="attorney-case-card">
                                  <h4 className="attorney-case-title">{caseItem.title}</h4>
                                  <p className="attorney-case-summary mb-0">{caseItem.summary}</p>
                                </article>
                              ))}
                            </div>
                            <a className="link-gold attorney-case-link" href="/cases">성공사례 더 보기</a>
                          </>
                        ) : (
                          <ul className="attorney-detail-list">
                            {(attorney[tab.key as keyof typeof attorney] as string[]).map((item, li) => (
                              <li key={li}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block pt-0 attorney-team-page">
        <div className="container">
          <div className="section-header attorney-matching-header">
            <p className="eyebrow mb-2">Case Matching</p>
            <h2 className="section-title mb-2">내 사건에 맞는 변호사 추천</h2>
            <p className="card-text mb-0">상황을 누르면 해당 변호사 프로필로 바로 이동합니다.</p>
          </div>

          <div className="attorney-matching-grid">
            {matchingRules.map((match) => (
              <button
                key={match.recommended_slug}
                type="button"
                className="attorney-match-item"
                data-attorney-select={match.recommended_slug}
                data-scroll-target="attorney-detail-anchor"
              >
                <span className="attorney-match-check" aria-hidden="true">&#10003;</span>
                <span className="attorney-match-case">{match.case_hint}</span>
                <span className="attorney-match-arrow" aria-hidden="true">&rarr;</span>
                <span className="attorney-match-result">{match.recommended_text}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
