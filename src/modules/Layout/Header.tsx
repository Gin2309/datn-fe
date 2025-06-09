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
      key: "2",
      label: (
        <Link href="/dashboard/order">
          <div className="px-4 py-1 hover:bg-gray-50 transition-colors">
            <div className="text-secondary font-medium flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.05078 2.05078H4.05078L6.71078 14.4708C6.80836 14.9256 7.06145 15.3323 7.42649 15.6206C7.79153 15.909 8.24569 16.0611 8.71078 16.0508H18.4908C18.946 16.05 19.3873 15.8941 19.7418 15.6086C20.0964 15.3232 20.3429 14.9253 20.4408 14.4808L22.0908 7.05078H5.12078M9.00073 21.001C9.00073 21.5533 8.55302 22.001 8.00073 22.001C7.44845 22.001 7.00073 21.5533 7.00073 21.001C7.00073 20.4487 7.44845 20.001 8.00073 20.001C8.55302 20.001 9.00073 20.4487 9.00073 21.001ZM20.0007 21.001C20.0007 21.5533 19.553 22.001 19.0007 22.001C18.4484 22.001 18.0007 21.5533 18.0007 21.001C18.0007 20.4487 18.4484 20.001 19.0007 20.001C19.553 20.001 20.0007 20.4487 20.0007 21.001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              My Orders
            </div>
          </div>
        </Link>
      ),
    },
    {
      type: "divider",
      style: { margin: "4px 0", borderColor: "#E9ECEF" }
    },
    {
      key: "3",
      label: (
        <Link href="/dashboard/profile">
          <div className="px-4 py-1 hover:bg-gray-50 transition-colors">
            <div className="text-secondary font-medium flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Profile
            </div>
          </div>
        </Link>
      ),
    },
    {
      type: "divider",
      style: { margin: "8px 0", borderColor: "#E9ECEF" }
    },
    {
      key: "4",
      label: (
        <div className="px-4 py-1 cursor-pointer" onClick={logout}>
          <div className="text-secondary font-medium flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 16L21 12M21 12L17 8M21 12H9M9 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </div>
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
