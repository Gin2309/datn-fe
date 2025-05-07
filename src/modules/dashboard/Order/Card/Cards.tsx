"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CustomTag from "@/components/CustomTag";
import SendFeedBack from "@/components/CustomModal/SendFeedBack";
import { formatCurrency, formatTextDate } from "@/helper/utility";

import trash from "@/assets/trash.svg";
import edit from "@/assets/pencil.png";

import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "@/api/order.service";
import { message } from "antd";
import Link from "next/link";

const color: any = {
  DONE: "success",
  AWAITING: "warning",
  READY: "processing",
  REWORK: "volcano",
};

const title: any = {
  DONE: "completed",
  AWAITING: "awaiting payment",
  READY: "ready",
  REWORK: "rework ",
};

const Card = ({
  name,
  categories,
  status,
  price,
  style,
  quantity = 1,
  id,
  date,
  refetch,
  photoCompleted,
}: {
  name: string;
  categories: string;
  status: string;
  price?: number;
  style: string;
  quantity: number;
  id: string;
  date: any;
  refetch: any;
  photoCompleted: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isDone = status !== "AWAITING";
  const isReady = status === "DONE" || status === "REWORK";
  const isEdit = status === "DONE";

  const { mutate: deleteMutation, isLoading } = useMutation((id: any) => deleteOrder(id), {
    onSuccess: () => {
      message.success("Success!");
      refetch();
    },
    onError: (err: any) => {
      message.error(err?.message || "Failed!");
    },
  });

  const handleDelete = () => {
    deleteMutation(id);
  };

  return (
    <>
      <div className="rounded-lg bg-[#fbfbfb] hidden md:block">
        <div className="flex justify-between py-4 px-6 border-b-[1px] border-[#f4f4f4] items-center">
          <div className="flex gap-12">
            <h1 className="text-[#212529] font-medium">{name}</h1>
            <h1 className="text-[#343a40]">{categories}</h1>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="uppercase text-[#6C757D] text-[12px]">Status</h1>
            <CustomTag title={title[status] || "awaiting payment"} color={color[status] || "warning"} />
          </div>
        </div>

        <div className="p-6 flex justify-between gap-12 flex-wrap">
          <div className="flex gap-6 flex-wrap">
            <div>
              <h1 className="text-[#6C757D] text-[12px] uppercase">Style</h1>
              <h2 className="text-[#212529]">{style}</h2>
            </div>
            <div>
              <h1 className="text-[#6C757D] text-[12px] uppercase">Quantity</h1>
              <h2 className="text-[#212529]">
                {quantity ? `${quantity} ${categories === "Property Videos" ? "videos" : "images"}` : "----"}
              </h2>
            </div>
            <div>
              <h1 className="text-[#6C757D] text-[12px] uppercase">Order ID</h1>
              <h2 className="text-[#212529]">{id}</h2>
            </div>
            <div>
              <h1 className="text-[#6C757D] text-[12px] uppercase">Placed on</h1>
              <h2 className="text-[#212529]">{formatTextDate(date)}</h2>
            </div>
            <div>
              <h1 className="text-[#6C757D] text-[12px] uppercase">Total</h1>
              <h2 className="text-[#212529]">{price ? formatCurrency(price) : "----"}</h2>
            </div>
          </div>

          <div className="flex gap-2">
            <div
              onClick={() => router.push(`/dashboard/order/${id}`)}
              className={`btn-quaternary ${isDone ? "!hidden" : "block"}`}
            >
              Review & Pay
            </div>

            <button
              disabled={!isEdit}
              className={`rounded-lg h-[48px] w-[48px] flex items-center justify-center border-[1px] border-[#212529]  ${
                isEdit ? "cursor-pointer hover:opacity-80 block" : "hidden"
              }`}
              onClick={() => setOpen(true)}
            >
              <Image src={edit} alt="icon" width={24} height={24} />
            </button>

            <button
              disabled={isDone || isLoading}
              className={`rounded-lg h-[48px] w-[48px] flex items-center justify-center border-[1px] border-[#dc3545]  ${
                isDone ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
              }`}
              onClick={handleDelete}
            >
              <Image src={trash} alt="icon" />
            </button>
          </div>
        </div>

        {isReady && (
          <div className="px-6 pb-6">
            {photoCompleted ? (
              <Link href={photoCompleted} target="_blank" className="hover:opacity-80 cursor-pointer">
                Product link: {photoCompleted}
              </Link>
            ) : (
              <span>Product link: Not available</span>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg bg-[#fbfbfb] block md:hidden mb-6">
        <div className="flex justify-between py-3 px-4 border-b-[1px] border-[#f4f4f4] items-center">
          <h1 className="text-[#212529] font-medium">{name}</h1>
          <CustomTag title={title[status] || "awaiting payment"} color={color[status] || "warning"} />
        </div>
        <div className="p-6 gap-6 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <h1 className="text-[#6C757D] text-[12px] uppercase w-2/5">Style</h1>
              <h2 className="text-[#212529] w-3/5">{style}</h2>
            </div>
            <div className="flex">
              <h1 className="text-[#6C757D] text-[12px] uppercase w-2/5">Place on</h1>
              <h2 className="text-[#212529] w-3/5">{date}</h2>
            </div>
            <div className="flex">
              <h1 className="text-[#6C757D] text-[12px] uppercase w-2/5">Service</h1>
              <h2 className="text-[#212529] w-3/5">{categories}</h2>
            </div>
            <div className="flex">
              <h1 className="text-[#6C757D] text-[12px] uppercase w-2/5">quantity</h1>
              <h2 className="text-[#212529] w-3/5">{quantity ? `${quantity} images` : "----"}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-primary ">{price ? formatCurrency(price) : "----"}</div>

            <div className="flex gap-2">
              <div
                onClick={() => router.push(`/dashboard/order/${id}`)}
                className={`btn-quaternary h-9 ${isDone ? "!hidden" : "block"}`}
              >
                Review & Pay
              </div>

              <button
                disabled={!isEdit}
                className={`rounded-lg h-[36px] w-[36px] flex items-center justify-center border-[1px] border-[#212529]  ${
                  isEdit ? "cursor-pointer hover:opacity-80 block" : "hidden"
                }`}
                onClick={() => setOpen(true)}
              >
                <Image src={edit} alt="icon" width={24} height={24} />
              </button>

              <button
                disabled={isDone || isLoading}
                className={`rounded-lg h-[36px] w-[36px] flex items-center justify-center border-[1px] border-[#dc3545]  ${
                  isDone ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
                }`}
                onClick={handleDelete}
              >
                <Image src={trash} alt="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SendFeedBack isOpen={open} onCancel={() => setOpen(false)} oid={id} refetch={refetch} />
    </>
  );
};

export default Card;
