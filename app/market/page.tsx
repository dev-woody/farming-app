import ItemBox from "./components/item";
import Image from "next/image";

export default async function Market() {
  const products = await fetch("http://localhost:3000/api/nest/products").then(
    (res) => res.json(),
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 md:py-12 py-2 mx-auto">
        <div className="rounded-lg h-64 mb-10 overflow-hidden">
          {/* <div className="object-cover object-center h-full w-full"> */}
          <Image
            src="https://dummyimage.com/1200x500"
            width={100}
            height={100}
            alt="market-banner"
            className="object-cover object-center h-full w-full"
          />
          {/* </div> */}
        </div>
        <div className="flex w-full my-2 flex-wrap">
          <h1 className="sm:text-2xl text-xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            싱싱한 채소
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {products?.map((product: any) => (
            <ItemBox key={product.uuid} productInfo={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
