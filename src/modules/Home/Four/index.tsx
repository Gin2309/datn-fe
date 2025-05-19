"use client";
import React from "react";
import Link from "next/link";
import { getToken } from "@/helper/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";

import img1 from "@/assets/Widget.svg";
import img2 from "@/assets/Widget2.svg";
import img3 from "@/assets/Widget3.svg";

const Four = () => {
  const router = useRouter();
  const token = getToken();

  const handleButtonClick = () => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div className="flex justify-between">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium">How does it work</h1>
        <div onClick={handleButtonClick} className="btn-primary w-[162px] h-[58px]">
          Try for free
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {/* 1 */}
        <div className="w-auto xs:w-[397px] border-[1px] border-[#FF6C99] bg-[#fff0f5] px-4 pt-6 md:pt-12 md:px-9 sm:rounded-t-2xl lg:rounded-bl-2xl lg:rounded-t-none gap-12 flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-primary font-medium text-[14px]">Step 1</h1>
            <h2 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Submit your photo</h2>
            <h3 className="text-[#343A40] text-[14px] md:text-[16px]">
              Please submit your image link and select style from the order screen
            </h3>
          </div>
          <div className="mx-auto">
            <Image src={img1} alt="widget" className="w-[325px] h-auto" loading="lazy"/>
          </div>
        </div>
        {/* 2 */}
        <div className="w-auto xs:w-[397px] border-[1px] border-primary bg-primary px-4 pt-6 md:pt-12 md:px-9 gap-12 flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-[#fff] font-medium text-[14px]">Step 2</h1>
            <h2 className="text-[#fff] font-medium text-[20px] md:text-[24px]">Edited by Vamedi</h2>
            <h3 className="text-[#fff] text-[14px] md:text-[16px]">Vamedi will do the best editing of your images.</h3>
          </div>
          <div className="mx-auto">
            <Image src={img2} alt="widget" className="w-[325px] h-auto" loading="lazy"/>
          </div>
        </div>
        {/* 3 */}
        <div className="w-auto xs:w-[397px] border-[1px] border-[#FF6C99] bg-[#fff0f5] px-4 pt-6 md:pt-12 md:px-9 sm:rounded-b-2xl lg:rounded-tr-2xl lg:rounded-b-none gap-12 flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase text-primary font-medium text-[14px]">Step 3</h1>
            <h2 className="text-[#212529] font-medium text-[20px] md:text-[24px]">Get them delivered!</h2>
            <h3 className="text-[#343A40] text-[14px] md:text-[16px]">
              We will resend the edited images within 12-48 hours in the Vamedi dashboard
            </h3>
          </div>
          <div className="mx-auto">
            <Image src={img3} alt="widget" className="w-[325px] h-auto" loading="lazy"/>
          </div>
        </div>
      </div>

      <div onClick={handleButtonClick} className="btn-primary w-full h-[48px] block xs:hidden">
        Try for free
      </div>
    </div>
  );
};

export default Four;
