"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import before from "@/assets/daytodusk/before.jpg";
import after from "@/assets/daytodusk/after.jpg";
import left from "@/assets/white-chevron-left.svg";
import right from "@/assets/white-chevron-right.svg";
import CompareImg from "@/components/Compare";

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
    <>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <div className="text-center">
          <div className="mb-4">
            <h1 className="text-primary font-medium text-[14px] mb-2">Photo Editing</h1>
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium">Day to Dusk</h2>
          </div>

          <div className="mb-9 md:mb-12">
            <h1 className="text-[18px] mb-2">
              Easily make photos look like they were taken early in the morning, midday or late at night for just $5!
            </h1>
            <h2 className="text-[16px] text-[#495057]">
              Dusk is such a beautiful time of the day but very difficult to photograph. I can magically change a
              daytime or gloomy sky into an amazing sunset to really make your listing stand out and SELL!
            </h2>
          </div>

          <div onClick={handleNewOrder} className="btn-primary h-[58px] w-[193px] mx-auto">
            Place an order
          </div>
        </div>

        <div className="hidden  md:flex justify-center items-center gap-12 lg:gap-[64px]">
          <div className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <Image src={left} alt="left" />
          </div>

          <div className="rounded-2xl relative max-w-[1540px]">
            <CompareImg before={before} after={after} />

            <div
              className={`px-3 py-1 absolute left-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] `}
            >
              Before
            </div>

            <div
              className={`px-3 py-1 absolute right-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]`}
            >
              After
            </div>
          </div>

          <div className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0">
            <Image src={right} alt="right" />
          </div>
        </div>

        <div className="flex md:hidden justify-center flex-col gap-4">
          <div className="rounded-2xl relative max-w-[1540px]">
            <CompareImg before={before} after={after} />

            <div
              className={`px-3 py-1 absolute left-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] `}
            >
              Before
            </div>

            <div
              className={`px-3 py-1 absolute right-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]`}
            >
              After
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <div className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <Image src={left} alt="left" />
            </div>

            <div className="h-11 w-11 cursor-pointer rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <Image src={right} alt="right" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default First;
