"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const Services = () => {
  return (
    <div className="sm:pl-4 lg:pl-[64px] xl:pl-[108px] pb-[64px] py-12 flex flex-col gap-6 md:gap-9 lg:gap-12">
      <h1 className=" font-medium sm:text-[32px] md:text-[40px] lg:text-[48px]">All services</h1>

      <Slide1 />

      <Slide2 />

      <Slide3 />
    </div>
  );
};

export default Services;
