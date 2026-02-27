import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gästelisten-App",
  description: "Gästemanagement für das Studentenwohnheim",
};

// Root layout — locale is handled by [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
