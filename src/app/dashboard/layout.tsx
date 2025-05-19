"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InitGlobalData } from "@/modules/Layout/InitGlobalData";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RecoilRoot } from "recoil";
import Header from "@/modules/Layout/Header";
import Footer from "@/modules/Layout/Footer";


export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
               <div className="overflow-hidden">
                <Header />
                <div className="bg-[#fff] pt-6">{children}</div>
                <InitGlobalData />
                <Footer />
              </div>
          </PayPalScriptProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
