import type { Metadata } from "next";

export const metadata: Metadata = { title: "Super Admin · Ztred" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
