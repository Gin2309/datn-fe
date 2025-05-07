"use client";
import React from "react";
import CompareImg from "@/components/Compare";
import after from "@/assets/daytodusk/after2.jpg";
import before from "@/assets/daytodusk/before2.jpg";

const Five = () => {
  return (
    <>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <div className="text-center">
          <div className="mb-5">
            <h2 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium">See the difference</h2>
          </div>

          <div className="text-[#495057] text-[16px]">
            Day to dusk showcases a unique charm that provides real estate professionals with a range of advantages.
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 rounded-2xl relative max-w-[960px] mx-0 xl:mx-auto">
        <CompareImg before={before} after={after} />

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
    </>
  );
};

export default Five;
