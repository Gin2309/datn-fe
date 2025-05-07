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
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.",
    slug: "virtual-staging",
  },
  {
    title: "Commercial Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: " Give buyers to visualize their business setup in a comfy & efficient environment.",
    slug: "commercial-virtual-staging",
  },
  {
    title: "Matterport Virtual Staging.",
    categories: "Virtual Staging & Renovation",
    desc: "Virtually stage your property link and create an immersive 3D walkthrough.",
    slug: "matterport-virtual-staging",
  },
  {
    title: "Virtual Renovation",
    categories: "Virtual Staging & Renovation",
    desc: " Virtually renovate your wall, ceiling, floor, kitchen, bathrooms etc.",
    slug: "virtual-renovation",
  },
];

const Slide1 = () => {
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
          <Link href={"/virtual-staging-renovation"}>Virtual Staging & Renovation</Link>
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
        className="mySwiper1-1"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              title={item.title}
              categories={item.categories}
              desc={item.desc}
              slug={item.slug}
              style="w-[329px] h-[530px] md:h-[510px] lg:h-[592px] md:w-[520px] lg:w-[600px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide1;
