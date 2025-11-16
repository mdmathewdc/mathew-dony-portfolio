import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const satoshiLight = localFont({
  src: "../fonts/Satoshi-Light.woff2",
  variable: "--font-satoshi-light",
  weight: "300",
  fallback: ["Helvetica", "sans-serif"],
});

const satoshiRegular = localFont({
  src: "../fonts/Satoshi-Regular.woff2",
  variable: "--font-satoshi-regular",
  weight: "400",
  fallback: ["Helvetica", "sans-serif"],
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/Instrument-Serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Instrument-Serif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Mathew Dony | Software Engineer",
  description: "Portfolio of Mathew Dony",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Mathew Dony | Software Engineer",
    description: "Portfolio of Mathew Dony",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mathew Dony | Software Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathew Dony | Software Engineer",
    description: "Portfolio of Mathew Dony",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshiLight.variable} ${satoshiRegular.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
