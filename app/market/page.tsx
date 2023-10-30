"use client";
import Seo from "@/app/components/seo";
import { useEffect, useState } from "react";
import ItemBox from "./components/item";
import { customAxios } from "../api/createAPI";

export default function Market() {
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      customAxios
        .get(`/api/nest/products`)
        .then((res) => setProductList(res.data));
    })();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <Seo title="Market" />
      <div className="container px-5 md:py-12 py-2 mx-auto">
        <div className="rounded-lg h-64 mb-10 overflow-hidden">
          <img
            alt="market-banner"
            className="object-cover object-center h-full w-full"
            src="https://dummyimage.com/1200x500"
          />
        </div>
        <div className="flex w-full my-2 flex-wrap">
          <h1 className="sm:text-2xl text-xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            싱싱한 채소
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {productList?.map((product: any) => (
            <ItemBox key={product.id} productInfo={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
