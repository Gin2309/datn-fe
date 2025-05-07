"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getBlogList } from "@/api/blog.service";
import { formatDateToShort } from "@/helper/utility";

import blog from "@/assets/blog.png";
import Link from "next/link";
import Card from "../Card";

const DetailBlog = ({ slug }: { slug: any }) => {
  const formFilter = {
    page: 1,
    itemsPerPage: 3,
  };

  const { data, isLoading } = useQuery(["DETAIL_BLOG"], () => getBlogBySlug(slug));

  const { data: list } = useQuery(["BLOG", formFilter], () => getBlogList(formFilter));

  return (
    <>
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <div className="text-start md:text-center">
          <h1 className="text-primary font-medium text-[14px] mb-3">{data?.data?.categories ?? "Categories"}</h1>
          <h2 className="font-medium text-[24px] md:text-[30px] lg:text-[36px] mb-6 lg:mb-[40px]">
            {data?.data?.title ?? "Title"}
          </h2>
          <h3 className="text-[#343A40] text-[16px] md:text-[18px]">
            {data?.data?.createdTime ? formatDateToShort(data?.data?.createdTime) : "Created Time"}
          </h3>
        </div>

        <div className="-mx-4 md:mx-0">
          <Image
            src={blog}
            alt=""
            className="rounded-none md:rounded-2xl  bg-center h-[265px] md:h-[365px] lg:h-[516px] w-full"
          />
        </div>

        <div>{data?.data?.content ? <div dangerouslySetInnerHTML={{ __html: data.data.content }} /> : ""}</div>

        <div className="flex flex-col gap-9 md:gap-12 lg:gap-[64px]">
          <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6 text-center">
            Related articel
          </h1>

          <div className="flex flex-wrap gap-8 justify-center">
            {list?.data?.list.map((item: any, index: number) => (
              <div key={index}>
                <Card key={item.id} slug={item.slug} title={item.title} desc={item.content} />
              </div>
            ))}
          </div>

          <div className="btn-primary h-12 w-full xs:w-[132px] mx-auto">
            <Link href="/blog">View more</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;
