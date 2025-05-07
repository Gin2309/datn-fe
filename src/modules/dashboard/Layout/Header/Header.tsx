"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generateOrderId } from "@/api/order.service";

import DrawerContent from "./DrawerContent";
import StyledDrawer from "./styled";

import avatar from "@/assets/Avatar.svg";
import smallLogo from "@/assets/small-logo.svg";
import add from "@/assets/pinkPlus.svg";
import menu from "@/assets/mobileMenu.svg";
import { useRecoilValue } from "recoil";
import { profileState } from "@/recoil/state";

const Header = ({ activePage, isOpen }: { activePage: any; isOpen: boolean }) => {
  const router = useRouter();
  const profile = useRecoilValue(profileState);
  const profileAvatar = profile?.data?.avatar;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth > 768;
      if (isSmall) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { mutate: genOIDMutation, isLoading: isGenering } = useMutation(["OID"], () => generateOrderId(), {
    onSuccess: (data: any) => {
      const oid = data?.id;
      if (oid) {
        router.push(`/dashboard/order/create-order?oid=${oid}`);
      }
    },
    onError: (error) => {
      console.error("Failed to generate order ID:", error);
    },
  });

  const handleNewOrder = () => {
    genOIDMutation();
  };

  return (
    <>
      <div className="bg-[#212529] h-[64px] w-full flex items-center justify-between pl-2 pr-4 relative z-10">
        <div className="flex gap-2 items-center">
          <div onClick={() => setOpen(true)} className="h-12 w-12 flex items-center justify-center cursor-pointer">
            <Image src={menu} alt="menu" />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src={smallLogo} alt="logo" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div onClick={handleNewOrder} className="cursor-pointer">
            <Image src={add} alt="new order" />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/dashboard/profile")}>
            <Image
              src={profileAvatar ? profileAvatar : avatar}
              alt="avatar"
              height={48}
              width={48}
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>
      </div>

      <StyledDrawer
        placement="left"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        width="362px"
        zIndex={11}
      >
        <DrawerContent activePage={activePage} onClose={() => setOpen(false)} />
      </StyledDrawer>
    </>
  );
};

export default Header;
