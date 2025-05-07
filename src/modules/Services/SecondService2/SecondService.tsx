import React from "react";
import First from "./First/First";
import Second from "./Second/Second";
import Third from "./Third/Third";
import Four from "./Four/Four";
import Five from "./Five/Five";
import Six from "./Six/Six";
import Bottom from "../FirstService/Six/Six";
import CompareImg from "@/components/Compare";

const SecondService = () => {
  return (
    <>
      <div>
        <First />

        <div className="p-4 md:p-6 rounded-2xl relative max-w-[1540px] mx-0 xl:mx-auto">
          <CompareImg />

          <div
            className={`px-3 py-1 absolute left-8 bottom-8 md:left-10 md:bottom-10 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] `}
          >
            Before
          </div>

          <div
            className={`px-3 py-1 absolute right-10 bottom-10 md:right-10 md:bottom-10 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]`}
          >
            After
          </div>
        </div>

        <Second />
        <Third />
        <Four />
        <Five />
        <Six />
        <Bottom />
      </div>
    </>
  );
};

export default SecondService;
