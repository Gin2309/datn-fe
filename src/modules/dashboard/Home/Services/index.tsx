import React from "react";
import Link from "next/link";
import Card from "./Card";

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Object removal",
    categories: "Photo Editing",
    slug: "photo-editing",
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    slug: "video-editing",
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    slug: "video-editing",
  },
];

const Services = () => {
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h1 className="text-[#101828] font-medium text-[18px] md:text-[20px]">Place a new order</h1>
          <div className="hidden md:block">
            <div className="btn-tertiary">
              <Link href={"/dashboard/services"}>All servicess</Link>
            </div>
          </div>
        </div>

        <div className="grid 2xl:grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-0">
          {data.map((item, index) => (
            <div key={index}>
              <Card title={item.title} categories={item.categories} slug={item.slug} />
            </div>
          ))}
        </div>

        <div className="block md:hidden">
          <div className="btn-tertiary">
            <Link href={"/dashboard/services"}>All servicess</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
