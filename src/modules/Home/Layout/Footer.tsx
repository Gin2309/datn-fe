import React from "react";
import Image from "next/image";
import { Input } from "antd";
import Link from "next/link";

import logo from "@/assets/darklogo.svg";
import mail from "@/assets/mail.svg";

const Footer = () => {
  return (
    <>
      {/* màn md, lg */}
      <div className="m-4 md:m-6 bg-[#343a40] rounded-[16px] pt-12 md:pt-[64px] pb-9 md:pb-12 sm:px-8 md:px-12 xl:px-[64px]">
        <div className="flex flex-col md:flex-row flex-wrap justify-between mb-12 gap-12 md:gap-0">
          <div>
            <Image src={logo} alt="logo" />

            <h1 className="text-gray-300 mt-8">Make your ideal space idea a reality.</h1>

            <div className="mt-8 hidden md:flex lg:hidden flex-col">
              <h1 className="text-white font-semibold mb-4">NEWSLETTER</h1>
              <div className="flex gap-2">
                <div>
                  <Input
                    placeholder="Enter your mail"
                    className="h-12 sm:w-auto md:w-[224px] px-4 py-3 placeholder-[#ADB5BD]"
                    prefix={<Image src={mail} alt="icon" className="mr-1" />}
                  />
                </div>

                <div className="btn-primary h-12 w-[128px] !font-medium">Subscribe</div>
              </div>
            </div>
          </div>

          <div className="flex gap-8 lg:gap-4 xl:gap-8">
            <ul className="flex flex-col gap-4 text-[#ced4da]">
              <h1 className="text-white font-semibold">VA MEDIA</h1>
              <Link href="/">Home</Link>
              <li>VA Media</li>
              <Link href="/services">Services</Link>
              <Link href="/blog">Blog</Link>
              <Link href="contact">Contact</Link>
            </ul>
            <ul></ul>

            <ul className="flex flex-col gap-4 text-[#ced4da]">
              <h1 className="text-white font-semibold">ACCOUNT</h1>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Sign up</Link>
            </ul>
          </div>

          <div className="flex md:hidden lg:flex flex-col">
            <h1 className="text-white font-semibold mb-4">NEWSLETTER</h1>
            <div className="flex gap-2">
              <div>
                <Input
                  placeholder="Enter your mail"
                  className="h-12 sm:w-auto md:w-[224px] px-4 py-3 placeholder-[#ADB5BD]"
                  prefix={<Image src={mail} alt="icon" className="mr-1" />}
                />
              </div>

              <div className="btn-primary h-12 w-[128px] !font-medium">Subscribe</div>
            </div>
          </div>
        </div>

        <div className="border-t-[1px] border-[#495057] flex flex-col md:flex-row gap-4 justify-between pt-4 md:pt-8">
          <div className="text-[#dee2e6]">© 2024 VA Media. All rights reserved.</div>
          <div className="text-[#dee2e6] flex gap-4">
            <h1>Terms</h1>
            <h1>Privacy</h1>
            <h1>Cookies</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
