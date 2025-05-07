"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import bg from "@/assets/bg.png";
import checked from "@/assets/Checked .svg";
import zap from "@/assets/zap.svg";
import img1 from "@/assets/Video1.png";
import img2 from "@/assets/Video2.png";
import img3 from "@/assets/Video3.png";

const Four = () => {
  const router = useRouter();
  const { mutate: genOIDMutation, isLoading: isGenering } = useMutation(["OID"], () => generateOrderId(), {
    onSuccess: (data: any) => {
      const oid = data?.id;
      if (oid) {
        router.push(`/dashboard/order/create-order?oid=${oid}`);
      }
    },
    onError: (error: any) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = () => {
    genOIDMutation();
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:px-4 xs:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12">
        <h1 className="text-[24px] xs:text-[30px] lg:text-[36px] font-medium text-center">
          Real Estate Video Editing Services at the Best Prices
        </h1>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {/* 1 */}
          <div>
            <div className="w-auto xs:w-[386px] border-[1px] border-b-0 border-[#f4f4f4] bg-[#fff] p-6 md:p-8 rounded-t-2xl gap-6 flex flex-col">
              <div className="flex flex-col flex-grow gap-2">
                <div className="flex flex-col">
                  <div className="h-[40px] w-[40px] border-[4px] border-third rounded-full flex justify-center items-center mb-5">
                    <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                      <Image src={zap} alt="icon" height={20} width={20} />
                    </div>
                  </div>
                  <h1 className="text-primary uppercase text-[12px] font-medium ">
                    Real Estate Reels: Mobile-friendly videos
                  </h1>
                </div>

                <div className="text-[#6C757D] text-[18px] ">
                  <span className="text-[#212529] font-medium text-[36px]">$60</span> per image
                </div>
              </div>
              <div className="text-[#6c757d] text-[16px]">
                Stylish, fast-paced vertical reels crafted for social media. Boost your marketing with affordable,
                eye-catching visuals perfect for scrolling feeds.
              </div>
              <div className="text-[#6c757d] text-[16px]">Processing time: 24-48 hours</div>
              <div className="text-[#6c757d] text-[16px]">Unlimited free revisions</div>
              <div className="text-[#6c757d] text-[16px]">100% money back guarantee if not satisfied</div>
              <div className="text-[#6c757d] text-[16px]">Pay securely with Paypal</div>
              <div className="text-[#6c757d] text-[16px]">24/7 customer support</div>
              <div className="text-[#495057] text-[14px] mb-[48px] md:mb-[56px]">
                *Additional charges apply: $10 per 5GB over 20GB and $20 per additional 30 seconds. Contact us for
                videos over 50GB.
              </div>
              <div className="-m-6 md:-m-8">
                <Image src={img1} alt="banner" />
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-b-2xl  ">
              <div onClick={handleNewOrder} className="btn-primary">
                Place an order
              </div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="w-auto xs:w-[386px] border-[1px] border-b-0 border-[#f4f4f4] bg-[#fff] p-6 md:p-8 rounded-t-2xl gap-6 flex flex-col">
              <div className="flex flex-col flex-grow gap-2">
                <div className="flex flex-col justify-center">
                  <div className="h-[40px] w-[40px] border-[4px] border-third rounded-full flex justify-center items-center mb-5 ">
                    <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                      <Image src={zap} alt="icon" height={20} width={20} />
                    </div>
                  </div>
                  <h1 className="text-primary uppercase text-[12px] font-medium ">Property Video Editing</h1>
                </div>

                <div className="text-[#6C757D] text-[18px] ">
                  <span className="text-[#212529] font-medium text-[36px]">$80</span> per image
                </div>
              </div>

              <div className="text-[#6c757d] text-[16px]">
                We will stitch together real estate videos to create a high-quality real estate video that helps
                customers feel the scale of the rooms and visualize themselves living in that space.
              </div>
              <div className="text-[#6c757d] text-[16px]">Processing time: 24-48 hours</div>
              <div className="text-[#6c757d] text-[16px]">Unlimited free revisions</div>
              <div className="text-[#6c757d] text-[16px]">100% money back guarantee if not satisfied</div>
              <div className="text-[#6c757d] text-[16px]">Pay securely with Paypal</div>
              <div className="text-[#6c757d] text-[16px]">24/7 customer support</div>

              <div className="text-[#495057] text-[14px] mb-[48px] md:mb-[56px]">
                *Additional charges apply: $10 per 5GB over 20GB and $20 per additional 30 seconds. Contact us for
                videos over 50GB.
              </div>
              <div className="-m-6 md:-m-8">
                <Image src={img2} alt="banner" />
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-b-2xl  bg-white">
              <div onClick={handleNewOrder} className="btn-primary">
                Place an order
              </div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="w-auto xs:w-[386px] border-[1px] border-b-0 border-[#f4f4f4] bg-[#fff] p-6 md:p-8 rounded-t-2xl gap-6 flex flex-col">
              <div className="flex flex-col flex-grow gap-2">
                <div className="flex flex-col justify-center">
                  <div className="h-[40px] w-[40px] border-[4px] border-third rounded-full flex justify-center items-center mb-5 ">
                    <div className="h-full w-full bg-primary rounded-full flex justify-center items-center">
                      <Image src={zap} alt="icon" height={20} width={20} />
                    </div>
                  </div>
                  <h1 className="text-primary uppercase text-[12px] font-medium ">Drone Video Editing</h1>
                </div>

                <div className="text-[#6C757D] text-[18px] ">
                  <span className="text-[#212529] font-medium text-[36px]">$60</span> per image
                </div>
              </div>

              <div className="text-[#6c757d] text-[16px]">
                Submit raw aerial drone footage for our editors to stitch together and turn the video into a real estate
                marketing masterpiece.
              </div>
              <div className="text-[#6c757d] text-[16px]">Processing time: 24-48 hours</div>
              <div className="text-[#6c757d] text-[16px]">Unlimited free revisions</div>
              <div className="text-[#6c757d] text-[16px]">100% money back guarantee if not satisfied</div>
              <div className="text-[#6c757d] text-[16px]">Pay securely with Paypal</div>
              <div className="text-[#6c757d] text-[16px]">24/7 customer support</div>

              <div className="text-[#495057] text-[14px] mb-[48px] md:mb-[56px]">
                *Additional charges apply: $10 per 5GB over 20GB and $20 per additional 30 seconds. Contact us for
                videos over 50GB.
              </div>
              <div className="-m-6 md:-m-8">
                <Image src={img3} alt="banner" />
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-b-2xl">
              <div onClick={handleNewOrder} className="btn-primary">
                Place an order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Four;
