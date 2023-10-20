import { accessAxios } from "@/app/api/createAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartModule() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    (async () => {
      const res = await accessAxios
        .get("/api/users")
        .then((res) => setCart(res.data.cart));
    })();
  }, []);

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
    <div className="flex flex-col md:w-2/3 justify-center items-stretch mx-auto">
      <h1 className="md:my-4 md:text-start text-center text-2xl font-bold">
        장바구니
      </h1>
      <div className="justify-between my-4 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              Nike Air Max 2019
            </h2>
            <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
          </div>
          <div className="mt-4 flex flex-col justify-between items-end sm:space-y-6 sm:mt-0">
            <div className="flex justify-end items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                -{" "}
              </span>
              <input
                readOnly
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value="2"
                min="1"
              />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                +{" "}
              </span>
            </div>
            <div className="flex items-center ">
              <p className="text-sm">259.000 ₭</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
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
  );
}
