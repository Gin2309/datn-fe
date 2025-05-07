"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Collapse } from "antd";
const { Panel } = Collapse;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";

import down from "@/assets/chevron-down.svg";
import up from "@/assets/chevron-up.svg";
import sofa from "@/assets/sofa.svg";
import store from "@/assets/store.svg";
import img3d from "@/assets/move-3d.svg";
import building from "@/assets/building.svg";
import box from "@/assets/box.svg";
import sun from "@/assets/haze.svg";
import eraser from "@/assets/eraser.svg";
import wand from "@/assets/wand-sparkles.svg";
import cut from "@/assets/cut.svg";

const MenuContent = ({ activePage, onClose }: { activePage: any; onClose: () => void }) => {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    setTimeout(() => {
      router.push(path);
      onClose();
    }, 500);
  };

  return (
    <div>
      <div className="border-[1px]  border-[#f4f4f4] p-4">
        <Link href={"/"} className={`${activePage === "/" ? "text-primary" : "text-[#6C757D]"}`}>
          Home
        </Link>
      </div>

      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={({ isActive }) => <Image src={isActive ? up : down} alt="expand icon" width={24} height={24} />}
      >
        <Panel
          header={
            <div className="flex justify-between items-center">
              <Link href="/services" className={`${activePage === "/services" ? "text-primary" : "text-[#6C757D]"}`}>
                Services
              </Link>
            </div>
          }
          key="1"
        >
          <div className="bg-[#FBFBFB]">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={24}
              pagination={{
                clickable: true,
              }}
              className="mySwiper2"
            >
              <SwiperSlide>
                <div className="border-t-[1px] border-[#f4f4f4] p-4 gap-4 flex flex-col w-[295px]">
                  <div className="flex gap-3 items-start">
                    <div className="icon-primary !w-[40px] !h-[40px]">
                      <Image src={sofa} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/virtual-staging-renovation/virtual-staging")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Virtual Staging
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Help buyers fall in love with your listings by turning vacant rooms into stylish spaces.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary !w-[40px] !h-[40px]">
                      <Image src={store} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() =>
                          handleLinkClick("/services/virtual-staging-renovation/commercial-virtual-staging")
                        }
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Commercial Virtual Staging
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Give buyers to visualize their business setup in a comfy & efficient environment.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary !w-[40px] !h-[40px]">
                      <Image src={img3d} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() =>
                          handleLinkClick("/services/virtual-staging-renovation/matterport-virtual-staging")
                        }
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Matterport Virtual Staging.
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Virtually stage your property link and create an immersive 3D walkthrough.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary !w-[40px] !h-[40px]">
                      <Image src={building} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/virtual-staging-renovation/virtual-renovation")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Virtual Renovation
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Virtually renovate your wall, ceiling, floor, kitchen, bathrooms etc.
                      </h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border-[1px] border-[#f4f4f4] p-4 gap-4 flex flex-col  w-[295px]">
                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={box} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/photo-editing/occupied-to-vacant")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Occupied to Vacant
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Remove dated or cluttered furnishings from your listing images.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={sun} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/photo-editing/day-to-dust")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Day to Dusk
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Turn daylight home photos into eye catching dusk images.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={eraser} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/photo-editing/object-removal")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Object Removal
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Remove unwanted or distracting items from your listing photos.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={wand} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/photo-editing/image-enhancement")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Image Enhancement
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Brighten, sharpen, balance, and remove reflections in your listing photos.
                      </h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="border-t-[1px] border-[#f4f4f4] gap-4 p-4 flex flex-col  w-[295px]">
                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={cut} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/lawn-replacement")}
                        className="font-medium cursor-pointer hover:text-primary"
                      >
                        Lawn Replacement
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Create a real estate video to gain prospects attention and sell their listings faster.
                      </h2>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="icon-primary">
                      <Image src={cut} alt="" />
                    </div>
                    <div>
                      <h1
                        onClick={() => handleLinkClick("/services/video-editing/real-estate-video-editing")}
                        className="font-medium text-[14px] cursor-pointer hover:text-primary"
                      >
                        Property Videos
                      </h1>
                      <h2 className="text-[#495057] text-[14px]">
                        Create a real estate video to gain prospects attention and sell their listings faster.
                      </h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Panel>
      </Collapse>

      <div className="border-[1px] border-b-0 border-[#f4f4f4] p-4">
        <Link href={"/blog"} className={`${activePage === "/blog" ? "text-primary" : "text-[#6C757D]"}`}>
          Blog
        </Link>
      </div>

      <div className="border-[1px] border-[#f4f4f4] p-4">
        <Link href={"/contact"} className={`${activePage === "/contact" ? "text-primary" : "text-[#6C757D]"}`}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MenuContent;
