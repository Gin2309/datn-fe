"use client";
import { generateOrderId } from "@/api/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const First = () => {
  const router = useRouter();
  const { mutate: genOIDMutation, isLoading: isGenering } = useMutation(["OID"], () => generateOrderId(), {
    onSuccess: (data: any) => {
      const oid = data?.id;
      if (oid) {
        router.push(`/dashboard/order/create-order?oid=${oid}`);
      }
    },
    onError: (error: any) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = () => {
    genOIDMutation();
  };

  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-primary text-[14px] font-medium">Photo editing</h1>
          <h1 className="text-[#212529] fonr-medium text-[32px] md:text-[40px] lg:text-[48px]">Image Enhancement</h1>
        </div>

        <p className="text-[#495057] text-[16px]">Remove Unwanted Items From Your Real Estate Photos</p>

        <div className="flex gap-2">
          <div onClick={handleNewOrder} className="btn-primary w-[163px]">
            Place an order
          </div>
          <div className="btn-secondary">Pricing</div>
        </div>
      </div>
    </div>
  );
};

export default First;
