"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import help from "@/assets/help-circle.svg";
import star from "@/assets/star.svg";
import checked from "@/assets/Checked .svg";
import CompareImg from "@/components/Compare";
import before2 from "@/assets/imgenhan/before2.jpg";
import after2 from "@/assets/imgenhan/after2.jpg";
import before3 from "@/assets/imgenhan/before3.jpg";
import after3 from "@/assets/imgenhan/after3.jpg";

const Third = () => {
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
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">See the difference</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px] px-0 xl:px-8">
          <div className="block md:hidden">
            <div className="rounded-2xl relative max-w-[1540px]">
              <CompareImg type="secondary" before={before2} after={after2} />

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
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row md:flex-col gap-6 items-center md:items-baseline">
              <div className="h-[48px] w-[48px] border-[4px] border-third rounded-full flex flex-shrink-0 justify-center items-center">
                <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                  <Image src={help} alt="icon" height={24} width={24} />
                </div>
              </div>
              <h1 className="text-[#212529] fonr-medium text-[20px] md:text-[32px]">
                What did we do to get a good photo?
              </h1>
            </div>

            <p className="text-[#495057] text-[16px]">
              Apply the full photo editing process. Adjust brightness, contrast, color and lens distortion. Remove
              smudges on lenses Photographer & Reflection Removal. Replace TV, windows, skylight & fireplace. Manual
              mixing
            </p>
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl relative max-w-[1540px]">
              <CompareImg type="secondary" before={before2} after={after2} />

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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 xl:gap-[96px] px-0 xl:px-8">
          <div className="block md:hidden">
            <div className="rounded-2xl relative max-w-[1540px]">
              <CompareImg type="secondary" before={before3} after={after3} />

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
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl relative max-w-[1540px]">
              <CompareImg type="secondary" before={before3} after={after3} />

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
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row md:flex-col gap-6 items-center md:items-baseline">
              <div className="h-[48px] w-[48px] border-[4px] border-third rounded-full flex flex-shrink-0 justify-center items-center">
                <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                  <Image src={star} alt="icon" height={24} width={24} />
                </div>
              </div>
              <h1 className="text-[#212529] fonr-medium text-[20px] md:text-[32px]">Benefits brought</h1>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="flex flex-shrink-0">
                  <Image src={checked} alt="check" height={24} width={24} />
                </div>
                <div className="text-[#495057] text-[16px]">
                  Sell and rent 50% faster when using beautiful, quality photos
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex flex-shrink-0">
                  <Image src={checked} alt="check" height={24} width={24} />
                </div>
                <div className="text-[#495057] text-[16px]">Easily increase sales and rental prices</div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex flex-shrink-0">
                  <Image src={checked} alt="check" height={24} width={24} />
                </div>
                <div className="text-[#495057] text-[16px]">Low cost from only $0.50 per perfect photo</div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="flex flex-shrink-0">
                  <Image src={checked} alt="check" height={24} width={24} />
                </div>
                <div className="text-[#495057] text-[16px]">
                  Give your potential buyers a beautiful place to see where they can imagine themselves in it.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div onClick={handleNewOrder} className="btn-primary w-full xs:w-[163px] mx-auto">
          Place an order
        </div>
      </div>
    </>
  );
};

export default Third;
