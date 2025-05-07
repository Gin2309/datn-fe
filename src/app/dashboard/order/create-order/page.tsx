"use client";
import React from "react";
import CreateOrder from "@/modules/dashboard/Order/CreateOrder";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");
  const service = searchParams.get("service");

  return (
    <div>
      <CreateOrder oid={oid} service={service} />
    </div>
  );
};

export default Page;
