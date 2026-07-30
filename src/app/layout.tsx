import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SearchProvider } from "@/components/search/search-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/layout/back-to-top";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const siteUrl = "https://docs.furmbase.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Furmbase Documentation",
    template: "%s · Furmbase Docs",
  },
  description:
    "Official documentation for Furmbase — build forms, collect payments, generate forms with AI, and analyze responses. Guides, tutorials, and API reference.",
  keywords: [
    "Furmbase",
    "Furmbase documentation",
    "form builder",
    "AI form generator",
    "online forms",
    "payment forms",
    "survey builder",
    "developer docs",
  ],
  authors: [{ name: "Furmbase" }],
  creator: "Furmbase",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Furmbase Documentation",
    title: "Furmbase Documentation",
    description:
      "Guides, tutorials, and API reference for building forms, collecting payments, and automating workflows with Furmbase.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furmbase Documentation",
    description:
      "Guides, tutorials, and API reference for building forms, collecting payments, and automating workflows with Furmbase.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <BackToTop />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
