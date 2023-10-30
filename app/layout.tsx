import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Providers from "./components/providers";
import SProviders from "./components/sessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Farmen",
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

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Welcome to Next.js",
// };

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
        <SProviders>
          <Providers>
            <Header />
            <div className="grow">{children}</div>
            <Footer />
          </Providers>
        </SProviders>
      </body>
    </html>
  );
}
