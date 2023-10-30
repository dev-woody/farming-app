"use client";

import { accessAxios, customAxios } from "@/app/api/createAPI";
import StyleTab from "@/app/components/styles/tabs";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

interface IOption {
  id: number;
  name: string;
  sale_price: number;
}

interface IOptionItem extends IOption {
  quantity: number;
}

export default function Product({ params }: { params: { id: string } }) {
  const [productItem, setProductItem] = useState<any>();
  const [optionItem, setOptionItem] = useState<IOptionItem[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [selected, setSelected] = useState({ name: "옵션을 선택해주세요." });
  const newOptionItem = [...optionItem];
  const { data: session } = useSession();

  const totalReviw = productItem?.reviews.length;
  const reviewEval =
    productItem?.reviews
      .map((item: any) => item.rating)
      .reduce((a: any, c: any) => a + c, 0) / totalReviw || 0;

  const handleOption = (e: IOption) => {
    if (newOptionItem.some((option: IOptionItem) => option.id === e.id)) {
      newOptionItem.forEach((option: IOptionItem) => {
        if (option.id === e.id) {
          option.quantity += 1;
        }
      });
      setOptionItem(newOptionItem);
      setPrice(
        newOptionItem
          .map((item: IOptionItem) => item.sale_price * item.quantity)
          .reduce((a: number, c: number) => a + c, 0),
      );
      console.log(e);
      return;
    }
    newOptionItem.push({ ...e, quantity: 1 });
    setOptionItem(newOptionItem);
    setPrice(
      newOptionItem
        .map((item: IOptionItem) => item.sale_price)
        .reduce((a: number, c: number) => a + c, 0),
    );
  };

  function addCount(e: IOptionItem) {
    newOptionItem.forEach((option: IOptionItem) => {
      if (option.id === e.id) {
        option.quantity += 1;
      }
    });
    setOptionItem(newOptionItem);
    setPrice(
      newOptionItem
        .map((item: IOptionItem) => item.sale_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function minusCount(e: IOptionItem) {
    newOptionItem.forEach((option: IOptionItem) => {
      if (option.id === e.id) {
        option.quantity -= 1;
      }
    });
    setOptionItem(newOptionItem.filter((item) => item.quantity > 0));
    setPrice(
      newOptionItem
        .map((item: IOptionItem) => item.sale_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function deleteOption(e: IOptionItem) {
    setOptionItem(newOptionItem.filter((item) => item.id !== e.id));
    setPrice(
      newOptionItem
        .filter((item) => item.id !== e.id)
        .map((item: IOptionItem) => item.sale_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function onAddCart() {
    if (session && session.user) {
      customAxios.post(
        `/api/nest/cart/create`,
        {
          user_id: session.user.uuid,
          prod_id: productItem.id,
          options: optionItem,
          status: "ready",
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
    }
  }

  useEffect(() => {
    (async () => {
      customAxios.get(`/api/nest/products/${params.id}`).then((res) => {
        setProductItem(res.data);
      });
    })();
  }, [params.id]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 md:py-12 py-2 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <Image
            width={500}
            height={500}
            placeholder="blur"
            alt="productImg"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII=" // 추가
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`/api/nest${productItem?.thumbnail}`}
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
              {optionItem?.length > 0 &&
                optionItem.map((item: IOptionItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex w-full justify-between cursor-default bg-white py-2 px-2 text-left  sm:text-sm"
                  >
                    <div className="flex flex-grow justify-between">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.sale_price}원</span>
                    </div>
                    <div className="flex md:w-1/3 justify-between ml-4">
                      <div className="flex md:w-3/4 justify-between">
                        <button
                          className="flex items-center bg-gray-200 rounded-md"
                          type="button"
                          onClick={() => minusCount(item)}
                        >
                          <MinusSmallIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                        <span className="">{item.quantity}</span>
                        <button
                          className="flex items-center bg-gray-200 rounded-md"
                          type="button"
                          onClick={() => addCount(item)}
                        >
                          <PlusSmallIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <button
                        className="flex items-center bg-gray-400 rounded-md"
                        type="button"
                        onClick={() => deleteOption(item)}
                      >
                        <XMarkIcon
                          className="h-5 w-5 text-gray-200"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col pt-5 border-t-2 border-gray-100">
              <span className="title-font text-right font-medium text-2xl text-gray-900 md:mb-4">
                {price} 원
              </span>
              <div className="flex">
                <button className="rounded-full w-10 h-10 bg-gray-200 hover:bg-red-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-red-800">
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
                <button
                  onClick={onAddCart}
                  className="flex-grow ml-4 text-gray-500 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 hover:text-white rounded"
                >
                  장바구니
                </button>
                <Link
                  href="checkout"
                  className="flex-grow ml-4 text-white text-center bg-teal-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  구매하기
                </Link>
              </div>
            </div>
          </div>
        </div>
        <StyleTab tabList={["상세정보", "상품평", "설명"]} />
      </div>
    </section>
  );
}
