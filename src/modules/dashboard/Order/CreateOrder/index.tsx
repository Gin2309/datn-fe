/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { message, Divider, Drawer } from "antd";
import CustomStep from "@/components/CustomSteps";
import { formatCurrency } from "@/helper/utility";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Four from "./Four";
import Five from "./Five";
import jsonData from "@/contants/service.json";

import pen from "@/assets/pen-line.svg";
import pinkLeft from "@/assets/pink-left.svg";
import whiteRight from "@/assets/white-right.svg";
import pinkEye from "@/assets/pinkEye.svg";
import close from "@/assets/pinkClose.svg";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, updateOrder, getOrderDetail } from "@/api/order.service";
import { CustomInput } from "@/components/CustomInput";
import styled from "styled-components";
import DeleteModal from "../DeleteModal";

const StyledDrawer = styled(Drawer)`
  .ant-drawer .ant-drawer-content-wrapper {
    z-index: 7 !important;
  }

  .ant-drawer-top > .ant-drawer-content-wrapper {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    top: 128px !important;
  }
`;

const CreateOrder = ({ oid, service }: { oid: any; service: any }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, refetch } = useQuery(["ORDER"], () => getOrderDetail(oid), { enabled: isCreated });

  useEffect(() => {
    if (data) {
      setIsCreated(true);
    }
  }, [data]);

  const orderData = data?.data;
  const decodeService = service ? decodeURI(service) : "";

  const [order, setOrder] = useState({
    id: oid,
    projectName: "",
    service: decodeService,
    subService: "",
    uploadImage: "",
    servicePrice: null,
    designStyle: "",
    quantity: "",
    styleDetail: "",
    photoDetail: "",
    additionalService: "",
    addOnService: "",
    additionalServicePrice: 0,
    orderTotal: 0,
    isAgreed: 0,
    status: "AWAITING",
  });

  useEffect(() => {
    if (orderData) {
      setOrder({
        id: oid,
        projectName: orderData.projectName,
        service: orderData.service,
        subService: orderData.subService,
        uploadImage: orderData.uploadImage,
        servicePrice: orderData.servicePrice,
        designStyle: orderData.designStyle,
        quantity: orderData.quantity,
        styleDetail: orderData.styleDetail,
        photoDetail: orderData.photoDetail,
        additionalService: orderData.additionalService,
        addOnService: orderData.addOnService,
        additionalServicePrice: orderData.additionalServicePrice,
        orderTotal: orderData.orderTotal,
        isAgreed: orderData.isAgreed,
        status: orderData.status,
      });
    }
  }, [orderData, oid]);

  useEffect(() => {
    if (oid) {
      setOrder({
        id: oid,
        projectName: "",
        service: decodeService,
        subService: "",
        uploadImage: "",
        servicePrice: null,
        designStyle: "",
        quantity: "",
        styleDetail: "",
        photoDetail: "",
        additionalService: "",
        addOnService: "",
        additionalServicePrice: 0,
        orderTotal: 0,
        isAgreed: 0,
        status: "AWAITING",
      });
    }
  }, [oid]);

  useEffect(() => {
    const { quantity, servicePrice, additionalServicePrice } = order;

    const parsedQuantity = Number(quantity) || 0;
    const parsedServicePrice = servicePrice ? servicePrice : 0;
    const parsedAdditionalServicePrice = additionalServicePrice || 0;

    const deliveryPrice = parsedAdditionalServicePrice * parsedQuantity;
    const servicePriceTotal = parsedServicePrice * parsedQuantity;
    const subTotal = deliveryPrice + servicePriceTotal;

    let finalPrice = subTotal;
    finalPrice = finalPrice > 0 ? finalPrice : 0;
    const tax = finalPrice * 0.03 + 0.49;

    finalPrice += tax;
    finalPrice = Math.max(finalPrice, 1);

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderTotal: finalPrice,
    }));
  }, [order.quantity, order.servicePrice, order.additionalServicePrice]);

  const prevOrderRef = useRef(order);

  const [serviceData, setServiceData] = useState<any | null>(null);
  const isVideoService = serviceData?.id === 10;

  useEffect(() => {
    if (order?.service) {
      const foundService = jsonData.find((service: any) => service.serviceName === order.service);
      if (foundService) {
        setServiceData(foundService);
      } else {
        setServiceData("");
      }
    }
  }, [order.service]);

  const steps = [
    {
      title: "Upload images",
      content: (
        <First
          setData={setOrder}
          data={order}
          serviceList={jsonData}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      ),
    },
    {
      title: "Design style",
      content: <Second setData={setOrder} data={order} />,
    },
    {
      title: "Photo details",
      content: (
        <Third
          setData={setOrder}
          photoDetail={order.photoDetail}
          serviceData={serviceData}
          checkedValue={order.addOnService}
        />
      ),
    },
    {
      title: "Add extras",
      content: <Four setData={setOrder} data={order} serviceData={serviceData} isVideoService={isVideoService} />,
    },
    {
      title: "Make payment",
      content: <Five data={order} oid={oid} createdTime={orderData?.createdTime} />,
    },
  ];

  const steps2 = [
    {
      title: "",
      content: (
        <First
          setData={setOrder}
          data={order}
          serviceList={jsonData}
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      ),
    },
    {
      title: "",
      content: <Second setData={setOrder} data={order} />,
    },
    {
      title: "",
      content: (
        <Third
          setData={setOrder}
          photoDetail={order.photoDetail}
          serviceData={serviceData}
          checkedValue={order.addOnService}
        />
      ),
    },
    {
      title: "",
      content: <Four setData={setOrder} data={order} serviceData={serviceData} isVideoService={isVideoService} />,
    },
    {
      title: "",
      content: <Five data={order} oid={oid} createdTime={orderData?.createdTime} />,
    },
  ];

  const { mutate: createOrderMutation, isLoading: isCreating } = useMutation((data: any) => createOrder(data), {
    onSuccess: () => {
      setIsCreated(true);
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
      console.error(err.response?.data?.message);
    },
  });

  const handleCreateOrder = () => {
    const data = {
      id: oid,
      projectName: order.projectName,
      service: order.service,
      uploadImage: order.uploadImage,
      quantity: order.quantity,
      servicePrice: order.servicePrice,
      designStyle: "Natural",
      additionalService: "Normal Delivery",
    };

    createOrderMutation(data);
  };

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation((data: any) => updateOrder(data, oid), {
    onSuccess: () => {
      refetch();
      console.log(order);
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
      console.error(err.response?.data?.message);
    },
  });

  const handleUpdate = (extraData = {}) => {
    const data = {
      projectName: order.projectName,
      service: order.service,
      quantity: order?.quantity,
      servicePrice: order.servicePrice,
      uploadImage: order.uploadImage,
      photoDetail: order.photoDetail,
      designStyle: order.designStyle,
      additionalService: order.additionalService,
      additionalServicePrice: order.additionalServicePrice,
      orderTotal: order.orderTotal,
      isAgreed: order.isAgreed,
      subService: order.subService,
      styleDetail: order.styleDetail,
      addOnService: order.addOnService,
      ...extraData,
    };

    const hasChanged = JSON.stringify(prevOrderRef.current) !== JSON.stringify(data);

    if (hasChanged) {
      updateMutation(data);
      prevOrderRef.current = order;
    }
  };

  const next = () => {
    if (current === 0) {
      if (!order.projectName) {
        message.warning("Please enter a project name.");
        return;
      }

      if (!order.uploadImage) {
        message.warning("Please enter an image link.");
        return;
      }

      const isValidUrl = (url: string) => {
        const pattern = /^(https?:\/\/).+$/;
        return pattern.test(url);
      };

      if (!isValidUrl(order.uploadImage)) {
        message.warning("Please enter a valid image link.");
        return;
      }

      if (!order.service) {
        message.warning("Please select an service.");
        return;
      }

      if (serviceData?.subServices?.length > 0 && !order.subService) {
        message.warning("Please select a sub-service.");
        return;
      }

      if (!order.quantity) {
        message.warning("Please enter images quantity.");
        return;
      }

      if (!isCreated) {
        handleCreateOrder();
        setCurrent(current + 1);
        return;
      } else {
        handleUpdate({ status: "AWAITING" });
      }
    } else if (current === 1) {
      if (!order.designStyle) {
        const newData = {
          ...order,
          designStyle: "Natural",
        };

        setOrder(newData);
        updateMutation(newData);
        setCurrent(current + 1);
        return;
      }
      handleUpdate({ status: "AWAITING" });
    } else if (current === 2) {
      handleUpdate({ status: "AWAITING" });
    } else if (current === 3) {
      if (!order.isAgreed) {
        message.warning("Please agree to the terms and conditions before proceeding.");
        return;
      }
      if (!order.additionalService) {
        const newData = {
          ...order,
          additionalService: "Normal Delivery",
          additionalServicePrice: 0,
        };

        setOrder(newData);
        updateMutation(newData);
        setCurrent(current + 1);
        return;
      }
      handleUpdate({ status: "AWAITING" });
    }

    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleCancelOrder = () => {
    if (isCreated) {
      setOpenDeleteModal(true);
    } else {
      router.back();
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const items2 = steps2.map((item) => ({ key: item.title, title: item.title }));

  const handleInputChange = (value: any) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      projectName: value,
    }));
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <>
      <div className="create-order w-full px-4 md:px-6 relative flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="px-6 py-4 hidden md:flex gap-12 items-center bg-[#fff] -mt-3 -mx-6">
            <div onClick={handleEditClick} className="cursor-pointer">
              {isEditing ? (
                <CustomInput
                  value={order.projectName ?? ""}
                  onChange={(value) => handleInputChange(value)}
                  onBlur={handleInputBlur}
                  className="h-9"
                  autoFocus
                />
              ) : (
                <h1 className="text-[#6C757D] font-medium text-[24px] flex gap-1 items-center">
                  {order.projectName || "Project name"} <Image src={pen} alt="icon" />
                </h1>
              )}
              <h2 className="text-[#6C757D]">Order ID: {oid}</h2>
            </div>

            <Divider type="vertical" style={{ backgroundColor: "#000", height: "100%" }} />

            <div className="flex gap-12">
              <div>
                <h1 className="text-[#6C757D] text-[12px] uppercase">Service</h1>
                <h2 className="text-[#343A40]">{order.service ? order.service : "---"}</h2>
              </div>

              <div>
                <h1 className="text-[#6C757D] text-[12px] uppercase">Total images</h1>
                <h2 className="text-[#343A40]">{order.quantity ? order.quantity : "---"}</h2>
              </div>

              <div>
                <h1 className="text-[#6C757D] text-[12px] uppercase">Desgin style</h1>
                <h2 className="text-[#343A40]">{order.designStyle ? order.designStyle : "---"}</h2>
              </div>

              <div>
                <h1 className="text-primary text-[12px] uppercase">Order total</h1>
                <h2 className="text-primary">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
              </div>
            </div>
          </div>

          <div className="px-4 pb-3 pt-6 flex md:hidden items-center bg-[#fff] -mt-3 -mx-6 justify-between relative z-10">
            <div className="cursor-pointer">
              {isEditing ? (
                <CustomInput
                  value={order.projectName ?? ""}
                  onChange={(value) => handleInputChange(value)}
                  onBlur={handleInputBlur}
                  className="h-7"
                  autoFocus
                />
              ) : (
                <h1
                  onClick={handleEditClick}
                  className="text-[#212529] font-medium text-[18px] flex gap-1 items-center"
                >
                  {order.projectName || "Project name"} <Image src={pen} alt="icon" className="h-[18px] w-[18px]" />
                </h1>
              )}
              {current === 4 ? (
                <div className="flex gap-1 items-center">
                  <h1 className="text-primary text-[16px] font-medium">View order sumary</h1>
                  {!open ? (
                    <div onClick={() => setOpen(true)}>
                      <Image src={pinkEye} alt="icon" />
                    </div>
                  ) : (
                    <div onClick={() => setOpen(false)}>
                      <Image src={close} alt="icon" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-1 items-end">
                  <h1 className="text-[#6C757D] text-[12px] uppercase">Service</h1>
                  <h2 className="text-[#343A40] text-[14px]">{order.service}</h2>
                </div>
              )}
            </div>

            <div className="border-l-[1px] border-[#fbfbfb] pl-4">
              <h1 className="text-primary text-[12px] uppercase">Order total</h1>
              <h2 className="text-primary">{order.orderTotal !== 0 ? formatCurrency(order.orderTotal) : "---"}</h2>
            </div>
          </div>

          <div>{steps[current].content}</div>
        </div>

        <div className="bg-[#fff] px-6 py-4 -mx-6 flex gap-2 md:gap-5 items-center justify-between">
          {current === 0 ? (
            <div className="btn-five" onClick={handleCancelOrder}>
              <span className="hidden md:block">Cancel</span>
              <span className="block md:hidden">
                <Image src={pinkLeft} alt="icon" />
              </span>
            </div>
          ) : (
            <div className="btn-five flex items-center" onClick={() => prev()}>
              <Image src={pinkLeft} alt="icon" />
              <span className="ml-2 hidden lg:block">{steps[current - 1].title}</span>
            </div>
          )}

          <div className="w-full hidden md:block">
            <CustomStep current={current} items={items} />
          </div>

          <div className="w-full block md:hidden">
            <CustomStep current={current} items={items2} />
          </div>

          {current < steps.length - 1 ? (
            <div className="btn-six flex items-center" onClick={() => next()}>
              <span className="hidden md:block mr-2">{steps[current + 1].title}</span>
              <Image src={whiteRight} alt="icon" className="" />
            </div>
          ) : (
            <div className="btn-six" onClick={() => {}}>
              Pay <span className="hidden md:block">{formatCurrency(order.orderTotal)}</span>
            </div>
          )}
        </div>
      </div>

      <StyledDrawer
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        mask={false}
        style={{ padding: "16px" }}
      >
        <div className="flex gap-4 flex-col">
          <h1 className="text-[#212529] text-[18px] text-medium">Order Sumary</h1>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h1 className="uppercase text-[#6C757D] text-[12px]">Order Id</h1>
              <h2 className="text-[#343A40] text-[16px]">{order.id}</h2>
            </div>
            <div>
              <h1 className="uppercase text-[#6C757D] text-[12px]">Service</h1>
              <h2 className="text-[#343A40] text-[16px]">{order.service}</h2>
            </div>
            <div>
              <h1 className="uppercase text-[#6C757D] text-[12px]">Design style</h1>
              <h2 className="text-[#343A40] text-[16px]">{order.designStyle}</h2>
            </div>
            <div>
              <h1 className="uppercase text-[#6C757D] text-[12px]">Additional Service</h1>
              <h2 className="text-[#343A40] text-[16px]">{order.additionalService}</h2>
            </div>
          </div>

          <h1 className="text-primary font-medium text-[20px]">{formatCurrency(order.orderTotal)}</h1>
        </div>
      </StyledDrawer>

      <DeleteModal isOpen={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} oid={oid} />
    </>
  );
};

export default CreateOrder;
