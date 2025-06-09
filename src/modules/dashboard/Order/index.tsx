"use client";
import React, { useState } from "react";
import Image from "next/image";

import { CustomSelect } from "@/components/CustomSelect";
import CustomTabs from "@/components/CustomTabs";
import Card from "./Card/Cards";
import OrderBtn from "../OrderBtn";
import CustomPagination from "@/components/CustomPagination";

import card from "@/assets/cardIcon.svg";
import flag from "@/assets/flagIcon.svg";
import done from "@/assets/doneIcon.svg";
import rework from "@/assets/reworkIcon.svg";

import { useQuery } from "@tanstack/react-query";
import { getOrderList ,getOrderStatus} from "@/api/order.service";

const tabs = [
  { key: "", label: "All order" },
  { key: "awaiting", label: "Awaiting payment" },
  { key: "ready", label: "Getting ready" },
  { key: "done", label: "Order delivered" },
  { key: "rework", label: "Rework requested" },
];

const options = [
  { value: true, label: "Newest First" },
  { value: false, label: "Oldest First" },
];

const Order = () => {
  const [formFilter, setFormFilter] = useState({
    page: 1,
    itemsPerPage: 10,
    status: "",
    sortDesc: true,
  });

  const currentTab = tabs.find((tab) => tab.key === formFilter.status) || { label: "All order" };

  const { data, isLoading, refetch } = useQuery(["ORDER", formFilter], () => getOrderList(formFilter), {
    refetchOnWindowFocus: true,
  });

  const { data: responseData } = useQuery(["ORDER_COUNT"], () => getOrderStatus(), {
    refetchOnWindowFocus: true,
  });

  const countData: any = responseData || [];

  const statusData = [
    { status: "AWAITING", label: "Awaiting payment", icon: card },
    { status: "READY", label: "Getting ready", icon: flag },
    { status: "DONE", label: "Order delivered", icon: done },
    { status: "REWORK", label: "Rework requested", icon: rework },
  ];

  const handleTabChange = (key: string) => {
    setFormFilter((prev) => ({
      ...prev,
      status: key,
    }));
  };

  return (
    <>
      <div
        className="w-full px-4 md:px-6 flex flex-col gap-9 md:gap-12"
      >
        <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
          <h1 className="text-[#212529] font-medium text-[24px]">My orders</h1>

          <div className="hidden md:flex gap-3">
            <OrderBtn />
          </div>
        </div>

        <div className="card hidden md:grid grid-cols-4">
          {statusData.map((item) => {
            const count = countData?.find((data: any) => data.status === item.status)?.count || 0;

            return (
              <div key={item.status} className="p-6 flex flex-col gap-4 border-l-[1px] border-[#FBFBFB]">
                <div className="flex items-center text-[#343A40] text-[14px]">
                  <Image src={item.icon} alt="icon" className="mr-2" />
                  {item.label}
                </div>
                <h1 className="ml-12 text-[36px] font-medium text-[#212529]">{count}</h1>
              </div>
            );
          })}
        </div>

        <div className="card grid md:hidden grid-cols-2">
          {statusData.map((item) => {
            const count = countData?.find((data: any) => data.status === item.status)?.count || 0;

            return (
              <div
                key={item.status}
                className={`p-4 flex flex-col gap-2 border-[1px] ${
                  item.status === "AWAITING" || item.status === "READY" ? "border-t-0" : ""
                } ${
                  item.status === "READY" || item.status === "REWORK" ? "border-r-0" : "border-l-0"
                } border-[#FBFBFB]`}
              >
                <div className="flex items-center">
                  <Image src={item.icon} alt="icon" className="mr-2" />
                  <h1 className="text-[36px] font-medium text-[#212529]">{count}</h1>
                </div>
                <h1 className="text-[#343A40] text-[14px]">{item.label}</h1>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-6 mb-6">
          <CustomTabs tabs={tabs} onChange={handleTabChange} activeKey={formFilter.status} />

          <div className="card flex flex-col gap-4 md:gap-6">
            <div className="flex justify-between items-center">
              <h1>{currentTab.label}</h1>
              <div className="flex gap-4 items-center text-[#6C757D] whitespace-nowrap">
                <h1>Sort by</h1>
                <CustomSelect
                  options={options}
                  onChange={(selectedValue) => {
                    setFormFilter((prev) => ({
                      ...prev,
                      sortDesc: selectedValue,
                    }));
                  }}
                  value={formFilter.sortDesc}
                />
              </div>
            </div>

            {data?.data?.list.map((item: any, index: number) => (
              <Card
                key={index}
                name={item.projectName}
                categories={item.service}
                status={item.status}
                price={item.orderTotal}
                style={item.designStyle}
                quantity={item.quantity}
                id={item.id}
                date={item.createdTime}
                refetch={refetch}
                photoCompleted={item.photoCompleted}
              />
            ))}

            <CustomPagination
              page={formFilter.page}
              pageSize={formFilter.itemsPerPage}
              total={data?.data?.count}
              setPage={(value) => setFormFilter({ ...formFilter, page: value })}
              setPerPage={(value) => setFormFilter({ ...formFilter, itemsPerPage: value })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
