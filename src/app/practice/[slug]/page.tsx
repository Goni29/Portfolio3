import type { Metadata } from "next";
import { notFound } from "next/navigation";

const practiceDetailSettings = {
  scope_heading: "주요 대응 범위",
  points_heading: "핵심 수행 포인트",
  docs_heading: "초기 상담 준비 자료",
  keyword_label: "핵심 대응 키워드",
  default_hero_image: "uploads/practice_hero.png",
};

const scopeIconMap: Record<string, string[]> = {
  "criminal-defense": ["bi-person-badge", "bi-file-earmark-ruled", "bi-bank2", "bi-person-check"],
  "civil-litigation": ["bi-file-earmark-text", "bi-house-door", "bi-shield-check", "bi-hammer"],
  "corporate-advisory": ["bi-diagram-3", "bi-check2-square", "bi-people", "bi-building-check"],
  "labor-employment": ["bi-person-workspace", "bi-clock-history", "bi-building", "bi-journal-text"],
  "family-inheritance": ["bi-people", "bi-file-earmark-text", "bi-shield-exclamation", "bi-eye-slash"],
  "tax-investigation": ["bi-receipt", "bi-clipboard2-check", "bi-bar-chart-line", "bi-link-45deg"],
};

const defaultScopeIcons = ["bi-search", "bi-file-earmark-text", "bi-bank", "bi-briefcase", "bi-shield-check", "bi-journal-check"];

interface PracticeArea {
  slug: string;
  name: string;
  name_en: string;
  description: string;
  lead: string;
  service_scope: { title: string; detail: string }[];
  key_points: string[];
  recommended_docs: string[];
}

