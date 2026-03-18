"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HomeBodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
  }, [pathname]);

  // Re-initialize main.js behaviors on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
      window.dispatchEvent(new Event("load"));
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
