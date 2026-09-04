import type { Metadata } from "next";
import { Barlow, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/application/toast/toast";
import { ConfigProvider } from "@/lib/config-context";

// Geist dresses the docs site chrome (sidebar, headings, prose).
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Geist Mono is the docs UI's monospace face (code snippets, token values).
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Barlow is the DEW component typeface - applied directly on component
// roots (see `font-barlow` usages in components/base/**) so components
// render in Barlow regardless of the page font around them.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "DEW Design System",
  description: "DEW - design tokens, components, and patterns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${barlow.variable} font-sans`} suppressHydrationWarning>
        <ConfigProvider>
          <Sidebar />
          <main className="ml-56 min-h-screen px-12 py-10 max-w-5xl">
            {children}
          </main>
          <Toaster />
          {process.env.NODE_ENV === "development" && <Agentation />}
        </ConfigProvider>
      </body>
    </html>
  );
}
