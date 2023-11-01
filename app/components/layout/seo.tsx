import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata = {
  //   title: "Farmen",
  //   openGraph: {
  //     title: "Farmen",
  //     description: "원하는 농산물을 저렴하게 파먼에서!",
  //     url: "https://localhost:3000",
  //     siteName: "Farmen",
  //     images: [
  //       {
  //         url: "https://nextjs.org/og.png",
  //         width: 800,
  //         height: 600,
  //       },
  //     ],
  //     locale: "ko-KR",
  //     type: "website",
  //   },
};
