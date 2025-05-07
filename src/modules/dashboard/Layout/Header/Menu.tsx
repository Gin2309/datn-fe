"use client";
import React from "react";
import Link from "next/link";

const Menu = ({ activePage, onClose }: { activePage: string; onClose: () => void }) => {
  const handleLinkClick = () => {
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <Link
          href={"/dashboard"}
          onClick={handleLinkClick}
          className={`${
            activePage === "/dashboard" ? "text-primary bg-[#FFFFFF1A]" : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke={activePage === "/dashboard" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">Home</h1>
        </Link>

        <Link
          href={"/dashboard/order"}
          onClick={handleLinkClick}
          className={`${
            activePage === "/dashboard/order"
              ? "text-primary bg-[#FFFFFF1A]"
              : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.05078 2.05078H4.05078L6.71078 14.4708C6.80836 14.9256 7.06145 15.3323 7.42649 15.6206C7.79153 15.909 8.24569 16.0611 8.71078 16.0508H18.4908C18.946 16.05 19.3873 15.8941 19.7418 15.6086C20.0964 15.3232 20.3429 14.9253 20.4408 14.4808L22.0908 7.05078H5.12078M9.00073 21.001C9.00073 21.5533 8.55302 22.001 8.00073 22.001C7.44845 22.001 7.00073 21.5533 7.00073 21.001C7.00073 20.4487 7.44845 20.001 8.00073 20.001C8.55302 20.001 9.00073 20.4487 9.00073 21.001ZM20.0007 21.001C20.0007 21.5533 19.553 22.001 19.0007 22.001C18.4484 22.001 18.0007 21.5533 18.0007 21.001C18.0007 20.4487 18.4484 20.001 19.0007 20.001C19.553 20.001 20.0007 20.4487 20.0007 21.001Z"
              stroke={activePage === "/dashboard/order" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">My Order</h1>
        </Link>

        <Link
          href={"/dashboard/services"}
          onClick={handleLinkClick}
          className={`${
            activePage === "/dashboard/services"
              ? "text-primary bg-[#FFFFFF1A]"
              : "text-[#CED4DA] bg-none hover:text-primary"
          } flex p-3 gap-3 rounded-xl`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
              stroke={activePage === "/dashboard/services" ? "#FF004D" : "#CED4DA"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-[16px]">All Services</h1>
        </Link>
      </div>

      <Link
        href={"/dashboard/support"}
        onClick={handleLinkClick}
        className={`${
          activePage === "/dashboard/support"
            ? "text-primary bg-[#FFFFFF1A]"
            : "text-[#CED4DA] bg-none hover:text-primary"
        } flex p-3 gap-3 rounded-xl`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 11H6C6.53043 11 7.03914 11.2107 7.41421 11.5858C7.78929 11.9609 8 12.4696 8 13V16C8 16.5304 7.78929 17.0391 7.41421 17.4142C7.03914 17.7893 6.53043 18 6 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V11ZM3 11C3 9.8181 3.23279 8.64778 3.68508 7.55585C4.13738 6.46392 4.80031 5.47177 5.63604 4.63604C6.47177 3.80031 7.46392 3.13738 8.55585 2.68508C9.64778 2.23279 10.8181 2 12 2C13.1819 2 14.3522 2.23279 15.4442 2.68508C16.5361 3.13738 17.5282 3.80031 18.364 4.63604C19.1997 5.47177 19.8626 6.46392 20.3149 7.55585C20.7672 8.64778 21 9.8181 21 11M21 11V16M21 11H18C17.4696 11 16.9609 11.2107 16.5858 11.5858C16.2107 11.9609 16 12.4696 16 13V16C16 16.5304 16.2107 17.0391 16.5858 17.4142C16.9609 17.7893 17.4696 18 18 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16M21 16V18C21 19.0609 20.5786 20.0783 19.8284 20.8284C19.0783 21.5786 18.0609 22 17 22H7C5.93913 22 4.92172 21.5786 4.17157 20.8284C3.42143 20.0783 3 19.0609 3 18V16"
            stroke={activePage === "/dashboard/support" ? "#FF004D" : "#CED4DA"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-[16px]">Support</h1>
      </Link>
    </div>
  );
};

export default Menu;
