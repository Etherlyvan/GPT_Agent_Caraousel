import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raho Premier – AI Carousel Generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-inter bg-[linear-gradient(145deg,#0e0d09_0%,#1a1812_45%,#221e12_100%)] min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}