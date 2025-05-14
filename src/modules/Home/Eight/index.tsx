"use client";
import React from "react";
import Link from "next/link";
// import Card from "./Card";
import Card from "@/modules/Blog/Card";
import { useQuery } from "@tanstack/react-query";
import { getBlogList } from "@/api/blog.service";

const Eight = () => {
  const formFilter = {
    page: 1,
    itemsPerPage: 3,
  };

  const { data } = useQuery(["BLOG", formFilter], () => getBlogList(formFilter));

  return (
    <div className="px-4 lg:px-[64px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6 text-center">Blog</h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {data?.data?.list.map((item: any, index: number) => (
          <div key={index}>
            <Card key={item.id} slug={item.slug} title={item.title} desc={item.shortDesc} img={item.img} subject={item.tags.map((tag: any) => tag.name).join(", ")}/>
          </div>
        ))}
      </div>

      <div className="btn-primary h-12 w-[132px] mx-auto">
        <Link href="/blog">View more</Link>
      </div>
    </div>
  );
};

export default Eight;
