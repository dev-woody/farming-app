import "./globals.css";
import { Inter } from "next/font/google";
import Hreader from "./components/hreader";
import Footer from "./components/footer";
import Providers from "./components/providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://localhost:3000",
    siteName: "Farming",
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
      <body className={inter.className}>
        <div className="flex flex-col w-screen h-screen">
          <Hreader />
          <Providers>
            <div className="grow">{children}</div>
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
