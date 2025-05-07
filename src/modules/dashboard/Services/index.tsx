"use client";
import React, { useState } from "react";
import Image from "next/image";

import CustomTabs from "@/components/CustomTabs";
import plus from "@/assets/plus.svg";
import Card from "./Card";
import OrderBtn from "../OrderBtn";

const tabs = [
  { key: "", label: "All service" },
  { key: "Virtual Staging & Renovation", label: "Virtual Staging & Renovation" },
  { key: "Photo Editing", label: "Photo Editing" },
  { key: "Video Editing", label: "Video Editing" },
];

const data = [
  {
    title: "Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: "Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Commercial Virtual Staging",
    categories: "Virtual Staging & Renovation",
    desc: " Give buyers to visualize their business setup in a comfy & efficient environment.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Matterport Virtual Staging.",
    categories: "Virtual Staging & Renovation",
    desc: "Virtually stage your property link and create an immersive 3D walkthrough.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Virtual Renovation",
    categories: "Virtual Staging & Renovation",
    desc: " Virtually renovate your wall, ceiling, floor, kitchen, bathrooms etc.",
    slug: "virtual-staging-renovation",
  },
  {
    title: "Occupied to Vacant",
    categories: "Photo Editing",
    desc: "Remove dated or cluttered furnishings from your listing images.",
    slug: "photo-editing",
  },
  {
    title: "Day to Dusk",
    categories: "Photo Editing",
    desc: "Turn daylight home photos into eye catching dusk images.",
    slug: "photo-editing",
  },
  {
    title: "Object removal",
    categories: "Photo Editing",
    desc: "Remove unwanted or distracting items from your listing photos.",
    slug: "photo-editing",
  },
  {
    title: "Image Enhancement",
    categories: "Photo Editing",
    desc: " Brighten, sharpen, balance, and remove reflections in your listing photos.",
    slug: "photo-editing",
  },
  {
    title: "Property Videos",
    categories: "Video Editing",
    desc: "Create a real estate video to gain prospects' attention and sell their listings faster.",
    slug: "video-editing",
  },
];

const Services = () => {
  const [currentTab, setCurrentTab] = useState("");

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };

  const filteredData = data.filter((item) => {
    return currentTab === "" || item.categories === currentTab;
  });

  return (
    <div
      style={{ minHeight: "calc(100vh - 24px)" }}
      className="w-full px-4 md:px-6 bg-[#fbfbfb] flex flex-col gap-9 md:gap-12 mb-6"
    >
      <div className="flex justify-between pt-4 md:pt-0 mb-[-20px] md:mb-0">
        <h1 className="text-[#212529] font-medium text-[24px]">Place a new order</h1>

        <div className="hidden md:flex gap-3">
          <OrderBtn />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <CustomTabs tabs={tabs} onChange={handleTabChange} activeKey={currentTab} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 md:gap-6 mb-4 md:mb-0">
          {filteredData.map((item, index) => (
            <div key={index}>
              <Card title={item.title} categories={item.categories} desc={item.desc} slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
