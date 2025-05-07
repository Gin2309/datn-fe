"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InitGlobalData } from "@/modules/Home/Layout/InitGlobalData";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RecoilRoot } from "recoil";

import Sidebar from "@/modules/dashboard/Layout/Sidebar";
import Header from "@/modules/dashboard/Layout/Header/Header";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const [activePage, setActivePage] = useState("");

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    const determineActivePage = () => {
      const staticPaths = [
        "/dashboard",
        "/dashboard/order",
        "/dashboard/services",
        "/dashboard/profile",
        "/dashboard/support",
      ];

      if (staticPaths.includes(pathName)) {
        setActivePage(pathName);
      } else if (pathName.startsWith("/dashboard/order/")) {
        setActivePage("/dashboard/order");
      } else {
        setActivePage("");
      }
    };

    determineActivePage();
  }, [pathName]);

  const [collapsed, setCollapsed] = useState(false);

  const breakPoint = 1100;

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < breakPoint;
      setCollapsed(isSmall);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: "USD",
    intent: "capture",
  };

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <PayPalScriptProvider options={initialOptions}>
            <div className="overflow-hidden bg-[#212529] mx-auto min-h-screen w-full">
              <div className="flex">
                <div
                  className={`sidebar transition-width duration-300 h-full fixed left-0 z-10 bg-[#212529] ${
                    collapsed ? "w-[82px]" : "w-[280px]"
                  } hidden md:block`}
                >
                  <Sidebar isOpen={!collapsed} activePage={activePage} />
                </div>

                <div className={`flex grow flex-col ml-0 ${collapsed ? "md:ml-[82px]" : "ml-[280px]"}`}>
                  <div className="block md:hidden">
                    <Header activePage={activePage} isOpen={!collapsed} />
                  </div>
                  <div className="bg-[#fbfbfb] mt-0 md:mt-3 pt-0 md:pt-3 rounded-tl-none  md:rounded-tl-[24px] overflow-hidden">
                    {children}
                  </div>
                </div>
              </div>
              <InitGlobalData />
            </div>
          </PayPalScriptProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
