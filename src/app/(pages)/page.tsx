"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import First from "@/modules/Home/First";
import Second from "@/modules/Home/Second";
import Third from "@/modules/Home/Third";
import Four from "@/modules/Home/Four";
import Five from "@/modules/Home/Five";
import Six from "@/modules/Home/Six";
import Seven from "@/modules/Home/Seven";
import Eight from "@/modules/Home/Eight";

export default function Home() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1100,
  //     easing: "ease",
  //     once: true,
  //   });
  // }, []);

  return (
    <>
      <First />
      <Second />
      <Third />
      <Four />
      <Five />
      <Six />
      <Seven />
      <Eight />
    </>
  );
}
