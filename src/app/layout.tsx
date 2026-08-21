import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SearchProvider } from "@/components/search/search-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { AppToaster } from "@/components/ui/app-toaster";
import { ChatwootWidget } from "@/components/support/chatwoot";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE, ALL_KEYWORDS, organizationSchema, websiteSchema } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Furmbase Documentation",
    template: "%s · Furmbase Docs",
  },
  description: SITE.description,
  keywords: ALL_KEYWORDS,
  authors: [{ name: "Furmbase", url: "https://furmbase.com" }],
  creator: "Furmbase",
  publisher: "Furmbase",
  // No root-level canonical — each page sets its own via generateMetadata,
  // so a page without custom metadata doesn't look like a duplicate of the
  // homepage.
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    locale: SITE.locale,
    images: [{ url: SITE.ogImage, width: 512, height: 512, alt: SITE.name, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
            <AppToaster />
            <ChatwootWidget />
            <JsonLd data={[organizationSchema(), websiteSchema()]} />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
