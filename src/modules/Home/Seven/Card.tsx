import React from "react";
import Image from "next/image";
import icon from "@/assets/Heading.svg";
import avatar from "@/assets/Avatar2.svg";

const Card = ({
  title = "I appreciate that you have good designers.",
  desc = "When I submit a vacant space they know how to stage it so it looks complete. I've used other companies where even after it's \"virtually staged\" the space looks bland. I like how your team accessorizes for a completed staged look.",
  img = avatar,
  name = "Ana Orellana",
  role = "Sales Associate",
}: {
  title?: string;
  desc?: string;
  img?: any;
  name?: string;
  role?: string;
}) => {
  return (
    <div className="rounded-2xl p-9 gap-9 bg-[#fff] flex flex-col shadow-md">
      <div className="flex gap-3 flex-col">
        <Image src={icon} alt="icon"  loading="lazy"/>
        <h1 className="font-medium text-[#212529] text-[18px]">{title}</h1>
        <h2 className="text-[#495057]">{desc}</h2>
      </div>

      <div className="flex gap-4">
        <div>
          <Image src={img} alt="icon" width={48} height={48} className="rounded-full w-12 h-12 bg-cover bg-center"  loading="lazy"/>
        </div>
        <div>
          <h1 className="font-medium text-primary text-[18px]">{name}</h1>
          <h2 className="text-[#6C757D] text-[14px]">{role}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
