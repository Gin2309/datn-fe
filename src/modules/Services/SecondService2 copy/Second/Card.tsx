import React from "react";
import Image from "next/image";

const Card = ({ title, desc, img }: { title: string; desc: string; img: any }) => {
  return (
    <div>
      <div className="flex justify-start md:justify-center items-center">
        <div className="h-[48px] w-[48px] border-[4px] border-third rounded-full flex justify-center items-center">
          <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
            <Image src={img} alt="icon" height={24} width={24} />
          </div>
        </div>
      </div>
      <div className="text-start md:text-center mt-5">
        <h1 className="text-[#212529] font-medium sm:text-[18px] md:text-[20px] mb-2">{title}</h1>
        <h2 className="text-[#495057]">{desc}</h2>
      </div>
    </div>
  );
};

export default Card;
