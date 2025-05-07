import React, { useState } from "react";
import { formatCurrency, formatTwoDigit } from "@/helper/utility";
import { Radio } from "antd";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import CustomTag from "@/components/CustomTag";

const Four = ({
  setData,
  data,
  serviceData,
  isVideoService,
}: {
  setData: any;
  data: any;
  serviceData: any;
  isVideoService: boolean;
}) => {
  const quantity = data.quantity;
  const [selectedDelivery, setSelectedDelivery] = useState(data.additionalServicePrice || 0);
  const deliveryService = serviceData?.addExtra;

  const handleDeliveryChange = (e: any) => {
    const value = e.target.value;
    setSelectedDelivery(value);

    let serviceName = null;
    switch (value) {
      case 0:
        serviceName = "Normal Delivery";
        break;
      case 6:
        serviceName = "Rapid Delivery";
        break;
      case 12:
        serviceName = "Super Rapid Delivery";
        break;
      default:
        serviceName = "Normal Delivery";
    }

    setData((prev: any) => ({
      ...prev,
      additionalService: serviceName,
      additionalServicePrice: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setData((prevData: any) => ({ ...prevData, isAgreed: checked ? 1 : 0 }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-6 mb-6">
      <div className="order-card gap-4 flex xl:hidden flex-col">
        <h1 className="text-[#212529] text-[18px] font-medium">Order summary</h1>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">
            {data.service} for {quantity} {isVideoService ? "videos" : "photos"}
          </h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.servicePrice * data?.quantity)}</h2>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">
            {data?.additionalService ? data?.additionalService : "Normal Delivery"} for {quantity}{" "}
            {isVideoService ? "videos" : "photos"}
          </h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.servicePrice * data?.quantity)}</h2>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">Tax fee</h1>
          <h2 className="text-[#343A40]">3%</h2>
        </div>

        <div className="border-t border-[#DEE2E6]"></div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] uppercase">Sub total</h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.orderTotal)}</h2>
        </div>

        <div className="border-t border-[#DEE2E6]"></div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] uppercase">Order total</h1>
          <h2 className="text-primary text-[20px] font-medium">{formatCurrency(data?.orderTotal)}</h2>
        </div>

        <div className="btn-primary">Make payment</div>

        <div className="flex items-center gap-2 text-[#343A40] font-medium">
          <CustomCheckbox onChange={(checked: any) => handleCheckboxChange(checked)} checked={data.isAgreed === 1} /> I
          agree to the terms and conditions.
        </div>
      </div>

      <div className="order-card col-span-2 gap-4 flex flex-col">
        <div>
          <h1 className="text-[#212529] text-[18px] font-medium mb-4">Choose Rapid delivery</h1>

          <div>
            <Radio.Group onChange={handleDeliveryChange} value={selectedDelivery} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div
                  className={` p-4 rounded-lg ${
                    selectedDelivery === 0 ? "border-primary border-[2px] bg-[#FFF0F5]" : "bg-[#fbfbfb]"
                  }`}
                >
                  <div className="flex justify-between mb-4">
                    <CustomTag title="Normal delivery" color="red" />
                    <Radio value={0} />
                  </div>
                  <h1 className="mb-6 text-[#6C757D] text-[14px]">
                    Delivery within <span className="text-[#212529] font-medium">48 hours</span>
                  </h1>
                  <h1 className="font-medium text-[32px]">
                    +$00.00 <span className="text-[#495057] text-[16px]">/{isVideoService ? "video" : "image"}</span>
                  </h1>
                </div>

                {Array.isArray(deliveryService) && deliveryService[0] && (
                  <div
                    className={` p-4 rounded-lg ${
                      selectedDelivery === 6 ? "border-primary border-[2px] bg-[#FFF0F5]" : "bg-[#fbfbfb]"
                    }`}
                  >
                    <div className="flex justify-between mb-4">
                      <CustomTag title="Rapid delivery" color="lime" />
                      <Radio value={deliveryService[0].price} />
                    </div>
                    <h1 className="mb-6 text-[#6C757D] text-[14px]">
                      Delivery within <span className="text-[#212529] font-medium">24 hours</span>
                    </h1>
                    <h1 className="font-medium text-[32px]">
                      +${formatTwoDigit(deliveryService[0].price)}{" "}
                      <span className="text-[#495057] text-[16px]">/{isVideoService ? "video" : "image"}</span>
                    </h1>
                  </div>
                )}

                {Array.isArray(deliveryService) && deliveryService[1] && (
                  <div
                    className={` p-4 rounded-lg ${
                      selectedDelivery === 12 ? "border-primary border-[2px] bg-[#FFF0F5]" : "bg-[#fbfbfb]"
                    }`}
                  >
                    <div className="flex justify-between mb-4">
                      <CustomTag title="Super rapid delivery" color="gold" />
                      <Radio value={deliveryService[1].price} />
                    </div>
                    <h1 className="mb-6 text-[#6C757D] text-[14px]">
                      Delivery within <span className="text-[#212529] font-medium">12 hours</span>
                    </h1>
                    <h1 className="font-medium text-[32px]">
                      +${formatTwoDigit(deliveryService[1].price)}{" "}
                      <span className="text-[#495057] text-[16px]">/{isVideoService ? "video" : "image"}</span>
                    </h1>
                  </div>
                )}
              </div>
            </Radio.Group>
          </div>
        </div>
      </div>

      <div className="order-card gap-4 hidden xl:flex flex-col">
        <h1 className="text-[#212529] text-[18px] font-medium">Order summary</h1>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">
            {data.service} for {quantity} {isVideoService ? "videos" : "photos"}
          </h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.servicePrice * data?.quantity)}</h2>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">
            {data?.additionalService ? data?.additionalService : "Normal Delivery"} for {quantity}{" "}
            {isVideoService ? "videos" : "photos"}
          </h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.additionalServicePrice * data?.quantity)}</h2>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] text-[14px] md:text-[16px]">Tax fee</h1>
          <h2 className="text-[#343A40]">3%</h2>
        </div>

        <div className="border-t border-[#DEE2E6]"></div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] uppercase">Sub total</h1>
          <h2 className="text-[#343A40]">{formatCurrency(data?.orderTotal)}</h2>
        </div>

        <div className="border-t border-[#DEE2E6]"></div>

        <div className="flex justify-between items-center">
          <h1 className="text-[#495057] uppercase">Order total</h1>
          <h2 className="text-primary text-[20px] font-medium">{formatCurrency(data?.orderTotal)}</h2>
        </div>

        <div className="btn-primary">Make payment</div>

        <div className="flex items-center gap-2 text-[#343A40] font-medium">
          <CustomCheckbox onChange={(checked: any) => handleCheckboxChange(checked)} checked={data.isAgreed === 1} /> I
          agree to the terms and conditions.
        </div>
      </div>
    </div>
  );
};

export default Four;
