import type { Metadata } from "next";

export const metadata: Metadata = { title: "Finishing up · Ztred" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
