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
// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

interface Option_Item {
  uuid: string;
  opt_value: string;
  opt_price: number;
}

interface IOption {
  uuid: string;
  opt_name: string;
  option_items: Option_Item[];
}

interface QuanOptionItem extends Option_Item {
  quantity: number;
}

interface PropsSelectOption {
  selected: { opt_value: string };
  handleOption: (options: IOption, e: Option_Item) => void;
  options: IOption;
}

export default function Product({ params }: { params: { id: string } }) {
  const [productItem, setProductItem] = useState<any>();

  const [optionItem, setOptionItem] = useState<QuanOptionItem[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [optSelected, setOptSelected] = useState<IOption>();
  const [selected, setSelected] = useState({
    opt_value: "옵션을 선택해주세요.",
  });
  const newOptionItem = [...optionItem];
  // const { data: session } = useSession();

  const default_price = productItem?.options[0]?.option_items[0].opt_price;

  function saleRate(price: number) {
    return price - price * (productItem?.sale_rate / 100);
  }

  const totalReviw = productItem?.reviews.length;
  const reviewEval =
    productItem?.reviews
      .map((item: any) => item.rating)
      .reduce((a: any, c: any) => a + c, 0) / totalReviw || 0;

  const handleOption = (options: IOption, e: Option_Item) => {
    setOptSelected(options);
    if (
      newOptionItem.some((option: QuanOptionItem) => option.uuid === e.uuid)
    ) {
      newOptionItem.forEach((option: QuanOptionItem) => {
        if (option.uuid === e.uuid) {
          option.quantity += 1;
        }
      });
      setOptionItem(newOptionItem);
      setPrice(
        newOptionItem
          .map((item: QuanOptionItem) => item.opt_price * item.quantity)
          .reduce((a: number, c: number) => a + c, 0),
      );
      console.log(e);
      return;
    }
    newOptionItem.push({ ...e, quantity: 1 });
    setOptionItem(newOptionItem);
    setPrice(
      newOptionItem
        .map((item: QuanOptionItem) => item.opt_price)
        .reduce((a: number, c: number) => a + c, 0),
    );
  };

  function addCount(e: QuanOptionItem) {
    newOptionItem.forEach((option: QuanOptionItem) => {
      if (option.uuid === e.uuid) {
        option.quantity += 1;
      }
    });
    setOptionItem(newOptionItem);
    setPrice(
      newOptionItem
        .map((item: QuanOptionItem) => item.opt_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function minusCount(e: QuanOptionItem) {
    newOptionItem.forEach((option: QuanOptionItem) => {
      if (option.uuid === e.uuid) {
        option.quantity -= 1;
      }
    });
    setOptionItem(newOptionItem.filter((item) => item.quantity > 0));
    setPrice(
      newOptionItem
        .map((item: QuanOptionItem) => item.opt_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function deleteOption(e: QuanOptionItem) {
    setOptionItem(newOptionItem.filter((item) => item.uuid !== e.uuid));
    setPrice(
      newOptionItem
        .filter((item) => item.uuid !== e.uuid)
        .map((item: QuanOptionItem) => item.opt_price * item.quantity)
        .reduce((a: number, c: number) => a + c, 0),
    );
  }

  function onAddCart() {
    // if (session && session.user) {
    //   customAxios.post(
    //     `/api/nest/cart/create`,
    //     {
    //       user: session.user.uuid,
    //       product: productItem.uuid,
    //       items: [
    //         {
    //           uuid: optSelected?.uuid,
    //           options: optionItem,
    //         },
    //       ],
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${session.user.accessToken}`,
    //       },
    //     },
    //   );
    // }
  }

  useEffect(() => {
    (async () => {
      customAxios.get(`/api/nest/products/${params.id}`).then((res) => {
        setProductItem(res.data);
      });
    })();
  }, [params.id]);

  function SelectOption({
    selected,
    handleOption,
    options,
  }: PropsSelectOption) {
    return (
      <div className="flex glow mt-6 items-center mb-5">
        <div className="glow w-full">
          {/* <h1 className="px-2 py-2 font-semibold">{options.opt_name}</h1> */}
          <Listbox
            value={selected}
            onChange={(e: Option_Item) => handleOption(options, e)}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.opt_value}</span>
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
                  {options?.option_items.map(
                    (item: Option_Item, itemIdx: number) => (
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
                            {item.opt_value}
                          </span>
                          <span className="block truncate font-semibold text-teal-700">
                            {saleRate(item.opt_price)}원
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
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 md:py-12 py-2 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:h-auto h-64">
            <Image
              width={492}
              height={32}
              placeholder="blur"
              alt="productImg"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII=" // 추가
              className="w-full lg:h-[332px] h-64 object-cover object-center rounded"
              src={`/api/nest${productItem?.thumbnail}`}
            />
          </div>
          <div className="flex flex-col justify-between lg:w-1/2 w-full lg:pl-10 lg:py-2 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest ">
              {productItem?.category}
            </h2>
            <h1 className="text-gray-900 text-3xl font-bold title-font my-1">
              {productItem?.prod_name}
            </h1>
            <div className="flex mb-2">
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
            <h1 className="text-2xl text-red-500 inline-flex items-center mb-2">
              <span className="text-gray-400 line-through mr-4">
                {default_price}
              </span>
              <span className="font-semibold">
                {saleRate(default_price)}
                &nbsp;₩
              </span>
            </h1>
            <div className="glow">
              <p className="leading-relaxed">{productItem?.description}</p>
            </div>
            {productItem?.options.map((item: IOption, idx: number) => (
              <SelectOption
                key={idx}
                selected={selected}
                handleOption={handleOption}
                options={item}
              />
            ))}
            <div>
              {optionItem?.length > 0 &&
                optionItem.map((item: QuanOptionItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex w-full justify-between cursor-default bg-white py-2 px-2 text-left  sm:text-sm"
                  >
                    <div className="flex flex-grow justify-between">
                      <span>{item.opt_value}</span>
                      <span className="font-semibold">
                        {saleRate(item.opt_price)}원
                      </span>
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
                {saleRate(price)} 원
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
