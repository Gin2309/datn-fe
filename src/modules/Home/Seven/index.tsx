import React from "react";
import Card from "./Card";

import bg from "@/assets/bg.png";
import cus1 from "@/assets/customer1.jpg";
import cus2 from "@/assets/customer2.jpeg";
import cus3 from "@/assets/customer3.jpg";

const data = [
  {
    title: "Delivery time and quality of work are impeccable.",
    desc: "The process is easy from start to finish. Definitely worth the investment, if you are looking to tweak some of your real estate projects. Thank you so much again!",
    name: "julio_garza",
    img: cus1,
  },
  {
    title: "Very easy to work with.",
    desc: "Instructions were clear and I received more than expected. I was very pleased with the exposure correction and light balance that I couldn't get right on my own. I will send all my work to her in the future.",
    name: "robertduncan888",
    img: cus2,
  },
  {
    title: "I worked with this editor on a photo editing project for a client and the experience was amazing.",
    desc: "Despite many editing requests, the work is always completed with outstanding quality, professionalism and a positive attitude. The attention to detail and willingness to accommodate every request truly exceeded my expectations. Highly recommended for anyone looking for top editing services.",
    name: "dougmazell",
    img: cus3,
  },
];

const Seven = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="sm:px-4 lg:px-[64px] xl:px-[108px] py-12 md:py-[64px] flex flex-col gap-12">
        <div className="text-center">
          <h1 className="text-[24px] md:text-[30px] lg:text-[36px] font-medium mb-4 md:mb-6">
            Don&apos;t just believe what they say, look at our customer reviews
          </h1>
          <h2 className="text-[#495057] text-[18px]">Listen and improve</h2>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {data.map((item, index) => (
            <div key={index} className="max-w-[392px] min-w-[340px] flex-1">
              <Card title={item.title} desc={item.desc} img={item.img} name={item.name} />
            </div>
          ))}
        </div>

        <div className="flex md:hidden flex-col gap-6">
          {data.map((item, index) => (
            <Card key={index} title={item?.title} desc={item?.desc} img={item?.img} name={item?.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seven;
