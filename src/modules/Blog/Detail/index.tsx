"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug, getBlogList } from "@/api/blog.service";
import { formatDateToShort } from "@/helper/utility";

import blog from "@/assets/blog.png";
import Card from "../Card";

const DetailBlog = ({ slug }: { slug: string }) => {
  const formFilter = {
    page: 1,
    itemsPerPage: 3,
  };

  const { data, isLoading } = useQuery(["DETAIL_BLOG", slug], () => getBlogBySlug(slug));
  const { data: list } = useQuery(["BLOG", formFilter], () => getBlogList(formFilter));

  const blogData = data?.data?.data;

  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-12">
      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-6 w-2/3 bg-gray-300 rounded" />
          <div className="h-[300px] bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-start md:text-center">
            <h1 className="text-primary font-medium text-[14px] mb-3">
              {blogData?.tags?.map((tag: any) => tag.name).join(", ") || "Tag"}
            </h1>

            <h2 className="font-medium text-[24px] md:text-[30px] lg:text-[36px] mb-4 lg:mb-6">
              {blogData?.title}
            </h2>

            <div className="text-sm md:text-base text-[#6C757D] flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center justify-center">
              <span>Author: <strong>{blogData?.user?.name || "Unknow"}</strong></span>
              <span>|</span>
              <span>{formatDateToShort(blogData?.createdTime)}</span>
            </div>
          </div>

          {/* Image */}
          <div className="-mx-4 md:mx-0">
            <Image
              src={blogData?.img || blog}
              alt={blogData?.title || "blog image"}
              width={1200}
              height={700}
              className="rounded-none md:rounded-2xl object-cover h-[265px] md:h-[365px] lg:h-[516px] w-full"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {blogData?.content && (
              <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
            )}
          </div>

          {/* Related Articles */}
          <div className="flex flex-col gap-9 md:gap-12 lg:gap-[64px]">
            <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6 text-center">
            Related articles 
            </h1>

            <div className="flex flex-wrap gap-8 justify-center">
              {list?.data?.list?.map((item: any) => (
                <Card key={item.id} slug={item.slug} title={item.title} desc={item.shortDesc} img={item.img}/>
              ))}
            </div>

            <div className="btn-primary h-12 w-full xs:w-[132px] mx-auto">
              <Link href="/blog">View more</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailBlog;
