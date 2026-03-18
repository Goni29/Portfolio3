// [수정] 2026-02-19: 공통 스크립트(헤더 높이 동기화/카운트업/홈 슬라이더/변호사 상세 인터랙션) 통합 정리
// [수정] 2026-02-20: Footer 지도를 embed iframe 방식으로 전환해 Google JS 초기화 로직 제거

function boot() {
  if (window.__PLF_BOOTED) return;
  window.__PLF_BOOTED = true;
  // [수정] 2026-02-19: Hero가 Navbar를 제외한 높이를 채우도록 헤더 높이를 CSS 변수에 반영
  const syncHeaderHeight = () => {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty("--site-header-height", `${headerHeight}px`);
  };

  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight);

  const mainNavbar = document.getElementById("mainNavbar");
  if (mainNavbar) {
    // [수정] 2026-02-20: body 고정 잠금 부작용(점프/사라짐)을 제거하고 메뉴 상태 클래스만 동기화
    const updateNavOverlayState = () => {
      const isOverlayRange = window.matchMedia("(max-width: 991.98px)").matches;
      // [수정] 2026-02-20: 닫힘 슬라이드 중(collapsing)에도 오버레이 상태를 유지해 끝단 멈춤 현상 완화
      const isOpen =
        isOverlayRange &&
        (mainNavbar.classList.contains("show") || mainNavbar.classList.contains("collapsing"));
      document.body.classList.toggle("nav-overlay-open", isOpen);
    };

    // [수정] 2026-02-20: 닫힘 시작 시 현재 높이를 명시적으로 고정해 끝단 스냅/점프를 완화
    mainNavbar.addEventListener("show.bs.collapse", () => {
      mainNavbar.style.height = "";
      window.requestAnimationFrame(updateNavOverlayState);
    });

    mainNavbar.addEventListener("shown.bs.collapse", () => {
      mainNavbar.style.height = "";
      updateNavOverlayState();
    });

    mainNavbar.addEventListener("hide.bs.collapse", () => {
      const isOverlayRange = window.matchMedia("(max-width: 991.98px)").matches;
      if (isOverlayRange) {
        const currentHeight = mainNavbar.getBoundingClientRect().height;
        if (currentHeight > 0) {
          mainNavbar.style.height = `${currentHeight}px`;
          // 브라우저 reflow를 한 번 확정해 height transition 시작점을 고정
          void mainNavbar.offsetHeight;
        }
      }
      window.requestAnimationFrame(updateNavOverlayState);
    });

    mainNavbar.addEventListener("hidden.bs.collapse", () => {
      mainNavbar.style.height = "";
      updateNavOverlayState();
    });

    // [수정] 2026-02-20: 오버레이 메뉴에서 항목 탭 시 메뉴를 자동 닫아 콘텐츠 접근성 개선
    mainNavbar.querySelectorAll(".nav-link").forEach((navLink) => {
      navLink.addEventListener("click", () => {
        const isOverlayRange = window.matchMedia("(max-width: 991.98px)").matches;
        if (!isOverlayRange || !mainNavbar.classList.contains("show")) {
          return;
        }
        if (window.bootstrap?.Collapse) {
          window.bootstrap.Collapse.getOrCreateInstance(mainNavbar).hide();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (!window.matchMedia("(max-width: 991.98px)").matches) {
        document.body.classList.remove("nav-overlay-open");
      }
      updateNavOverlayState();
    });

    updateNavOverlayState();
  }

  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    window.setTimeout(() => {
      alert.classList.add("fade");
      alert.classList.remove("show");
    }, 3500);
  });

  // [수정] 2026-02-20: 화면 폭/폰트 기준으로 문맥(단어) 단위 줄바꿈을 수행하는 스마트 래핑 추가
  const smartWrapSelectors = [
    ".hero-subtitle",
    ".section-header .card-text",
    ".home-outcome-summary",
    ".home-why-item-desc",
    ".practice-showcase-desc",
    ".practice-detail-lead",
    ".practice-scope-desc",
    ".practice-point-desc",
    ".attorney-copy-item .card-text",
    ".consult-subtitle",
    ".consult-reply-note",
  ];
  const smartWrapTargets = Array.from(
    document.querySelectorAll(smartWrapSelectors.join(","))
  ).filter((element) => element.childElementCount === 0);
  // [수정] 2026-02-20: 텍스트가 가용 너비 끝(직전)까지 사용된 뒤 줄바꿈되도록 허용 폭 조정
  const SMART_WRAP_TOLERANCE = 0.99;

  const wrapCanvas = document.createElement("canvas");
  const wrapContext = wrapCanvas.getContext("2d");

  const normalizeText = (text) => (text || "").replace(/\s+/g, " ").trim();

  const setContextFont = (computedStyle) => {
    if (!wrapContext) {
      return;
    }
    const fontStyle = computedStyle.fontStyle || "normal";
    const fontVariant = computedStyle.fontVariant || "normal";
    const fontWeight = computedStyle.fontWeight || "400";
    const fontSize = computedStyle.fontSize || "16px";
    const fontFamily = computedStyle.fontFamily || "sans-serif";
    wrapContext.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
  };

  const measureWidth = (text, computedStyle) => {
    if (!wrapContext) {
      return text.length * 8;
    }
    setContextFont(computedStyle);
    return wrapContext.measureText(text).width;
  };

  const splitLongToken = (token, maxWidth, computedStyle) => {
    const segments =
      typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
        ? Array.from(new Intl.Segmenter("ko", { granularity: "grapheme" }).segment(token), (item) => item.segment)
        : Array.from(token);

    const pieces = [];
    let current = "";
    segments.forEach((segment) => {
      const candidate = `${current}${segment}`;
      if (!current || measureWidth(candidate, computedStyle) <= maxWidth) {
        current = candidate;
      } else {
        pieces.push(current);
        current = segment;
      }
    });
    if (current) {
      pieces.push(current);
    }
    return pieces;
  };

  const restoreOriginalText = (element) => {
    const originalText = element.dataset.smartWrapOriginal;
    if (originalText && normalizeText(element.textContent) !== originalText) {
      element.textContent = originalText;
    }
  };

  const applySmartWrapToElement = (element) => {
    const originalText =
      element.dataset.smartWrapOriginal || normalizeText(element.textContent);

    if (!originalText) {
      return;
    }

    if (!element.dataset.smartWrapOriginal) {
      element.dataset.smartWrapOriginal = originalText;
    }

    const computedStyle = window.getComputedStyle(element);
    const maxWidth = element.clientWidth;
    if (!maxWidth) {
      return;
    }
    const effectiveMaxWidth = Math.max(0, maxWidth * SMART_WRAP_TOLERANCE);

    // [수정] 2026-02-20: 한 줄에 충분히 들어가는 텍스트는 강제 줄바꿈을 하지 않음
    if (measureWidth(originalText, computedStyle) <= effectiveMaxWidth) {
      restoreOriginalText(element);
      return;
    }

    const tokens = originalText.split(" ");
    const lines = [];
    let line = "";

    tokens.forEach((token) => {
      const candidate = line ? `${line} ${token}` : token;
      if (measureWidth(candidate, computedStyle) <= effectiveMaxWidth) {
        line = candidate;
        return;
      }

      if (line) {
        lines.push(line);
      }

      if (measureWidth(token, computedStyle) <= effectiveMaxWidth) {
        line = token;
      } else {
        const tokenPieces = splitLongToken(token, effectiveMaxWidth, computedStyle);
        if (tokenPieces.length > 1) {
          lines.push(...tokenPieces.slice(0, -1));
          line = tokenPieces[tokenPieces.length - 1];
        } else {
          line = token;
        }
      }
    });

    if (line) {
      lines.push(line);
    }

    const fragment = document.createDocumentFragment();
    lines.forEach((lineText, index) => {
      fragment.appendChild(document.createTextNode(lineText));
      if (index < lines.length - 1) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    element.replaceChildren(fragment);
  };

  const applySmartWrapAll = () => {
    smartWrapTargets.forEach((element) => applySmartWrapToElement(element));
  };

  if (smartWrapTargets.length) {
    applySmartWrapAll();
    window.addEventListener("load", applySmartWrapAll);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        window.requestAnimationFrame(applySmartWrapAll);
      });
    }

    let wrapRafId = 0;
    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(wrapRafId);
      wrapRafId = window.requestAnimationFrame(applySmartWrapAll);
    });
  }

  // [수정] 2026-02-19: iOS/모바일 자동재생 제약 환경에서 Hero 비디오 재생을 재시도
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo && typeof heroVideo.play === "function") {
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }

  const countupElements = document.querySelectorAll(".js-countup");
  if (countupElements.length) {
    const animateCountup = (element) => {
      if (element.dataset.animated === "true") {
        return;
      }

      const target = Number.parseInt(element.dataset.target || "0", 10);
      if (!Number.isFinite(target) || target <= 0) {
        return;
      }

      const suffix = element.dataset.suffix || "";
      const startValue = target > 1 ? 1 : target;
      const duration = 1200;
      const startTime = performance.now();
      element.dataset.animated = "true";

      const render = (value) => {
        element.textContent = `${value.toLocaleString("ko-KR")}${suffix}`;
      };

      const tick = (timestamp) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(startValue + (target - startValue) * progress);
        render(current);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          render(target);
        }
      };

      render(startValue);
      window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCountup(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );

      countupElements.forEach((element) => observer.observe(element));
    } else {
      countupElements.forEach((element) => animateCountup(element));
    }
  }

  const attorneySliders = document.querySelectorAll("[data-attorney-slider]");
  attorneySliders.forEach((slider) => {
    const profiles = Array.from(slider.querySelectorAll(".attorney-profile"));
    const copyItems = Array.from(slider.querySelectorAll(".attorney-copy-item"));
    const navButtons = Array.from(slider.querySelectorAll(".attorney-nav"));
    if (!profiles.length) {
      return;
    }

    let activeIndex = profiles.findIndex((profile) => profile.classList.contains("is-active"));
    if (activeIndex < 0) {
      activeIndex = 0;
    }

    const renderProfile = (nextIndex) => {
      activeIndex = (nextIndex + profiles.length) % profiles.length;
      profiles.forEach((profile, index) => {
        const isActive = index === activeIndex;
        profile.classList.toggle("is-active", isActive);
        profile.setAttribute("aria-hidden", (!isActive).toString());
      });

      // [수정] 2026-02-19: 사선 프레임 이미지와 하단 소개 텍스트를 같은 인덱스로 동기화
      copyItems.forEach((copyItem, index) => {
        const isActive = index === activeIndex;
        copyItem.classList.toggle("is-active", isActive);
        copyItem.setAttribute("aria-hidden", (!isActive).toString());
      });
    };

    const prevButton = slider.querySelector("[data-slide='prev']");
    const nextButton = slider.querySelector("[data-slide='next']");

    if (prevButton) {
      prevButton.addEventListener("click", () => renderProfile(activeIndex - 1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => renderProfile(activeIndex + 1));
    }

    // [수정] 2026-02-19: 내비게이션 버튼 hover/focus 시 양쪽 버튼 애니메이션을 함께 일시정지
    const syncNavPauseState = () => {
      const shouldPause = navButtons.some(
        (button) => button.matches(":hover") || button.matches(":focus-visible")
      );
      slider.classList.toggle("is-nav-paused", shouldPause);
    };

    const syncNavPauseStateDeferred = () => {
      window.requestAnimationFrame(syncNavPauseState);
    };

    navButtons.forEach((button) => {
      button.addEventListener("mouseenter", syncNavPauseState);
      button.addEventListener("mouseleave", syncNavPauseStateDeferred);
      button.addEventListener("focus", syncNavPauseState);
      button.addEventListener("blur", syncNavPauseStateDeferred);
      // [수정] 2026-02-19: 클릭 후 blur 처리로 애니메이션이 멈춘 상태로 남지 않도록 보정
      button.addEventListener("click", () => {
        button.blur();
        syncNavPauseStateDeferred();
      });
    });

    syncNavPauseState();
    renderProfile(activeIndex);
  });

  // [수정] 2026-02-19: 변호사 상세 페이지 카드 선택/상세 탭/매칭 클릭 인터랙션 추가
  const attorneyCardGrid = document.querySelector("[data-attorney-card-grid]");
  const attorneyCards = Array.from(document.querySelectorAll("[data-attorney-card]"));
  const attorneyDetailPanels = Array.from(document.querySelectorAll("[data-attorney-detail]"));
  const selectedAttorneyInput = document.querySelector("[data-selected-attorney-input]");

  const selectAttorney = (slug, options = {}) => {
    if (!slug || !attorneyCards.length || !attorneyDetailPanels.length) {
      return;
    }

    let hasSelected = false;

    attorneyCards.forEach((card) => {
      const isSelected = card.dataset.attorneyCard === slug;
      card.classList.toggle("is-selected", isSelected);
      card.setAttribute("aria-selected", isSelected.toString());
      if (isSelected) {
        hasSelected = true;
      }
    });

    attorneyDetailPanels.forEach((panel) => {
      const isSelected = panel.dataset.attorneyDetail === slug;
      panel.classList.toggle("is-active", isSelected);
      panel.setAttribute("aria-hidden", (!isSelected).toString());
    });

    if (!hasSelected) {
      return;
    }

    if (attorneyCardGrid) {
      attorneyCardGrid.classList.add("has-active");
    }

    if (selectedAttorneyInput) {
      selectedAttorneyInput.value = slug;
    }

    const { scrollTarget } = options;
    if (scrollTarget) {
      const target = document.getElementById(scrollTarget);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (attorneyCards.length && attorneyDetailPanels.length) {
    attorneyCards.forEach((card) => {
      const slug = card.dataset.attorneyCard;
      if (!slug) {
        return;
      }

      card.addEventListener("click", (event) => {
        if (event.target.closest("a, button, input, select, textarea, label")) {
          return;
        }
        selectAttorney(slug);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectAttorney(slug);
        }
      });
    });

    const selectTriggers = Array.from(document.querySelectorAll("[data-attorney-select]"));
    selectTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const slug = trigger.dataset.attorneySelect;
        if (!slug) {
          return;
        }
        event.preventDefault();
        selectAttorney(slug, {
          scrollTarget: trigger.dataset.scrollTarget || "",
        });
      });
    });

    const defaultCard = attorneyCards.find((card) => card.classList.contains("is-selected")) || attorneyCards[0];
    // [수정] 2026-02-20: 메인페이지에서 전달된 변호사 slug 쿼리값으로 해당 카드/상세를 자동 선택
    const requestedAttorneySlug = new URLSearchParams(window.location.search).get("attorney");
    const hasRequestedAttorney =
      !!requestedAttorneySlug &&
      attorneyCards.some((card) => card.dataset.attorneyCard === requestedAttorneySlug);

    if (hasRequestedAttorney && requestedAttorneySlug) {
      selectAttorney(requestedAttorneySlug);
    } else if (defaultCard?.dataset.attorneyCard) {
      selectAttorney(defaultCard.dataset.attorneyCard);
    }
  }

  const detailPanels = Array.from(document.querySelectorAll(".attorney-detail-panel"));
  detailPanels.forEach((panel) => {
    const tabButtons = Array.from(panel.querySelectorAll("[data-tab-trigger]"));
    const tabPanels = Array.from(panel.querySelectorAll("[data-tab-panel]"));
    if (!tabButtons.length || !tabPanels.length) {
      return;
    }

    const selectTab = (key) => {
      tabButtons.forEach((button) => {
        const isActive = button.dataset.tabTrigger === key;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive.toString());
      });

      tabPanels.forEach((tabPanel) => {
        const isActive = tabPanel.dataset.tabPanel === key;
        tabPanel.classList.toggle("is-active", isActive);
        tabPanel.setAttribute("aria-hidden", (!isActive).toString());
      });
    };

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.tabTrigger;
        if (key) {
          selectTab(key);
        }
      });
    });

    const defaultTab = tabButtons.find((button) => button.classList.contains("is-active")) || tabButtons[0];
    if (defaultTab?.dataset.tabTrigger) {
      selectTab(defaultTab.dataset.tabTrigger);
    }
  });

  // [수정] 2026-02-20: 성공사례 페이지 필터/상세토글/스크롤 등장 애니메이션 인터랙션 추가
  const caseHub = document.querySelector("[data-case-hub]");
  if (caseHub) {
    const caseCards = Array.from(caseHub.querySelectorAll("[data-case-card]"));
    const categoryFilterButtons = Array.from(caseHub.querySelectorAll("[data-filter-category]"));
    const searchInput = caseHub.querySelector("[data-filter-search]");
    const midCta = caseHub.querySelector("[data-case-mid-cta]");
    const emptyState = caseHub.querySelector(".cases-hub-empty");

    let activeCategory = "all";

    const updateActiveFilterButton = (buttons, activeKey, keyName) => {
      buttons.forEach((button) => {
        const isActive = button.dataset[keyName] === activeKey;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive.toString());
      });
    };

    const applyCaseFilters = () => {
      const query = (searchInput?.value || "").trim().toLowerCase();
      let visibleCount = 0;

      caseCards.forEach((card) => {
        const categoryKey = card.dataset.caseCategory || "";
        const searchText = (card.dataset.caseSearch || "").toLowerCase();

        const matchesCategory = activeCategory === "all" || categoryKey === activeCategory;
        const matchesSearch = !query || searchText.includes(query);
        const shouldShow = matchesCategory && matchesSearch;

        card.classList.toggle("is-hidden", !shouldShow);
        card.hidden = !shouldShow;
        if (shouldShow) {
          visibleCount += 1;
        }
      });

      if (midCta) {
        midCta.hidden = visibleCount < 3;
      }

      if (emptyState && caseCards.length) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    categoryFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filterCategory || "all";
        updateActiveFilterButton(categoryFilterButtons, activeCategory, "filterCategory");
        applyCaseFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyCaseFilters);
    }

    const detailToggleButtons = Array.from(caseHub.querySelectorAll("[data-case-detail-toggle]"));
    const setCaseDetailState = (card, shouldOpen) => {
      const detail = card?.querySelector("[data-case-detail]");
      const button = card?.querySelector("[data-case-detail-toggle]");
      if (!card || !detail || !button) {
        return;
      }

      detail.hidden = !shouldOpen;
      card.classList.toggle("is-open", shouldOpen);
      button.innerHTML = shouldOpen
        ? '상세 닫기 <span aria-hidden="true">↑</span>'
        : '자세히 보기 <span aria-hidden="true">→</span>';
    };

    const openCaseDetail = (card) => {
      caseCards.forEach((otherCard) => {
        if (otherCard !== card) {
          setCaseDetailState(otherCard, false);
        }
      });
      setCaseDetailState(card, true);
    };

    detailToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-case-card]");
        const detail = card?.querySelector("[data-case-detail]");
        if (!card || !detail) {
          return;
        }

        const shouldOpen = detail.hidden;
        if (shouldOpen) {
          openCaseDetail(card);
        } else {
          setCaseDetailState(card, false);
        }
      });
    });

    updateActiveFilterButton(categoryFilterButtons, activeCategory, "filterCategory");
    applyCaseFilters();

    // [수정] 2026-02-20: 메인페이지에서 전달된 케이스 식별자로 해당 카드 상세를 자동 오픈
    const caseParams = new URLSearchParams(window.location.search);
    const requestedCaseSlug = (caseParams.get("case") || "").trim();
    const requestedCaseId = (caseParams.get("case_id") || "").trim();

    if (requestedCaseSlug || requestedCaseId) {
      const targetCard = caseCards.find((card) => {
        const cardSlug = (card.dataset.caseSlug || "").trim();
        const cardId = (card.dataset.caseId || "").trim();
        return (
          (requestedCaseSlug && cardSlug === requestedCaseSlug) ||
          (requestedCaseId && cardId === requestedCaseId)
        );
      });

      if (targetCard) {
        targetCard.classList.remove("is-hidden");
        targetCard.hidden = false;
        openCaseDetail(targetCard);
        window.requestAnimationFrame(() => {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
    }

    const revealElements = Array.from(caseHub.querySelectorAll(".case-reveal"));
    if (revealElements.length) {
      if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.14 }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
      } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
      }
    }
  }

}

window.addEventListener("DOMContentLoaded", boot);

// Safety net: if DOMContentLoaded already fired before this script loaded, run boot now
if (document.readyState !== "loading") {
  boot();
}
