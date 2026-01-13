import { ReactNode } from "react";

export default function ParentSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}