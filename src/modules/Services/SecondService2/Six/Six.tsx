import React from "react";
import Image from "next/image";

import img from "@/assets/style-10.png";

const Six = () => {
  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div>
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-5 ">
          Comprehensive strategic partner
        </h1>
        <h2 className="text-[#495057] text-[16px] md:text-[18px]">
          We will work with your images to give you the best results that meet your needs but still stand out from the
          competition.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 md:gap-12 lg:gap-[96px] items-center">
        <div className="grid grid-cols-2 gap-9 md:gap-12 lg:gap-[64px]">
          <div>
            <h1 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-medium">2,000+</h1>
            <h2 className="text-[#212529] text-[18px] font-medium">Trusted customers globally</h2>
            <h3 className="text-[#495057] text-[16px]">We have helped over 2,000 amazing global clients.</h3>
          </div>
          <div>
            <h1 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-medium">100,000+</h1>
            <h2 className="text-[#212529] text-[18px] font-medium">Images delivered</h2>
            <h3 className="text-[#495057] text-[16px]">Over 100,000 images delivered to customers.</h3>
          </div>
          <div>
            <h1 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-medium">08+</h1>
            <h2 className="text-[#212529] text-[18px] font-medium">Countries served</h2>
            <h3 className="text-[#495057] text-[16px]">We serve customers from more than 8 countries</h3>
          </div>
          <div>
            <h1 className="text-primary text-[32px] md:text-[40px] lg:text-[48px] font-medium">1000+</h1>
            <h2 className="text-[#212529] text-[18px] font-medium">5-star reviews</h2>
            <h3 className="text-[#495057] text-[16px]">
              We&apos;re proud of our 5-star rating with over 1000 reviews.
            </h3>
          </div>
          1
        </div>

        <div>
          <Image src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Six;
