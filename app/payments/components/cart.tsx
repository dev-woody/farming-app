import { accessAxios, customAxios } from "@/app/api/createAPI";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ICartItemOption {
  cart_item_id: string;
  createdAt: string;
  deletedAt: string;
  opt_value: string;
  option_item_id: string;
  price: number;
  quantity: number;
  sale_price: number;
  updatedAt: string;
  uuid: string;
}

interface ICart {
  uuid: string;
  user_id: string;
  prod_id: string;
  prod_name: string;
  prod_img: string;
  opt_name: string;
  status: string;
  cart_item_options: ICartItemOption[];
}

export default function CartModule() {
  const [cart, setCart] = useState<ICart[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      await customAxios
        .get("/api/nest/cart", {
          headers: { Authorization: `Bearer ${session!.user.accessToken}` },
        })
        .then((res) => setCart(res.data));
    })();
  }, [session]);

  console.log(cart);
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
  {
    /* <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script> */
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="flex flex-col md:w-2/3 justify-center items-stretch mx-auto">
        <h1 className="md:my-4 md:text-start text-center text-2xl font-bold">
          장바구니
        </h1>
        {cart?.map((cartItem: ICart) => (
          <CartItem key={cartItem.uuid} cartItem={cartItem} />
        ))}
        <h1 className="md:my-4 md:text-start text-center text-2xl font-bold">
          주문하기
        </h1>
        <div className="mb-6 justify-between h-full rounded-lg bg-white p-6 shadow-md sm:flex sm:flex-col sm:justify-start">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">$134.98 USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link
            href="/payments"
            className="mt-6 w-full text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            // onClick={() => { localStorage.setItem("order", ) }}}
          >
            주문하기
          </Link>
        </div>
      </div>
    </section>
  );
}

function CartItem({ cartItem }: { cartItem: ICart }) {
  return cartItem.cart_item_options.map(
    (option: ICartItemOption, idx: number) => (
      <div
        key={idx}
        className="justify-between my-4 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
      >
        <img
          src={`/api/nest${cartItem.prod_img}`}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              {cartItem.prod_name}
            </h2>
            <p className="mt-1 text-xs text-gray-700">{cartItem.opt_name}</p>
          </div>
          <div className="mt-4 flex flex-col justify-between items-end sm:space-y-6 sm:mt-0">
            <div className="flex justify-between">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                <MinusSmallIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
              <span className="h-8 w-8 border bg-white text-center text-xs outline-none">
                {option.quantity}
              </span>
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                <PlusSmallIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="flex items-center ">
              <p className="text-sm">
                {(option.sale_price || option.price) * option.quantity + " 원"}
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
      </div>
    ),
  );
}
