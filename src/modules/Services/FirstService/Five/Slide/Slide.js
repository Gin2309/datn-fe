import React, { useRef, useState } from "react";
import Image from "next/image";
import Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./styles.css";

import style1 from "@/assets/style-select.png";
import style2 from "@/assets/style-2.png";
import style3 from "@/assets/style-3.png";
import style4 from "@/assets/style-4.png";
import left from "@/assets/black-chevron-left.svg";
import right from "@/assets/black-chevron-right.svg";

const data = [
  {
    img: style1,
    style: "Contemporary",
  },
  {
    img: style2,
    style: "Industrial",
  },
  {
    img: style4,
    style: "Japandi",
  },
  {
    img: style3,
    style: "Coastal",
  },
  {
    img: style1,
    style: "Japandi",
  },
  {
    img: style1,
    style: "Japandi",
  },
  {
    img: style1,
    style: "Japandi",
  },
];

const Slide = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    swiperRef?.current?.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.swiper.slideNext();
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <div>
        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          spaceBetween={24}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          className="mySwiper7"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Card img={item.img} style={item.style} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gap-4 flex justify-center">
        <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
          <button className={`w-full h-full flex justify-center items-center `} onClick={handlePrev}>
            <Image src={left} alt="Previous" width={24} height={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 items-center">
          {data.map((_, index) => (
            <div
              key={index}
              onClick={() => swiperRef?.current?.swiper.slideTo(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                index === activeIndex ? "bg-[#212529]" : "bg-[#DEE2E6]"
              }`}
            ></div>
          ))}
        </div>

        <div className="w-[44px] h-[44px] rounded-full flex justify-center items-center bg-[#FBFBFB] cursor-pointer shadow-sm">
          <button className={`w-full h-full flex justify-center items-center `} onClick={handleNext}>
            <Image src={right} alt="Next" width={24} height={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slide;
