"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/helper/storage";

import banner from "@/assets/banner2.png";
import check from "@/assets/checkIcon.svg";

const Six = () => {
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
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] grid grid-col-1 md:grid-cols-2 gap-9 lg:gap-[80px] xl:gap-[96px]">
      <div className="overflow-hidden rounded-xl bg-cover bg-center hidden md:block">
        <Image src={banner} alt="icon" className="rounded-xl !w-full" />
      </div>

      <div className="flex flex-col gap-6 md:gap-12">
        <div className="flex gap-6 flex-col">
          <h1 className="font-medium text-[24px] xs:text-[30px] lg:text-[36px]">You need my services if you are a</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 text-[#495057] ">
              <Image src={check} alt="icon" />
              Real Estate Agent
            </div>

            <div className="flex gap-3 text-[#495057] ">
              <Image src={check} alt="icon" />
              Broker/Brokerage firm
            </div>

            <div className="flex gap-3 text-[#495057] ">
              <Image src={check} alt="icon" />
              Real Estate Photographer
            </div>

            <div className="flex gap-3 text-[#495057] ">
              <Image src={check} alt="icon" />
              Association or MLS
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div onClick={handleButtonClick} className="btn-primary w-[162px] h-[58px]">
            Try for free
          </div>
          <div className="btn-secondary sm:w-atuo 2xs:w-[210px] h-[58px]">
            <Link href="/services">Explore services</Link>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-cover bg-center md:hidden block">
        <Image src={banner} alt="icon" className="rounded-xl w-full" />
      </div>
    </div>
  );
};

export default Six;
