import type { Metadata, Viewport } from "next";
import { Unbounded, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer";
import Head from "next/head";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-main",
  weight: ["200", "300", "400", "500", "700", "900"],
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rob",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Владислав Беденко",
  description: "Владислав Беденко Full-Stack Dev.",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
          sizes="57x57"
        />
      </Head>
      <body
        className={`${unbounded.variable} ${roboto.variable} zero-pm hide-sb font-sans`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingRight: "env(safe-area-inset-right)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          backgroundColor: "#181818",
        }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

//
