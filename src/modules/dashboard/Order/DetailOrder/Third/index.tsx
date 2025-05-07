"use client";
import React from "react";

import { CustomCheckbox } from "@/components/CustomCheckbox";
import { CustomTextarea } from "@/components/CustomInput";

const Third = ({
  setData,
  photoDetail,
  serviceData,
  checkedValue,
}: {
  setData: any;
  photoDetail: string;
  serviceData: any;
  checkedValue: any;
}) => {
  const addOnService = serviceData?.addOn ?? [];

  const handleInputChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      photoDetail: value,
    }));
  };

  const handleCheckboxChange = (item: string, isChecked: boolean) => {
    setData((prevData: any) => {
      const currentAddOnService = prevData.addOnService
        ? Array.isArray(prevData.addOnService)
          ? prevData.addOnService
          : JSON.parse(prevData.addOnService || "[]")
        : [];

      const updatedAddOnService = isChecked
        ? [...currentAddOnService, item]
        : currentAddOnService.filter((addOn: string) => addOn !== item);

      return {
        ...prevData,
        addOnService: JSON.stringify(updatedAddOnService),
      };
    });
  };

  return (
    <>
      {addOnService?.length > 0 && (
        <div className="order-card flex flex-col gap-4">
          <h1 className="text-[#212529] text-[18px] font-medium">Choose add on service</h1>

          {addOnService.map((addOnService: any, index: number) => (
            <div key={index} className="bg-white">
              <h1 className="text-[#212529] text-[16px] font-medium mb-4">{addOnService.category || ""}</h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {addOnService.items?.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex items-center gap-2 text-secondary">
                    <CustomCheckbox
                      checked={(checkedValue || []).includes(item)}
                      onChange={(e: any) => handleCheckboxChange(item, e.target.checked)}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="order-card my-6">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Add details about your photos</h1>
        <div className="bg-[#fbfbfb] rounded-lg">
          <CustomTextarea
            value={photoDetail}
            onChange={(e: any) => {
              handleInputChange(e.target.value);
            }}
            rows={5}
            placeholder="Add details about your photos"
          />
        </div>
      </div>
    </>
  );
};

export default Third;
