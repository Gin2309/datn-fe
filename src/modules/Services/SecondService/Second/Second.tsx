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
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">What are the Benefits?</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            img={icon1}
            title="Get higher sale price
"
            desc="With our professional staging services see your listings attract more buyers and fetch higher selling prices"
          />
          <Card
            img={icon2}
            title="All eyes on you"
            desc="It is statistically proven that home buyers tend to choose listings with professional photos and they sell faster."
          />
          <Card
            img={icon3}
            title="Go from no to pro"
            desc="Go online. Go virtual. Let your imaging and our staging do the rest. Go and grab the attention of your buyers."
          />
          <Card
            img={icon4}
            title="Drab to fab"
            desc="Transform your ordinary listing, into a property that your potential buyers can envision as their dream home."
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
