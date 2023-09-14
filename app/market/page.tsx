"use client";
import Seo from "@/app/components/seo";
import { useEffect, useState } from "react";
import ItemBox from "./components/item";

export default function Market() {
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await (await fetch("http://localhost:3000/api/product/findAll")).json()
      console.log(data)
      setProductList(data);
    })();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <Seo title="Market" />
      <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {productList?.map((product:any) => <ItemBox key={product.prodnum} productInfo={product} />)}
      </div>
      </div>
    </section>
  );
}