const practiceAreas: PracticeArea[] = [
  {
    slug: "criminal-defense",
    name: "형사",
    name_en: "Criminal Defense",
    description: "수사 초기 대응부터 영장·공판 변론까지 위기 대응 컨트롤타워",
    lead: "초기 진술과 증거 보전 단계에서 사건 방향이 결정됩니다. 조사 전 전략 수립으로 불필요한 리스크를 줄입니다.",
    service_scope: [
      { title: "경찰·검찰 조사 입회 및 진술 전략 수립", detail: "조사 전 사실관계와 진술 포인트를 정리해 모순 진술과 불필요한 리스크를 줄입니다." },
      { title: "구속영장 실질심사, 보석·석방 대응", detail: "영장 사유를 반박할 자료를 선별해 제출하고, 불구속 수사 전환 가능성을 높입니다." },
      { title: "공판 단계 변론과 양형 자료 구성", detail: "증거능력·사실관계·양형 사유를 분리해 재판부가 이해하기 쉬운 구조로 변론합니다." },
      { title: "피해자 합의 및 손해배상 연계 자문", detail: "합의 절차와 손해배상 계획을 함께 설계해 처분 및 양형에 반영될 수 있도록 대응합니다." },
    ],
    key_points: [
      "초기 72시간 대응 프로토콜 운영",
      "디지털 증거·계좌내역 등 사실관계 정밀 검토",
      "사건 종결 이후 재발 방지 체크리스트 제공",
    ],
    recommended_docs: [
      "소환장·출석요구서 사본",
      "메신저/통화기록 캡처 및 원본 파일",
      "사건 경위 타임라인 메모",
    ],
  },
  {
    slug: "civil-litigation",
    name: "민사",
    name_en: "Civil Litigation",
    description: "계약·손해배상·부동산 분쟁의 전략 수립과 소송 수행",
    lead: "문서와 사실관계를 구조화해 협상과 소송의 우선순위를 정합니다. 비용 대비 결과를 고려한 실행안을 제시합니다.",
    service_scope: [
      { title: "계약 분쟁·채권 회수·손해배상 청구", detail: "계약 해석과 이행 경과를 재구성해 청구·방어 포지션을 명확하게 설정합니다." },
      { title: "부동산 매매·임대차·하자 분쟁 대응", detail: "권리관계와 하자·대금 쟁점을 분리해 분쟁의 핵심 포인트를 선명하게 만듭니다." },
      { title: "가압류·가처분 등 보전처분 신청", detail: "판결 전 자산 보전 필요성을 입증해 회수 가능성과 협상력을 함께 확보합니다." },
      { title: "판결 이후 강제집행 단계까지 후속 수행", detail: "확정판결 이후 집행 절차를 연속 수행해 실질 회수까지 이어지도록 관리합니다." },
    ],
    key_points: [
      "초기 증거 보전 및 법적 포지션 명확화",
      "협상안/소송안 병행 제시로 의사결정 지원",
      "집행 가능성까지 고려한 종결 전략 설계",
    ],
    recommended_docs: [
      "계약서·합의서·세금계산서 등 거래 문서",
      "대금 지급 내역(계좌이체/영수증)",
      "상대방과의 문자·이메일·내용증명",
    ],
  },
  {
    slug: "corporate-advisory",
    name: "기업자문",
    name_en: "Corporate Advisory",
    description: "거래 구조 설계, 컴플라이언스, 분쟁 예방 중심 리스크 관리",
    lead: "사후 소송보다 사전 통제가 비용을 줄입니다. 계약·인사·규제 대응을 정례화해 분쟁 가능성을 낮춥니다.",
    service_scope: [
      { title: "계약서 검토 및 거래 구조 리스크 진단", detail: "거래 목적에 맞는 계약 구조를 설계하고 불리한 조항을 사전에 조정합니다." },
      { title: "내부통제·개인정보·공정거래 컴플라이언스", detail: "규제 이슈를 점검표 기반으로 관리해 감사·조사 리스크를 낮춥니다." },
      { title: "이사회/주주총회 운영 및 지배구조 자문", detail: "의사결정 절차와 기록 체계를 정비해 사후 분쟁 가능성을 줄입니다." },
      { title: "분쟁 징후 단계의 사전 협상·대응 체계 구축", detail: "분쟁이 본격화되기 전 사실관계 정리와 커뮤니케이션 기준을 선제적으로 마련합니다." },
    ],
    key_points: [
      "업종별 체크리스트 기반 상시 자문 운영",
      "법무·재무·실무부서 협업형 이슈 관리",
      "분쟁 발생 시 보고 체계와 커뮤니케이션 일원화",
    ],
    recommended_docs: [
      "표준계약서 및 최근 체결 계약서",
      "내부 규정/업무 프로세스 문서",
      "최근 컴플라이언스 점검 결과",
    ],
  },
  {
    slug: "labor-employment",
    name: "노동",
    name_en: "Labor & Employment",
    description: "해고·징계·임금 분쟁 대응과 사용자·근로자 대리",
    lead: "노동 분쟁은 문서와 절차의 완성도가 핵심입니다. 예방 자문과 분쟁 대응을 하나의 프로세스로 운영합니다.",
    service_scope: [
      { title: "징계·해고·전보 등 인사조치 적법성 검토", detail: "절차 준수 여부와 입증자료를 점검해 부당징계·부당해고 위험을 사전에 관리합니다." },
      { title: "임금·퇴직금·근로시간 관련 분쟁 대응", detail: "근로기록과 지급내역을 구조화해 쟁점별 대응 시나리오를 수립합니다." },
      { title: "노동청 진정·노동위원회 구제 절차 대리", detail: "조사·심문 단계별 제출자료와 진술 전략을 설계해 대응 일관성을 높입니다." },
      { title: "취업규칙·인사규정 개정 및 현장 교육", detail: "내부 규정 정비와 실무 교육을 병행해 분쟁 재발 가능성을 낮춥니다." },
    ],
    key_points: [
      "사내 문서 기준 정비로 분쟁 선제 예방",
      "노사관계 이슈별 증거 수집 포맷 표준화",
      "조정·합의와 소송의 병행 전략 운영",
    ],
    recommended_docs: [
      "근로계약서·취업규칙·인사발령 문서",
      "급여대장·출퇴근기록·성과평가 자료",
      "사내 공지·경고장·면담 기록",
    ],
  },
  {
    slug: "family-inheritance",
    name: "가사",
    name_en: "Family & Inheritance",
    description: "이혼·상속·재산분할 쟁점의 비공개 맞춤형 대응",
    lead: "감정 소모를 줄이면서도 재산·양육·상속의 핵심 쟁점을 놓치지 않는 균형형 전략을 제시합니다.",
    service_scope: [
      { title: "이혼·재산분할·위자료·친권/양육권 분쟁", detail: "당사자 목표를 우선순위로 정리해 재산·양육 쟁점을 단계별로 대응합니다." },
      { title: "상속재산 분할·유류분·유언 효력 검토", detail: "상속재산 범위와 기여분·유류분 계산을 근거 중심으로 정리합니다." },
      { title: "가사조정·가압류 등 임시 처분 대응", detail: "조정·임시처분 절차를 활용해 장기 소송 전 실익을 선제 확보합니다." },
      { title: "개인정보 보호를 고려한 비공개 절차 운영", detail: "민감한 가족정보 노출을 최소화하는 문서 작성·제출 방식을 적용합니다." },
    ],
    key_points: [
      "분쟁 장기화를 줄이기 위한 합의 프레임 설계",
      "재산 현황 파악 및 증빙 체계화",
      "판결 이후 이행 확보 방안까지 사전 검토",
    ],
    recommended_docs: [
      "혼인관계·가족관계 증명서류",
      "부동산·금융자산·채무 관련 자료",
      "상속 관련 유언장·증여계약서",
    ],
  },
  {
    slug: "tax-investigation",
    name: "조세",
    name_en: "Tax Investigation",
    description: "세무조사 대응, 조세불복, 기업 세무 리스크 진단",
    lead: "조세 이슈는 조사 초기 설명 방식과 자료 제출 전략이 핵심입니다. 과세 단계별 대응 시나리오를 사전에 마련합니다.",
    service_scope: [
      { title: "국세·지방세 세무조사 대응", detail: "조사 통지 직후 쟁점별 자료 제출 계획을 수립해 조사 리스크를 줄입니다." },
      { title: "과세전적부심·이의신청·심판청구", detail: "불복 절차별 주장 구조를 설계해 과세 처분의 위법·부당성을 체계적으로 다툽니다." },
      { title: "법인·오너 리스크 점검 및 개선안 제시", detail: "거래·회계·의사결정 기록을 진단해 반복 노출되는 세무 리스크를 정리합니다." },
      { title: "형사 조세 이슈 연계 대응", detail: "조세 쟁점과 형사 리스크가 연결된 사안을 통합 관점으로 대응합니다." },
    ],
    key_points: [
      "쟁점별 사실관계와 법리 분리 검토",
      "조사 단계 커뮤니케이션 창구 단일화",
      "사후 동일 이슈 재발 방지 체계 수립",
    ],
    recommended_docs: [
      "세무조사 통지서 및 질의서",
      "회계장부·증빙·신고서 사본",
      "내부 의사결정 기록 및 거래 배경 문서",
    ],
  },
];

