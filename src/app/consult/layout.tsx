import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consult | Portfolio Law Firm",
};

export default function ConsultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
