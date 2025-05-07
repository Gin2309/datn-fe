import React from "react";
import Image from "next/image";
import eye from "@/assets/order-eye.svg";
import CompareImg from "@/components/Compare";

const Card = ({ img, style }: { img: any; style: string }) => {
  return (
    <>
      <div
        className={`rounded-2xl bg-cover bg-center overflow-hidden relative cursor-pointer md:h-[262px] w-[306px] md:w-[392px]`}
      >
        {/* <Image src={img} alt="img" className="h-[234px] md:h-[300px] w-[306px] md:w-[392px]" /> */}
        <CompareImg type="secondary" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div
            className={`uppercase rounded-2xl px-3 py-1 text-white bg-primary  border-primary border-[1px] font-medium text-[12px]`}
          >
            {style}
          </div>
          <div
            className={`h-[28px] w-[28px] rounded-full flex items-center justify-center bg-primary border-primary border-[1px] `}
          >
            <Image src={eye} alt="icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
