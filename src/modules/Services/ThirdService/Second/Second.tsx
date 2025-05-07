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
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Benefits of using real estate videos?
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            img={icon1}
            title="Save time and money"
            desc="In a 3-minute video, you can show viewers all the basics about your property"
          />
          <Card
            img={icon2}
            title="Real estate videos increase trust and relationships with customers"
            desc="People receive information quickly with just one play button.  Video is the next best thing to having a face-to-face meeting."
          />
          <Card
            img={icon3}
            title="Accurate representation"
            desc="Every nook and cranny is on display, from the layout and arrangement of the rooms to the condition of the furniture. And that's all potential buyers want to see."
          />
          <Card
            img={icon4}
            title="More Visibility "
            desc="Video content gets more eyeballs than static images alone. When potential buyers scroll through pages of listings, the video thumbnail stands out amidst the crowd of still shots. When someone clicks play, they’re treated to a dynamic, immersive experience that can’t match static images."
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
