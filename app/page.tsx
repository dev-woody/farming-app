async function test() {
  await fetch("http://localhost:3000/api/users/findAll")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export default function Home() {
  return (
    <>
      <p>안녕</p>
      {/* <button onClick={test}>test</button> */}
    </>
  );
}
