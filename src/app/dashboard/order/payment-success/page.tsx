"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess({ searchParams: { amount } }: { searchParams: { amount: string } }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push("/dashboard/order");
    }
  }, [countdown]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-center m-10 rounded-md create-order">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="btn-primary text-white mt-5 text-4xl w-[500px] mx-auto">${amount}</div>

        <div className="text-xl mt-5">
          ...Redirecting to order page in <span className="font-bold">{countdown}</span> seconds
        </div>
      </div>
    </main>
  );
}
