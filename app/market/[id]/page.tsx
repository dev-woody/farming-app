"use client";

import { customAxios } from "@/app/api/createAPI";
import StyleTab from "@/app/components/tabs";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function Product({ params }: { params: { id: string } }) {
  const [productItem, setProductItem] = useState<any>();
  const [optionItem, setOptionItem] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [selected, setSelected] = useState({ name: "옵션을 선택해주세요." });

  const totalReviw = productItem?.reviews.length;
  const reviewEval =
    productItem?.reviews
      .map((item: any) => item.rating)
      .reduce((a: any, c: any) => a + c, 0) / totalReviw || 0;

  const handleOption = (e: any) => {
    const newOptionItem = optionItem;
    newOptionItem.push(e);
    setOptionItem(newOptionItem);
    setPrice(
      newOptionItem
        .map((item: any) => item.sale_price)
        .reduce((a: any, c: any) => a + c, 0),
    );
  };

  useEffect(() => {
    (async () => {
      customAxios.get(`/api/products/${params.id}`).then((res) => {
        setProductItem(res.data);
      });
    })();
  }, [params.id]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-12 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <Image
            width={500}
            height={500}
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`/api${productItem?.thumbnail}`}
          />
          <div className="flex flex-col justify-between lg:w-1/2 w-full lg:pl-10 lg:py-2 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest ">
              {productItem?.category}
            </h2>
            <h1 className="text-gray-900 text-3xl font-bold title-font my-1">
              {productItem?.prd_name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-teal-600"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">{reviewEval} 점</span>
                <span className="text-gray-600 ml-3 pl-3 border-l-2 border-gray-200">
                  {totalReviw} 건
                </span>
              </span>
              {/* <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <Link href="" className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </Link>
                <Link href="" className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </Link>
                <Link href="" className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </Link>
              </span> */}
            </div>
            <div className="glow">
              {/* <p className="leading-relaxed">{productItem?.description}</p> */}
            </div>
            <div className="flex glow mt-6 items-center mb-5">
              <div className="glow w-full">
                <Listbox value={selected} onChange={handleOption}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {productItem?.options.map(
                          (item: any, itemIdx: number) => (
                            <Listbox.Option
                              key={itemIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-4 ${
                                  active
                                    ? "bg-teal-100 text-teal-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={item}
                            >
                              <p className="flex justify-between">
                                <span className="block truncate font-normal text-gray-600">
                                  {item.name}
                                </span>
                                <span className="block truncate font-semibold text-teal-700">
                                  {item.sale_price} 원
                                </span>
                              </p>
                            </Listbox.Option>
                          ),
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div>
              <div className="flex w-full justify-between cursor-default bg-white py-2 px-2 text-left  sm:text-sm">
                <div className="flex flex-grow justify-between">
                  <span>{optionItem[0]?.name}</span>
                  <span className="font-semibold">
                    {optionItem[0]?.sale_price}원
                  </span>
                </div>
                <div className="flex ml-4">
                  <span className="pointer-events-none flex items-center bg-gray-200 rounded-md">
                    <MinusSmallIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mx-4">1</span>
                  <span className="pointer-events-none flex items-center bg-gray-200 rounded-md">
                    <PlusSmallIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="pointer-events-none flex items-center bg-gray-400 rounded-md ml-4">
                    <XMarkIcon
                      className="h-5 w-5 text-gray-200"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex pt-5 border-t-2 border-gray-100">
              <span className="title-font font-medium text-2xl text-gray-900">
                {price} 원
              </span>
              <button className="flex ml-auto text-white bg-teal-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                구매하기
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <StyleTab tabList={["상세정보", "상품평", "설명"]} />
      </div>
    </section>
  );
}
