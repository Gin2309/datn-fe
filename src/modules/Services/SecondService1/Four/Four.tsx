"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import upload from "@/assets/image-up.svg";
import pen from "@/assets/pen-tool.svg";
import mail from "@/assets/mailService.svg";

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
    <>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 border-t-[1px] border-[#0000001F]">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Order now in 3 simple steps
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[64px] md:gap-9 lg:gap-12 relative">
          <div className="hidden md:block absolute top-[50px] left-0 w-full h-0 z-0">
            <div className="absolute -top-[28px] left-[15%] right-[15%] w-[70%] border-t-[3px] border-dashed border-[#DEE2E6]"></div>
          </div>

          <div className="block lg:hidden absolute left-[50%] top-[10%] h-[70%] border-l-[3px] border-dashed border-[#DEE2E6]"></div>

          <div className="flex flex-col gap-5 relative z-[3] md:z-0 bg-white">
            <div className="relative z-[2] h-[48px] w-[48px] border-[4px] border-third rounded-full flex flex-shrink-0 justify-center items-center mx-auto">
              <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                <Image src={upload} alt="icon" height={24} width={24} />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-primary font-medium text-[14px]">Step 1</h1>
              <h2 className="font-medium text-[24px]">Upload</h2>
              <p className="text-[#495057] text-[16px]">Upload your Photo(s) and send us your requirements.</p>
            </div>

            <div onClick={handleNewOrder} className="btn-primary  w-[163px] mx-auto">
              Place an order
            </div>
          </div>

          <div className="flex flex-col gap-5 relative z-[3] md:z-0  bg-white">
            <div className="relative z-[2] h-[48px] w-[48px] border-[4px] border-third rounded-full flex flex-shrink-0 justify-center items-center mx-auto">
              <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                <Image src={pen} alt="icon" height={24} width={24} />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-primary font-medium text-[14px]">Step 2</h1>
              <h2 className="font-medium text-[24px]">Editor</h2>
              <p className="text-[#495057] text-[16px]">
                Our team of talented experts will edit photos according to your process and requirements
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 relative z-[3] md:z-0  bg-white">
            <div className="relative z-[2] h-[48px] w-[48px] border-[4px] border-third rounded-full flex flex-shrink-0 justify-center items-center mx-auto">
              <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                <Image src={mail} alt="icon" height={24} width={24} />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-primary font-medium text-[14px]">Step 3</h1>
              <h2 className="font-medium text-[24px]">Deliver</h2>
              <p className="text-[#495057] text-[16px]">
                Processing time: Average is 12 to 18 hours, depending on workload and file loading time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Four;
