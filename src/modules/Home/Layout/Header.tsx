"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps, Drawer } from "antd";
import DrawerContent from "./Drawer/DrawerContent";
import MenuContent from "./Drawer/MenuContent";

import userIcon from "@/assets/user.svg";
import logo from "@/assets/Logo.svg";
import grayUser from "@/assets/grayUser.svg";
import menu from "@/assets/menu.svg";
import avatar from "@/assets/Avatar.svg";
import down from "@/assets/chevron-down.svg";
import close from "@/assets/x.svg";

import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/state";
import { clearToken, getToken, setRefreshToken, setToken } from "@/helper/storage";
import { destroyCookie } from "nookies";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [profile, setProfile] = useRecoilState(profileState);
  const [activePage, setActivePage] = useState("");
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const profileAvatar = profile?.data?.avatar;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpenMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    clearToken();
    setToken("");
    setRefreshToken("");
    setProfile(null);
    destroyCookie(null, "ACCESS_TOKEN", { path: "/" });
    setTimeout(() => {
      window.location.replace("/");
      setActivePage("/");
    }, 500);
  };

  useEffect(() => {
    const token = getToken();

    if (token === "") {
      setProfile(null);
    }

    const handleError = (error: any) => {
      const { statusCode } = error.response?.data || {};

      if (statusCode === 401 || statusCode === 403) {
        setProfile(null);
      }
    };
  }, [profile]);

  useEffect(() => {
    const determineActivePage = () => {
      const staticPaths = ["/blog", "/mobile", "/contact", "/services", "/"];

      if (staticPaths.includes(pathName)) {
        setActivePage(pathName);
      } else if (pathName.startsWith("/services/")) {
        setActivePage("/services");
      } else {
        setActivePage("");
      }
    };

    determineActivePage();
  }, [pathName]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/dashboard">
          <div className="btn-primary h-[40px] w-[140px]">Dashboard</div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <div className="p-2 flex  gap-2 items-center mx-auto" onClick={logout}>
          <div className=" text-secondary font-medium">Logout</div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="header h-[80px] bg-[#fff] px-6 py-4 items-center justify-between flex shadow-sm relative z-[8] md:z-10">
        <Link href={"/"}>
          <Image src={logo} alt="logo" height={32} width={178} layout="intrinsic" className="!h-7 !md:h-8 w-auto" />
        </Link>

        <div className="hidden md:block">
          <ul className="flex gap-6">
            <Link
              href="/"
              className={`${activePage === "/" ? "text-primary" : "text-secondary"} cursor-pointer hover:opacity-80`}
            >
              Home
            </Link>
            <li className="flex gap-1 items-center">
              <Link
                href="/services"
                className={`${
                  activePage === "/services" ? "text-primary" : "text-secondary"
                } cursor-pointer hover:opacity-80`}
              >
                Services
              </Link>
              <div onClick={() => setOpen(!open)}>
                <Image src={down} alt="" className="cursor-pointer" />
              </div>
            </li>
            <Link
              href="/blog"
              className={`${
                activePage === "/blog" ? "text-primary" : "text-secondary"
              } cursor-pointer hover:opacity-80`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`${
                activePage === "/contact" ? "text-primary" : "text-secondary"
              } cursor-pointer hover:opacity-80`}
            >
              Contact
            </Link>
          </ul>
        </div>

        {profile ? (
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" arrow>
            <div className="sm:hidden md:flex items-center gap-2 cursor-pointer">
              <Image
                src={profileAvatar ? profileAvatar : avatar}
                alt="avatar"
                height={48}
                width={48}
                className="h-12 w-12 rounded-full"
              />
              <h1 className="text-primary font-medium text-[18px]">{profile?.data?.name}</h1>
            </div>
          </Dropdown>
        ) : (
          <div className="btn-primary h-[48px] w-[124px] sm:hidden md:flex" onClick={() => router.push("/auth/login")}>
            <div>
              <Image src={userIcon} alt="icon" className="mr-2" />
            </div>{" "}
            Login
          </div>
        )}

        <div className="flex md:hidden gap-2 items-center">
          {profile ? (
            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" arrow>
              <div className="md:hidden flex items-center gap-2 h-[48px] w-[48px] justify-center cursor-pointer">
                <Image
                  src={profileAvatar ? profileAvatar : avatar}
                  alt="avatar"
                  height={48}
                  width={48}
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </Dropdown>
          ) : (
            <div
              className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              <Image src={grayUser} alt="icon" />
            </div>
          )}

          <div
            onClick={() => setOpenMenu(true)}
            className="h-[48px] w-[48px] border-[1px] border-gray-200 flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer"
          >
            <Image src={menu} alt="icon" />
          </div>
        </div>
      </div>

      <Drawer
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        key="top"
        mask={true}
        zIndex={9}
        className="header-drawer mt-[80px] shadow-md"
      >
        <DrawerContent onClose={() => setOpen(false)} />
      </Drawer>

      <Drawer
        placement="right"
        closable={false}
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        key="right"
        mask={true}
        className="menu-drawer"
        style={{ padding: 0 }}
        zIndex={9}
      >
        <div className="flex justify-end px-4 py-2">
          <div
            className="bg-[#FBFBFB] h-12 w-12 border-[1px] border-[#f4f4f4] items-center justify-center flex rounded-lg cursor-pointer"
            onClick={() => setOpenMenu(false)}
          >
            <Image src={close} alt="" />
          </div>
        </div>
        <MenuContent activePage={activePage} onClose={() => setOpenMenu(false)} />
      </Drawer>
    </>
  );
};

export default Header;
