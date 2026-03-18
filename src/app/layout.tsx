import type { Metadata } from "next";
import Script from "next/script";
import HomeBodyClass from "./HomeBodyClass";

export const metadata: Metadata = {
  title: "Portfolio Law Firm",
  description: "신뢰로 해결을 설계합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/attorneys", label: "Attorneys" },
    { href: "/practice", label: "Practice" },
    { href: "/cases", label: "Cases" },
    { href: "/consult", label: "Consult" },
  ];

  const footerQuickLinks = [
    { href: "/about", label: "About" },
    { href: "/attorneys", label: "Attorneys" },
    { href: "/practice", label: "Practice" },
    { href: "/cases", label: "Cases" },
    { href: "/consult", label: "Consult" },
  ];

  const legalLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Business Info", href: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Asta+Sans:wght@100;300;400;500;700;900&family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/theme.css" />
      </head>
      <body className="app-body public-layout">
        <HomeBodyClass />
        <header className="site-header">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container py-2">
              <a className="navbar-brand site-title" href="/">Portfolio Law Firm</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="mainNavbar" className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav gap-lg-2">
                  {navItems.map((item) => (
                    <li key={item.href} className="nav-item">
                      <a className="nav-link" href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container py-5">
            <div className="footer-main-grid">
              <div className="footer-col footer-firm-col">
                <p className="footer-firm-title mb-2">
                  <i className="bi bi-bank2" aria-hidden="true"></i>
                  <span>Portfolio Law Firm</span>
                </p>
                <p className="footer-firm-slogan mb-3">신뢰로 해결을 설계합니다.</p>
                <ul className="footer-contact-list">
                  <li className="footer-contact-item">
                    <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                    <span>전화 02-0000-0000</span>
                  </li>
                  <li className="footer-contact-item">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                    <span>주소 Seoul, Korea</span>
                  </li>
                </ul>
              </div>

              <div className="footer-col footer-links-col">
                <p className="footer-col-title mb-2">Quick Links</p>
                <ul className="footer-quick-links">
                  {footerQuickLinks.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-col footer-visit-col">
                <p className="footer-col-title mb-2">Visit Us</p>
                <div className="footer-map-card">
                  <div className="footer-map-wrap">
                    <iframe
                      className="footer-map"
                      src="https://maps.google.com/maps?q=Seoul&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-label="오시는길 지도"
                    ></iframe>
                  </div>
                  <a
                    className="footer-map-link"
                    href="https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C"
                    target="_blank"
                    rel="noopener"
                  >
                    <span>지도에서 보기</span>
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            <hr className="footer-divider my-4" />

            <div className="footer-subbar">
              <p className="footer-copy mb-0">&copy; {currentYear} Portfolio Law Firm</p>
              <ul className="footer-legal-links">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
