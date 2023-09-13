import Image from "next/image";
'use client';

export default function Home() {
  async function test()  {
    await fetch('http://localhost:3000/api/test')
      .then((res) => res.json)
      .then((data) => console.log(data));
  }
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}
