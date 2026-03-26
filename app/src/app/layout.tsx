import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "生コン書類管理 - Mill Box",
  description: "確認検査に向けた生コン書類業務の効率化",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f5f5f5]">{children}</body>
    </html>
  );
}
