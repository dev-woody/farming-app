"use client";

import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { useAsync } from "react-use";

interface PaymentProps {
  price: number;
  cuponePrice: number;
  customerKey: string;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  isUser: boolean;
}

const clientKey = process.env.NEXT_PUBLIC_CK_API as string;

export default function TossPay({
  price,
  cuponePrice,
  customerKey,
  orderId,
  orderName,
  customerName,
  customerEmail,
  isUser,
}: PaymentProps) {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(
      clientKey,
      isUser ? customerKey : ANONYMOUS,
    ); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      // 렌더링하고 싶은 멀티 결제 UI의 variantKey
      // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
      { variantKey: "DEFAULT" },
    );

    // ------  이용약관 렌더링 ------
    // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement(
      "#agreement",
      // { variantKey: "AGREEMENT" }, // 기본 이용약관 렌더링
    );
    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);

  return (
    <main className="flex flex-col items-center z-0">
      <span>{`${price + cuponePrice}원`}</span>
      <div id="payment-widget" style={{ width: "100%", padding: "0" }} />
      <div id="agreement" style={{ width: "100%" }} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
              orderId,
              orderName,
              customerName,
              customerEmail,
              successUrl: `${window.location.origin}/payments/success`,
              failUrl: `${window.location.origin}/payments/fail`,
            });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </main>
  );
}
