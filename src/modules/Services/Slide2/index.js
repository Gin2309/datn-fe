import React, { useRef } from "react";
import Image from "next/image";
import Card from "../Card";
import Link from "next/link";

import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./styles.css";

const data = [
  {
    title: "Occupied to Vacant",
    categories: "Photo Editing",
    desc: "Remove dated or cluttered furnishings from your listing images.",
    slug: "occupied-to-vacant",
  },
  {
    title: "Day to Dusk",
    categories: "Photo Editing",
    desc: "Turn daylight home photos into eye catching dusk images.",
    slug: "day-to-dusk",
  },
  {
    title: "Object removal",
    categories: "Photo Editing",
    desc: "Remove unwanted or distracting items from your listing photos.",
    slug: "object-removal",
  },
  {
    title: "Image Enhancement",
    categories: "Photo Editing",
    desc: " Brighten, sharpen, balance, and remove reflections in your listing photos.",
    slug: "image-enhancement",
  },
];

const Slide2 = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between sm:pr-4 lg:pr-[64px] xl:pr-[108px]">
        <div className="sm:text-[20px] md:text-[32px] font-medium">
          <Link href={"/photo-editing"}>Photo Editing</Link>
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

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
        className="mySwiper2-2"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              title={item.title}
              categories={item.categories}
              desc={item.desc}
              slug={item.slug}
              style="w-[329px] h-[480px] md:h-[510px] lg:h-[592px] md:w-[520px] lg:w-[600px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide2;
