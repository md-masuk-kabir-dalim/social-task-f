import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/Providers";
import "./globals.css";
const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SocialHub - Connect, Share, and Engage",
  description:
    "A modern social media platform to connect with amazing people, share ideas, and build meaningful relationships.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="transition-colors duration-300">
      <body
        className={`${_geist.className} font-sans antialiased`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
