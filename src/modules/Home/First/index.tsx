"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/helper/storage";
import CompareImg from "@/components/Compare";

import banner from "@/assets/banner1.png";
import smallBanner from "@/assets/smallBanner.png";

const First = () => {
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
    <div>
      <div className="p-4 md:p-6 rounded-2xl overflow-hidden relative max-w-[1540px] mx-0 xl:mx-auto">
        <CompareImg />

        <div
          className={`px-3 py-1 absolute left-8 bottom-8 md:left-10 md:bottom-10 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] `}
        >
          Before
        </div>

        <div
          className={`px-3 py-1 absolute right-10 bottom-10 md:right-10 md:bottom-10 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]`}
        >
          After
        </div>
      </div>

      <div className="py-[64px] md:px-[48px] lg:px-[86px] xl:px-[108px] hidden md:flex lg:justify-between">
        <div className="md: text-[36px] lg:text-[48px]">The best real estate photo editing partner</div>

        <div>
          <div className="text-[#495057] mb-4">
            Trusted by over 2,000 professional real estate photographers since 2012.
          </div>

          <div className="flex gap-4">
            <div onClick={handleButtonClick} className="btn-primary w-[162px] h-[58px]">
              Try for free
            </div>

            <div className="btn-secondary w-[210px] h-[58px]">
              <Link href={"/services"}>Explore services</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:hidden px-4 py-6">
        <h1 className="text-[32px] mb-4">Make your ideal space right before your eyes</h1>

        <div>
          <div className="text-[#495057] mb-4">
            Try to incorporate about all the services that Styldod provides with this content
          </div>

          <div className="flex gap-4">
            <div onClick={handleButtonClick} className="btn-primary sm:w-auto 2xs:w-[162px] h-[58px]">
              Try for free
            </div>

            <div className="btn-secondary sm:w-atuo 2xs:w-[210px] h-[58px]">
              <Link href="/services">Explore services</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
