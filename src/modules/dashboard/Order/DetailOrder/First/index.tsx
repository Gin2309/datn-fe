import React, { useEffect, useState } from "react";
import { CustomInput } from "@/components/CustomInput";
import { LinkOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const services = [
  { value: "Image Enhancement", label: "Image Enhancement" },
  { value: "Virtual Staging", label: "Virtual Staging" },
  { value: "Day to Dusk", label: "Day to Dusk" },
  { value: "Day to Twilight", label: "Day to Twilight" },
  { value: "Object Removal", label: "Object Removal" },
  { value: "Changing Seasons", label: "Changing Seasons" },
  { value: "Water in Pool", label: "Water in Pool" },
  { value: "Lawn Replacement", label: "Lawn Replacement" },
  { value: "Rain to Shine", label: "Rain to Shine" },
  { value: "Property Videos", label: "Property Videos" },
];

const First = ({
  setData,
  data,
  serviceList,
  setServiceData,
  serviceData,
}: {
  setData: any;
  data: any;
  serviceList: any;
  setServiceData: any;
  serviceData: any;
}) => {
  const [service, setService] = useState(null);
  const [subServiceData, setSubServiceData] = useState(null);

  const subService = serviceData?.subServices ?? [];

  useEffect(() => {
    if (data && data.service) {
      setService(data.service);
    }

    if (data && data.subService) {
      setSubServiceData(data.subService);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setService(value);
    setData((prev: any) => ({
      ...prev,
      service: value || null,
      subService: "",
      addOnService: "",
      servicePrice: matchedService?.subServices?.length ? null : matchedService?.price || null,
      additionalServicePrice: 0,
    }));

    const matchedService = serviceList.find((service: any) => service.serviceName === value);

    if (matchedService) {
      setServiceData(matchedService);
    }
  };

  const handleSubServiceChange = (e: any) => {
    if (!subService.length) return;
    const value = e.target.value;
    const matchedSubService = serviceData?.subServices?.find((sub: any) => sub.serviceName === value);

    setData((prev: any) => ({
      ...prev,
      subService: value || null,
      servicePrice: matchedSubService?.price,
    }));
  };

  const handleInputChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      uploadImage: value,
      status: "AWAITING",
    }));
  };

  const handleQuantityChange = (value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      quantity: value,
      status: "AWAITING",
    }));
  };

  return (
    <>
      <div className="order-card">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Choose your service*</h1>
        <Radio.Group onChange={handleChange} value={service} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.map((serviceOption, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  service === serviceOption.value ? "border-primary border-[2px] bg-[#FFF0F5]" : "bg-[#fbfbfb]"
                }`}
              >
                <div className="flex justify-between mb-4">
                  <Radio value={serviceOption.value} />
                </div>
                <h1 className="font-medium text-[18px] md:text-[24px]">{serviceOption.label}</h1>
              </div>
            ))}
          </div>
        </Radio.Group>
      </div>

      {subService.length > 0 && (
        <div className="order-card">
          <h1 className="text-[#212529] text-[18px] font-medium mb-4">Choose your sub service*</h1>
          <Radio.Group onChange={handleSubServiceChange} value={data.subService} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {subService.map((serviceOption: any, index: number) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    subServiceData === serviceOption.serviceName
                      ? "border-primary border-[2px] bg-[#FFF0F5]"
                      : "bg-[#fbfbfb]"
                  }`}
                >
                  <div className="flex justify-between mb-4">
                    <Radio value={serviceOption.serviceName} />
                  </div>
                  <h1 className="font-medium text-[18px] md:text-[24px]">{serviceOption.serviceName}</h1>
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>
      )}

      <div className="order-card">
        <h1 className="text-[#212529] text-[18px] font-medium mb-4">Up load some photos of your property*</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            onChange={(value: any) => {
              handleInputChange(value);
            }}
            placeholder="Paste your link here"
            className="h-12 "
            suffix={<LinkOutlined />}
            value={data.uploadImage ?? ""}
          />

          <CustomInput
            onChange={(value: any) => {
              handleQuantityChange(value);
            }}
            placeholder="Enter your images quantity"
            className="h-12 "
            type="number"
            value={data?.quantity ?? ""}
          />
        </div>
      </div>
    </>
  );
};

export default First;
