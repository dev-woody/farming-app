"use client";

import CartModule from "@/app/payments/components/cart";
import { useEffect } from "react";

export default function Cart() {
  useEffect(() => {}, []);
  return (
    <section className="container px-5 md:py-12 py-2 mx-auto">
      <CartModule />
    </section>
  );
}
