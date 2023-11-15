"use client";

import { useEffect, useState } from "react";
import Seo from "../../components/layout/seo";
import AddressForm from "./components/addressForm";
import StSelect from "../../components/styles/selected";
import TossPay from "./components/toss";
import { accessAxios } from "../api/createAPI";
import StModal from "../../components/styles/modal";

export default function Home() {
  const [user, setUser] = useState({
    uuid: "",
    user_id: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    address_detail: "",
    zipCode: "",
    createdAt: "",
    updatedAt: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [cuponePrice, setCuponePrice] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await accessAxios.get("/api/users").then((res) => {
        setUser(res.data);
      });
    })();
  }, []);

  return (
    <section className="body-font">
      <StModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contents={
          <TossPay
            price={price}
            cuponePrice={cuponePrice}
            customerKey={user.uuid}
            orderId={user.uuid + new Date().getTime()}
            orderName={""}
            customerName={user.name}
            customerEmail={user.email}
            isUser={false}
          />
        }
      />
      <Seo title="Market" />
      <div className="container px-5 md:py-12 py-2 mx-auto">
        <div className="flex flex-col md:w-2/3 justify-center items-stretch mx-auto">
          <h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
            배송정보
          </h1>
          <AddressForm />
          <h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
            주문상품
          </h1>
          <div className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
              src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="product-image"
              className="w-full rounded-lg sm:w-40"
            />
            <div className="flex flex-col sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold ">Nike Air Max 2019</h2>
                <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-bold text-gray-900">259.000 ₭</p>
              </div>
            </div>
          </div>
          <h2 className="md:my-4 md:text-start text-center text-xl font-bold">
            {/* Total <span className="text-red-600">{`${price}원`}</span> */}
          </h2>
          <h1 className="md:my-4 my-2 md:text-start px-2 text-2xl font-bold">
            쿠폰 적립금
          </h1>
          <StSelect />
          <button
            className="mt-4 py-4 px-10 bg-teal-600 rounded-lg text-bold text-white text-lg spacing-2 hover:bg-teal-700 transition ease-in-out duration-200"
            onClick={() => setIsOpen(true)}
          >
            구매하기
          </button>
        </div>
      </div>
    </section>
  );
}
