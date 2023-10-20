"use client";

import axios from "axios";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const {
//     query: { paymentKey, orderId, amount },
//   } = context;

//   try {
//     const { data: payment } = await axios.post<Payment>(
//       "https://api.tosspayments.com/v1/payments/confirm",
//       {
//         paymentKey,
//         orderId,
//         amount,
//       },
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`,
//           ).toString("base64")}`,
//         },
//       },
//     );

//     return {
//       props: { payment },
//     };
//   } catch (err: any) {
//     console.error("err", err);

//     return {
//       redirect: {
//         destination: `/fail?code=${err.code}&message=${err.message}`,
//         permanent: false,
//       },
//     };
//   }
// };

interface Props {
  payment: Payment;
}

export default function SuccessPage({ payment }: Props) {
  const searchParams = useSearchParams();
  const paymentKey = searchParams?.get("paymentKey");
  const orderId = searchParams?.get("orderId");
  const amount = searchParams?.get("amount");
  useEffect(() => {
    (async () => {
      try {
        const { data: payment } = await axios.post<Payment>(
          "https://api.tosspayments.com/v1/payments/confirm",
          {
            paymentKey,
            orderId,
            amount,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_SK_API}:`,
              ).toString("base64")}`,
            },
          },
        );

        return {
          props: { payment },
        };
      } catch (err: any) {
        console.error("err", err);

        return {
          redirect: {
            destination: `/fail?code=${err.code}&message=${err.message}`,
            permanent: false,
          },
        };
      }
    })();
  }, []);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>결제 성공</h1>
      <p>주문: {payment?.orderName}</p>
      <p>결제 수단: {payment?.method}</p>
      <p>결제 금액: {payment?.totalAmount.toLocaleString()}원</p>
      {/* <p>
        결제 일시:{" "}
        {format(new Date(payment?.approvedAt), "yyyy/MM/dd HH:mm:ss")}
  </p>  */}
      <p>
        <a href={payment?.receipt.url}>영수증</a>
      </p>
    </main>
  );
}
