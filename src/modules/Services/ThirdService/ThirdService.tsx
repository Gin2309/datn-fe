import React from "react";
import First from "./First";
import Second from "./Second/Second";
import Third from "./Third/Third";
import Four from "./Four/Four";
import Five from "./Five";
import Bottom from "../FirstService/Six/Six";

const ThirdService = () => {
  return (
    <div>
      <First />
      <Second />
      <Third />
      <Four />
      <Five />
      <Bottom />
    </div>
  );
};

export default ThirdService;
