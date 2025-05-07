"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Link from "next/link";
import bg from "@/assets/mediumBanner.png";
import CompareImg from "@/components/Compare";

import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

const Card = ({
  title,
  img = bg,
  categories,
  slug,
  desc,
  after,
  before,
}: {
  title: string;
  img?: any;
  categories: string;
  slug: string;
  desc: string;
  after?: any;
  before?: any;
}) => {
  const router = useRouter();

  const { mutate: genOIDMutation } = useMutation(["OID"], (title: any) => generateOrderId(), {
    onSuccess: (data: any, variables) => {
      const oid = data?.id;
      const title = variables;
      const encodedTitle = encodeURIComponent(title);

      router.replace(`/dashboard/order/create-order?service=${encodedTitle}&oid=${oid}`);
    },
    onError: (error) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = (title: any) => {
    genOIDMutation(title);
  };
  return (
    <>
      <div className="rounded-2xl overflow-hidden w-[329px] h-[495px] md:h-[530px] lg:h-[600px] md:w-[520px] lg:w-[600px] shadow-md">
        <div className="relative max-w-[1540px]">
          <CompareImg rounded="rounded-tl-2xl rounded-tr-2xl" after={after} before={before} />

          <div
            className={`px-3 py-1 absolute left-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] `}
          >
            Before
          </div>

          <div
            className={`px-3 py-1 absolute right-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]`}
          >
            After
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-9 gap-9 md:gap-10 lg:gap-12 flex flex-col">
          <div>
            <h1 className="text-primary text-[12px] uppercase">{categories}</h1>
            <Link
              href={`/services/${slug}`}
              className="font-medium text-[24px] md:text-[28px] lg:text-[32px] mt-2 mb-4"
            >
              {title}
            </Link>
            <h3 className="text-[#0000008F]">{desc}</h3>
          </div>

          <div>
            <h1 className="text-[#000000CC] text-[14px] block md:hidden mb-4">
              Starting from <span className="text-primary">$16</span>
            </h1>

            <div className="flex gap-4 items-center">
              <div
                onClick={() => handleNewOrder(title)}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-[#FFF0F5] font-medium text-[#A50032] cursor-pointer hover:opacity-80"
              >
                Place an order
              </div>
              <Link
                href={`/services/${slug}`}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg border-[1px] border-[#DEE2E6] font-medium text-[#343A40] cursor-pointer hover:opacity-80"
              >
                Learn more
              </Link>
              <h1 className="text-[#000000CC] text-[14px] hidden md:block">
                Starting from <span className="text-primary">$16</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
