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

  return null;
}
