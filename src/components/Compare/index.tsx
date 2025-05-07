"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import beforeImg from "@/assets/before2.jpg";
import afterImg from "@/assets/after2.jpg";

interface CompareImgProps {
  before?: any;
  after?: any;
  type?: "secondary";
  rounded?: string;
}

const CompareImg: React.FC<CompareImgProps> = ({ type, rounded, before = beforeImg, after = afterImg }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--position", `${sliderValue}%`);
    }
  }, [sliderValue]);

  const aspectClass = type === "secondary" ? "aspect-auto" : "md:aspect-[2/1]";

  return (
    <div
      ref={containerRef}
      className={`container ${aspectClass} relative ${rounded ? rounded : "rounded-2xl"} `}
      style={{ "--position": `${sliderValue}%` } as React.CSSProperties}
    >
      <div className="image-container relative">
        <Image src={before} alt="before image" className="slider-image image-before" />

        <Image src={after} alt="after image" className="slider-image image-after" />
        {/* 
        <div
          className={`px-3 py-1 absolute left-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] ${
            sliderValue === 0 ? "hidden" : ""
          }`}
        >
          Before
        </div>

        <div
          className={`px-3 py-1 absolute right-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] ${
            sliderValue === 100 ? "hidden" : ""
          }`}
        >
          After
        </div> */}
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(Number(e.target.value))}
        className="slider"
        aria-label="Slider to compare before and after images"
      />
      <div className="slider-line" aria-hidden="true"></div>
      <div className="slider-button" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 7L4 12L9 17M15 7L20 12L15 17"
            stroke="#343A40"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CompareImg;
