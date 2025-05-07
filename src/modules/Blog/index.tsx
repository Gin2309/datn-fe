"use client";
import React, { useState } from "react";
import Card from "./Card";

import { useQuery } from "@tanstack/react-query";
import { getBlogList } from "@/api/blog.service";

const Blog = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const formFilter = {
    page: 1,
    itemsPerPage: itemsPerPage,
  };

  const { data, isLoading } = useQuery(["BLOG", formFilter], () => getBlogList(formFilter));

  const handleLoadMore = () => {
    setItemsPerPage((prev) => prev + 3);
  };

  return (
    <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
      <div className="md:mb-4 mb-7">
        <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium  text-center mb-4 md:mb-6">Blog</h1>
        <h2 className="text-[#495057] text-[18px] text-center">
          Share your experiences, stay updated with the latest features and improvements to our services
        </h2>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
        {data?.data?.list.map((item: any) => (
          <Card key={item.id} slug={item.slug} title={item.title} desc={item.shortDesc} />
        ))}
      </div>

      <div className="btn-primary h-12 w-full xs:w-[132px] mx-auto cursor-pointer" onClick={handleLoadMore}>
        Load more
      </div>
    </div>
  );
};

export default Blog;
