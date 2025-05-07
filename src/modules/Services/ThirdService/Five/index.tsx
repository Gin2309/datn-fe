import React from "react";
import Image from "next/image";

import img from "@/assets/style-10.png";
import check from "@/assets/Checked .svg";

const Five = () => {
  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 md:gap-12 lg:gap-[96px] items-center">
        <div className="flex flex-col gap-8">
          <h1 className="font-medium text-[24px] xs:text-[32px] lg:text-[36px] text-[#212529]">
            What do we do in Real Estate Video Editing services?
          </h1>
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Camera shake removal</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Add address and introduction</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Royalty-free Music Track</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Sync video music</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Logo watermarks</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Color correction</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Dynamic video transitions</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Add subtitles</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Video length optimization</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Video length reduction</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Quality improvisation</div>
            </div>

            <div className="flex gap-3">
              <div>
                <Image src={check} alt="icon" />
              </div>
              <div className="text-[#495057] text-[16px]">Video enhancements</div>
            </div>
          </div>
        </div>

        <div>
          <Image src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Five;
