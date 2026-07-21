import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Kai Fishing Co | Premium UK Carp Tackle",
  description: "Kai Fishing Co — premium UK carp tackle brand. Lead clips, zig aligners, terminal tackle and more. Pre-order our launch range now.",
  keywords: ["carp fishing", "fishing tackle", "UK carp tackle", "lead clip systems", "terminal tackle", "carp rig"],
  openGraph: {
    title: "Kai Fishing Co | Premium UK Carp Tackle",
    description: "Premium UK carp tackle. Pre-order our launch range now.",
    type: "website",
    locale: "en_GB",
    siteName: "Kai Fishing Co",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
