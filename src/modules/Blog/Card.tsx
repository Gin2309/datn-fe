import React from "react";
import Image from "next/image";
import blog from "@/assets/blog.png";
import Link from "next/link";
import icon from "@/assets/Link.svg";

const Card = ({
  key,
  img = blog,
  title,
  subject,
  desc,
  slug,
}: {
  key: any;
  img?: any;
  title?: string;
  desc?: string;
  subject?: string;
  slug?: string;
}) => {
  return (
    <div className="flex flex-col flex-shrink-0 w-full xs:w-[387px] gap-6" key={key}>
      <div>
        <Image src={img} alt="icon" className="w-full xs:w-[387px] h-auto" />
      </div>
      <div className="flex flex-col gap-6 justify-center">
        <h2 className="text-primary text-[12px] uppercase font-medium">{subject}</h2>
        <div className="flex items-start justify-between">
          <Link href={`/blog/${slug}`}>
            <h1 className="text-[24px] font-medium text-[#212529] hover:opacity-80 cursor-pointer">{title}</h1>
          </Link>
          <Image src={icon} alt="" />
        </div>
        <h2 className="text-[#495057]">{desc}</h2>
      </div>
    </div>
  );
};

export default Card;
