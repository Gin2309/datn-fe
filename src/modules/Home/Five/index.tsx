import React from "react";
import Image from "next/image";

import bg from "@/assets/bg.png";
import acb from "@/assets/acb.svg";
import mb from "@/assets/mb.svg";
import shb from "@/assets/shb.svg";
import dbs from "@/assets/dbs.svg";
import msb from "@/assets/mbs.svg";

const Five = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-[48px] md:py-[64px] flex flex-col gap-6 justify-center">
        <h1 className="text-[#495057] text-center text-[14px] md:text-[16px]">
          Chosen by many leading real estate companies
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="bg-[#f4f4f4] px-4 py-3 rounded-lg">
            <Image src={acb} alt="icon" className="h-[40px] w-auto" />
          </div>

          <div className="bg-[#f4f4f4] px-4 py-3 rounded-lg">
            <Image src={mb} alt="icon" className="h-[40px] w-auto" />
          </div>

          <div className="bg-[#f4f4f4] px-4 py-3 rounded-lg">
            <Image src={shb} alt="icon" className="h-[40px] w-auto" />
          </div>

          <div className="bg-[#f4f4f4] px-4 py-3 rounded-lg">
            <Image src={dbs} alt="icon" className="h-[40px] w-auto" />
          </div>

          <div className="bg-[#f4f4f4] px-4 py-3 rounded-lg">
            <Image src={msb} alt="icon" className="h-[40px] w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Five;
