import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Providers from "./components/providers";
import SProviders from "./components/sessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Farmen",
    default: "Farmen", // a default is required when creating a template
  },
  description: "원하는 농산물을 저렴하게 파먼에서!",
  applicationName: "Farmen",
  viewport: "width=device-width, initial-scale=1.0",

  openGraph: {
    title: "Farmen",
    description: "원하는 농산물을 저렴하게 파먼에서!",
    url: "https://localhost:3000",
    siteName: "Farmen",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko-KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={inter.className + " flex flex-col min-w-screen min-h-screen"}
      >
        {/* <SProviders> */}
        <Providers>
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </Providers>
        {/* </SProviders> */}
      </body>
    </html>
  );
}