// Map user-facing slugs to Next.js route slugs
const slugMap: Record<string, string> = {
  criminal: "criminal-defense",
  civil: "civil-litigation",
  corporate: "corporate-advisory",
  labor: "labor-employment",
  family: "family-inheritance",
  tax: "tax-investigation",
};

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = slugMap[slug] || slug;
  const area = practiceAreas.find((a) => a.slug === resolvedSlug);
  return {
    title: area ? `${area.name} | Practice | Portfolio Law Firm` : "Practice | Portfolio Law Firm",
  };
}

export default async function PracticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolvedSlug = slugMap[slug] || slug;
  const area = practiceAreas.find((a) => a.slug === resolvedSlug);

  if (!area) {
    notFound();
  }

  const areaIcons = scopeIconMap[area.slug] || [];

  return (
    <section className="section-block practice-detail-block">
      <div className="container">
        <nav className="practice-detail-breadcrumb" aria-label="breadcrumb">
          <a className="link-gold" href="/practice">업무 분야</a>
          <span className="muted-text">/</span>
          <span className="muted-text">{area.name}</span>
        </nav>

        <header
          className="practice-detail-hero-shell has-image"
          style={{ "--practice-hero-image": `url('/${practiceDetailSettings.default_hero_image}')` } as React.CSSProperties}
        >
          <div className="practice-hero-copy">
            <p className="eyebrow mb-2">{area.name_en}</p>
            <h1 className="practice-detail-title mb-3">{area.name}</h1>
            <p className="practice-detail-lead mb-0">{area.lead}</p>
            {area.recommended_docs.length > 0 && (
              <div className="practice-keyword-line">
                <span className="practice-keyword-label">{practiceDetailSettings.keyword_label}</span>
                {area.recommended_docs.slice(0, 4).map((keyword, i) => (
                  <span key={i} className="practice-keyword-item">{keyword}</span>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="practice-detail-section">
          <h2 className="practice-detail-heading">{practiceDetailSettings.scope_heading}</h2>
          <div className="practice-scope-grid">
            {area.service_scope.map((item, index) => {
              const icon = areaIcons[index] || defaultScopeIcons[index % defaultScopeIcons.length];
              return (
                <article key={index} className="practice-scope-item">
                  <p className="practice-scope-icon" aria-hidden="true">
                    <i className={`bi ${icon}`}></i>
                  </p>
                  <h3 className="practice-scope-title">{item.title}</h3>
                  <p className="practice-scope-desc mb-0">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="practice-detail-section">
          <h2 className="practice-detail-heading">{practiceDetailSettings.points_heading}</h2>
          <div className="practice-point-grid">
            {area.key_points.map((point, index) => (
              <article key={index} className="practice-point-item">
                <p className="practice-point-number mb-0">{String(index + 1).padStart(2, "0")}.</p>
                <div>
                  <h3 className="practice-point-title mb-1">{point}</h3>
                  <p className="practice-point-desc mb-0">{area.lead}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {area.recommended_docs.length > 0 && (
          <section className="practice-detail-section practice-docs-section">
            <h2 className="practice-detail-heading">{practiceDetailSettings.docs_heading}</h2>
            <div className="practice-doc-chip-list">
              {area.recommended_docs.map((doc, i) => (
                <span key={i} className="practice-doc-chip">{doc}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
