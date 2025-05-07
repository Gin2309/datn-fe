"use client";
import React from "react";
import { useParams } from "next/navigation";

import DetailBlog from "@/modules/Blog/Detail";

const Detai = () => {
  const { slug } = useParams();

  return <DetailBlog slug={slug} />;
};

export default Detai;
