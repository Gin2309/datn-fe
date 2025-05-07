"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Card from "./Card";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import bg from "@/assets/bg.png";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/eyeService.svg";
import icon3 from "@/assets/cameraService.svg";
import icon4 from "@/assets/smile.svg";

const Second = () => {
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
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">Benefits when choosing us</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            img={icon1}
            title="12 hours completed"
            desc="We deliver on time from 12 - 24 hours. Get urgent work at no extra charge."
          />
          <Card
            img={icon2}
            title="Competitive price"
            desc="No minimum quantity, discounts for bulk orders. You can receive goods first and pay later."
          />
          <Card
            img={icon3}
            title="Uniform quality"
            desc="Committed to uniform editing quality, unlimited free editing until you are satisfied"
          />
          <Card
            img={icon4}
            title="Work all year round"
            desc="We work Monday to Saturday and Sunday if required. Work full time all year round, real estate does not take holidays"
          />
        </div>

        <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
          Place an order
        </div>
      </div>
    </div>
  );
};

export default Second;
