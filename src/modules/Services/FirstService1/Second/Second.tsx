"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Card from "./Card";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import bg from "@/assets/bg.png";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/clock.svg";
import icon3 from "@/assets/circle-slash-2.svg";
import icon4 from "@/assets/userService.svg";
import icon5 from "@/assets/credit-card.svg";
import icon6 from "@/assets/image-up.svg";

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
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          What does day to dusk photo editing give you?
        </h1>

        <div className="grid sm:grid-cols-2 gap-8">
          <Card
            img={icon1}
            title="Attract many buyers"
            desc="Images of houses at dusk are beautiful, romantic and attractive. Attract more buyers with a breathtaking photo that shows how beautiful the home can be."
          />
          <Card
            img={icon2}
            title="Increase online transactions"
            desc="90% of buyers are searching for real estate online. This could be the deciding factor in whether they contact you to view the home or not."
          />

          <Card
            img={icon4}
            title="Save time and costs"
            desc="Hiring a photographer to accurately capture the moment a sunset looks stunning can be difficult. Take the hassle out of taking photos and let us edit them for you."
          />
          <Card
            img={icon5}
            title="Stand out from your competitors"
            desc="Turning a photo from day to dusk will not only enhance your listing but will help it stand out from the crowd. An eye-catching sunset will draw everyone’s attention."
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
