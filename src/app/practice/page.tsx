import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice | Portfolio Law Firm",
};

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

export default function PracticePage() {
  return (
    <section className="section-block">
      <div className="container">
        <div className="section-header practice-showcase-header">
          <p className="eyebrow mb-2">Practice</p>
          <h1 className="section-title mb-2">핵심 업무 분야</h1>
          <p className="card-text mb-0">
            분야별 페이지에서 주요 대응 범위와 진행 방식, 준비 자료를 확인하실 수 있습니다.
          </p>
        </div>

        <div className="practice-showcase-grid" aria-label="업무 분야 목록">
          {practiceAreas.map((area) => (
            <a key={area.slug} className="practice-showcase-item" href={`/practice/${area.slug}`}>
              <p className="practice-showcase-en mb-1">{area.name_en}</p>
              <h2 className="practice-showcase-title mb-2">{area.name}</h2>
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
  );
}
