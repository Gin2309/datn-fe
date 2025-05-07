"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import bg from "@/assets/bg.png";
import checked from "@/assets/Checked .svg";
import zap from "@/assets/zap.svg";

const Four = () => {
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
      <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Attract viewers with day to dusk photos from just $5
        </h1>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {/* 1 */}
          <div>
            <div className="w-auto xs:w-[386px] border-[1px] border-b-0 border-[#f4f4f4] bg-[#fff] p-6 md:p-8 rounded-t-2xl gap-6 flex flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col justify-center">
                  <div className="h-[40px] w-[40px] border-[4px] border-third rounded-full flex justify-center items-center mb-5 mx-0 xs:mx-auto">
                    <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                      <Image src={zap} alt="icon" height={20} width={20} />
                    </div>
                  </div>
                  <h1 className="text-primary uppercase  font-medium text-start xs:text-center">Basic package</h1>
                </div>

                <div className="text-[#6C757D] text-[18px] text-start xs:text-center">
                  <span className="text-[#212529] font-medium text-[36px]">$3 (USD)</span> per images
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-start">
                  <div className="flex flex-shrink-0">
                    <Image src={checked} alt="check" height={24} width={24} />
                  </div>
                  <div className="text-[#495057] text-[16px]">Processing time: 24-48 hours</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex flex-shrink-0">
                    <Image src={checked} alt="check" height={24} width={24} />
                  </div>
                  <div className="text-[#495057] text-[16px]">Unlimited Free Revisions</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex flex-shrink-0">
                    <Image src={checked} alt="check" height={24} width={24} />
                  </div>
                  <div className="text-[#495057] text-[16px]">100% money back guarantee if not satisfied</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex flex-shrink-0">
                    <Image src={checked} alt="check" height={24} width={24} />
                  </div>
                  <div className="text-[#495057] text-[16px]">Pay securely with Paypal</div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex flex-shrink-0">
                    <Image src={checked} alt="check" height={24} width={24} />
                  </div>
                  <div className="text-[#495057] text-[16px]">24/7 customer support</div>
                </div>
              </div>
            </div>
            <div className="bg-[#fbfbfb] p-6 md:p-8 rounded-b-2xl  border-[1px] border-t-0 border-[#f4f4f4]">
              <div onClick={handleNewOrder} className="btn-primary">
                Place an order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Four;
