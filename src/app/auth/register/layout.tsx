import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create an account · Ztred" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
