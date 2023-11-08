import { accessAxios, customAxios } from "@/app/api/createAPI";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICartItemOption {
  uuid: string;
  opt_value: string;
  price: number;
  quantity: number;
  prod_opt_val: any;
}

interface ICartItems {
  uuid: string;
  opt_name: string;
  product: any;
  total_amount: number;
  cart_item_opts: ICartItemOption[];
}

interface ICart {
  uuid: string;
  cart_items: ICartItems[];
}

export default function CartModule() {
  const [cart, setCart] = useState<ICart>({
    uuid: "",
    cart_items: [],
  });

  function saleRate(price: number, sale_rate: number) {
    return price - price * (sale_rate / 100);
  }

  const cart_total_amount = cart.cart_items.reduce((total, item) => {
    return total + item.total_amount;
  }, 0);

  const { data: session } = useSession();

  useEffect(() => {
    const sessionUser = session?.user.accessToken;
    if (typeof sessionUser === "string") {
      (async () => {
        await customAxios
          .get("/api/nest/cart", {
            headers: { Authorization: `Bearer ${sessionUser}` },
          })
          .then((res) => setCart(res.data));
      })();
    }
  }, [session]);

  //   <script>
  //     document.addEventListener("alpine:init", () => {
  //         Alpine.data("app", () => ({
  //             total: 0,
  //             selected: [],

  //             toggleCheckbox(element, amount) {
  //                 if (element.checked) {
  //                     this.selected.push(element.value);
  //                     this.total += amount;
  //                 } else {
  //                     const index = this.selected.indexOf(element.value);

  //                     if (index > -1) this.selected.splice(index, 1);

  //                     this.total -= amount;
  //                 }
  //             },
  //         }));
  //     });
  // </script>

  function CartItem({ cartItem }: { cartItem: ICartItems }) {
    return (
      <div className=" flex flex-col mb-4 rounded-lg bg-white p-6 shadow-md sm:justify-start">
        <div className="text-xl mb-4 font-bold">
          {cartItem.product.prod_name}
        </div>
        <div className=" flex justify-between">
          <div className="w-1/2 h-auto rounded-lg sm:w-40">
            <Image
              width={100}
              height={100}
              src={`/api/nest${cartItem.product.thumbnail}`}
              alt="product-image"
              className="w-full h-auto rounded-lg sm:w-40"
            />
          </div>
          <div className="flex flex-col flex-grow pb-4 sm:pl-4">
            {cartItem.cart_item_opts.map(
              (option: ICartItemOption, idx: number) => (
                <div
                  key={idx}
                  className=" sm:flex sm:w-full sm:justify-between"
                >
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {/* {cartItem.prod_name} */}
                    </h2>
                    <p className="mt-1 text-lg text-gray-700">
                      {option.prod_opt_val.opt_value}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col justify-between items-end sm:space-y-6 sm:mt-0">
                    <div className="flex w-full justify-between ml-4">
                      <div className="flex w-full justify-between">
                        <button
                          className="flex items-center bg-gray-200 rounded-md"
                          type="button"
                          // onClick={() => minusCount(item)}
                        >
                          <MinusSmallIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                        <span className="">{option.quantity}</span>
                        <button
                          className="flex items-center bg-gray-200 rounded-md"
                          type="button"
                          // onClick={() => addCount(item)}
                        >
                          <PlusSmallIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      <p className="text-lg mr-2">
                        <span className="text-xl font-semibold mr-2">
                          {saleRate(
                            option.prod_opt_val.opt_price * option.quantity,
                            cartItem.product.sale_rate,
                          )}
                        </span>
                        원
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-semibold">합계</span>
          <span className="block text-2xl  font-bold">
            {cartItem.total_amount}&nbsp;원
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="flex flex-col md:w-2/3 justify-center items-stretch mx-auto">
        <h1 className="md:my-4 md:text-start text-center text-2xl font-bold">
          장바구니
        </h1>
        {cart.cart_items.length < 1 ? (
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img
              className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-10 font-medium text-gray-900">
                장바구니에 상품이 없습니다!
              </h1>
              <div className="flex justify-center">
                <Link
                  href="/market"
                  className="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg"
                >
                  담으러가기
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {cart.cart_items?.map((cartItem: ICartItems) => (
              <CartItem key={cartItem.uuid} cartItem={cartItem} />
            ))}
            <h1 className="md:my-4 md:text-start text-center text-2xl font-bold">
              주문하기
            </h1>
            <div className="mb-6 justify-between h-full rounded-lg bg-white p-6 shadow-md sm:flex sm:flex-col sm:justify-start">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">주문금액</p>
                <p className="text-gray-700">{cart_total_amount}&nbsp;원</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">배송비</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">총 주문금액</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                </div>
              </div>
              <Link
                href="/payments"
                className="mt-6 w-full text-center rounded-md bg-teal-500 py-1.5 font-medium text-blue-50 hover:bg-teal-600"
                // onClick={() => { localStorage.setItem("order", ) }}}
              >
                주문하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
