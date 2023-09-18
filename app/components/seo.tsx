import Head from "next/head";

interface Props {
  title: string;
}

export default function Seo({ title }: Props) {
  return (
    <Head>
      <title>농업어플 | {title}</title>
      <meta
        name="description"
        content="저렴한 가격으로 친환경 농산물을 만나보세요!"
      />
    </Head>
  );
}
