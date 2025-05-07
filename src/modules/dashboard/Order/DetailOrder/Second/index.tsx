import React, { useState } from "react";
import Image from "next/image";
import img from "@/assets/style-select.png";
import eye from "@/assets/order-eye.svg";
import { CustomTextarea } from "@/components/CustomInput";

const styles = ["Natural", "Bright white"];

const Second = ({ data, setData }: { data: any; setData: any }) => {
  const [selectedStyle, setSelectedStyle] = useState(data?.designStyle || "Natural");

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    setData((prevData: any) => ({ ...prevData, designStyle: style }));
  };

  const handleInputChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      styleDetail: value,
    }));
  };

  return (
    <>
      <div className="order-card">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Select a style*</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {styles.map((styleName) => (
            <div
              key={styleName}
              onClick={() => handleStyleSelect(styleName)}
              className={`rounded-2xl bg-cover bg-center overflow-hidden relative cursor-pointer h-auto lg:h-[180px] xl:h-auto xl:max-h-[280px] ${
                selectedStyle === styleName ? "border-primary border-4" : ""
              }`}
            >
              <Image src={img} alt="img" className="object-cover object-center h-full w-full" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <div
                  className={`uppercase rounded-2xl px-3 py-1 text-white ${
                    selectedStyle === styleName ? "bg-primary  border-primary" : "bg-[#00000066] border-[#FFFFFF4D]"
                  } border-[1px] backdrop-blur-md font-medium text-[12px]`}
                >
                  {styleName}
                </div>
                <div
                  className={`h-[28px] w-[28px] rounded-full flex items-center justify-center ${
                    selectedStyle === styleName ? "bg-primary border-primary" : "bg-[#00000066] border-[#FFFFFF4D]"
                  } border-[1px] backdrop-blur-md`}
                >
                  <Image src={eye} alt="icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-card my-4">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Add details about your photos</h1>
        <div className="bg-[#fbfbfb] rounded-lg">
          <CustomTextarea
            onChange={(e: any) => handleInputChange(e.target.value)}
            rows={5}
            value={data?.styleDetail}
            placeholder="Add details about style your photos"
          />
        </div>
      </div>
    </>
  );
};

export default Second;
