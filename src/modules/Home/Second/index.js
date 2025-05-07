"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Card from "./Card";
import Link from "next/link";

import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./styles.css";
import after1 from "@/assets/virtual-after.jpg";
import before1 from "@/assets/virtual-before.jpg";
import after2 from "@/assets/enhen-after.jpg";
import before2 from "@/assets/enhen-before.jpg";

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.",
    slug: "virtual-staging-renovation/virtual-staging",
    after: after1,
    before: before1,
  },
  {
    title: "Image Enhancement",
    categories: "Photo Editing",
    desc: "Create competitive advantage by enhancing real estate image",
    slug: "photo-editing/object-removal",
    after: after2,
    before: before2,
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "video-editing/real-estate-video-editing",
  },
];

const Second = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  return (
    <div className="sm:pl-4 lg:pl-[64px] xl:pl-[108px] pb-[64px] pt-12 md:pt-0 ">
      <h1 className="text-[#495057] text-[18px] mb-4 block md:hidden">My services</h1>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        className="mySwiper2"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              title={item.title}
              categories={item.categories}
              desc={item.desc}
              slug={item.slug}
              after={item.after}
              before={item.before}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex justify-between sm:pr-4 lg:pr-[64px] xl:pr-[108px]">
        <div className="btn-primary h-12 w-full xs:w-[139px]">
          <Link href={"/services"}>All services</Link>
        </div>

        <div className="gap-4 hidden xs:flex">
          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className={`w-full h-full flex justify-center items-center `} onClick={handlePrev}>
              <Image src={left} alt="Previous" width={24} height={24} />
            </button>
          </div>

          <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
            <button className={`w-full h-full flex justify-center items-center `} onClick={handleNext}>
              <Image src={right} alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;
