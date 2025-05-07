"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import img1 from "@/assets/Video thumbnail3.png";
import img2 from "@/assets/Video thumbnail2.png";
import check from "@/assets/Checked .svg";

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
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px]">
          <div className="block md:hidden">
            <Image src={img2} alt="" className="w-full h-auto" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-primary text-[14px] font-medium">Video editing</h1>
              <h1 className="text-[#212529] fonr-medium text-[32px] md:text-[40px] lg:text-[48px]">Property Videos</h1>
            </div>

            <p className="text-[#495057] text-[16px]">
              Real estate videos are powerful tools for attracting attention to your real estate listings and profile.
              Save costs and increase real estate transactions by up to 51%
            </p>

            <div className="flex gap-2">
              <div onClick={handleNewOrder} className="btn-primary w-[163px]">
                Place an order
              </div>
              <div className="btn-secondary">Pricing</div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src={img2}
              alt="banner"
              className="h-auto md:h-[470px] w-full xl:h-[533px] object-cover object-center rounded-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px]">
          <div className="block md:hidden">
            <Image src={img1} alt="" className="w-full h-auto" />
          </div>

          <div className="hidden md:block">
            <Image
              src={img1}
              alt="banner"
              className="h-auto md:h-[470px] xl:h-[533px] object-cover object-center rounded-2xl w-full"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-[#212529] font-medium text-[20px] md:text-[32px] lg:text-[36px]">
              Vamedia&apos;s real estate video editing service?
            </h1>

            <div className="flex flex-col gap-4 text-[#495057] text-[16px]">
              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">Editing RAW footage into polished, compelling visuals.</div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">Seamless transitions to maintain viewer attention.</div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">
                  Precision color correction for vibrant, true-to-life images.
                </div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">Sound design to add depth and professionalism.</div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">Camera stabilization for a smooth, steady look.</div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">Background noise removal for crystal-clear audio.</div>
              </div>

              <div className="flex gap-3">
                <div>
                  <Image src={check} alt="icon" />
                </div>
                <div className="text-[#495057] text-[16px]">
                  Video quality enhancement to ensure your listings stand out.
                </div>
              </div>
            </div>

            <div onClick={handleNewOrder} className="btn-primary w-[163px]">
              Place an order
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default First;
