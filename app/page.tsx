'use client';
import Image from "next/image";
import Seo from "./components/seo";

export default function Home() {
  async function test()  {
    await fetch('http://localhost:3000/api/test')
      .then((res) => res.json)
      .then((data) => console.log(data));
  }
  return (
    <div>
      <Seo title="HOME"/>
      <button onClick={test}>test</button>
    </div>
  );
}
