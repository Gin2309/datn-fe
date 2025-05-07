"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/modules/Home/Layout/Header";
import Footer from "@/modules/Home/Layout/Footer";
import { InitGlobalData } from "@/modules/Home/Layout/InitGlobalData";
import { RecoilRoot } from "recoil";

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

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <div className="overflow-hidden">
            <Header />
            <div className="bg-[#fff]">{children}</div>
            <InitGlobalData />
            <Footer />
          </div>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
