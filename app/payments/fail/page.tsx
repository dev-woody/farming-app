"use client";

import { useSearchParams } from "next/navigation";

export default function FailPage() {
  const searchParams = useSearchParams();
  const message = searchParams?.get("message");

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>결제 실패</h1>
      <p>이유: {message ?? "알 수 없음"}</p>
    </main>
  );
}
