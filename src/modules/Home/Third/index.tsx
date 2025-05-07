import React from "react";
import Card from "./Card";

import bg from "@/assets/bg.png";

import icon1 from "@/assets/dollar-sign.svg";
import icon2 from "@/assets/clock.svg";
import icon3 from "@/assets/circle-slash-2.svg";
import icon4 from "@/assets/headset.svg";
import icon5 from "@/assets/credit-card.svg";
import icon6 from "@/assets/image-up.svg";

const Third = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-9 md:gap-12 ">
        <h1 className="text-[24px] mđ:text-[30px] lg:text-[36px] font-medium text-center">Why choose my service?</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card
            img={icon1}
            title="Unbeatable prices"
            desc="We want to be a reputable partner with the most optimal costs"
          />
          <Card
            img={icon2}
            title="Fast turnarounds"
            desc="Time is your necessity and we always understand that. We can process faster than 12 hours if you want."
          />
          <Card
            img={icon3}
            title="No exception"
            desc="There are no limits to any requirements, just let us know what your job needs"
          />
          <Card
            img={icon4}
            title="Support 24/7"
            desc="Supporter are always ready to assist you via live chat, email or phone number"
          />
          <Card
            img={icon5}
            title="Money back guarantee"
            desc="100% refund if you are not satisfied with the display of your images."
          />
          <Card img={icon6} title="First order free" desc="Free 5 completed images for your first order." />
        </div>
      </div>
    </div>
  );
};

export default Third;
