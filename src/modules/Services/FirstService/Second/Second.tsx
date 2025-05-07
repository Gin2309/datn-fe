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
          Benefits of Virtually staged property
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card
            img={icon1}
            title="Virtual Staging is a powerful digital marketing tool"
            desc="It's no surprise that more than 90% of home buyers begin their search online. Displaying visually appealing images is important to attract and maintain buyer interest."
          />
          <Card
            img={icon2}
            title="Staging virtual real estate photos is cheap and saves time"
            desc="For just a few dollars, you can use virtual staging to create realistic rooms in your home, while showcasing individual spaces at their highest potential."
          />
          <Card
            img={icon3}
            title="Virtual Staging unlimited design"
            desc="Vamedia has a huge virtual furniture library to add to any room you want."
          />
          <Card
            img={icon4}
            title="Increase the selling price of the house"
            desc="Makes the property appear more valuable, allowing sellers to set a higher asking price and attracting discerning home buyers."
          />
          <Card
            img={icon5}
            title="Increase competitive advantage"
            desc="Showcasing vacant rooms puts too much pressure on buyers to visualize a property's potential. Virtual staging allows buyers to easily visualize their own furniture in the space and demonstrate what can be achieved aesthetically."
          />
          <Card
            img={icon6}
            title="Staged homes sell faster"
            desc="On average, a staged home sells 88% faster (and 20% higher) than a non-staged home."
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
