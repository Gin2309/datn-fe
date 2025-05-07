"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { Checkbox, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import vn from "@/assets/vn.svg";
import down from "@/assets/chevron-down.svg";
import eye from "@/assets/eye.svg";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import schema from "./schema";
import { Register } from "@/api/auth.service";
import Link from "next/link";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Signup = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: signupMutation, isLoading } = useMutation((data: any) => Register(data), {
    onSuccess() {
      message.success("Success!");
      router.push("/auth/login");
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = () => {
    if (!isChecked) {
      message.warning("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    const data = getValues();
    signupMutation(data);
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-8 sm:w-auto 2xs:w-[390px] pb-12 pt-12 md:pt-[64px] px-4">
        <div className="text-center">
          <h1 className="text-[#212529] font-medium sm:text-[24px] md:text-[36px] mb-6">Signup</h1>
          <h2 className="text-[#6c757d] ">Create a new account</h2>
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Name" />
                <CustomInput
                  className="!h-12 w-[390px] bg-[#FBFBFB]"
                  placeholder="Enter your name"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.name?.message} />
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Email" />
                <CustomInput
                  className="!h-12 !w-[390px] bg-[#FBFBFB]"
                  placeholder="Enter your email"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.email?.message} />
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Phone number" />
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  placeholder="Phone number"
                  countrySelectProps={{ unicodeFlags: true }}
                />
                <InputError error={errors.phone?.message} />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Password" />
                <CustomInput
                  placeholder="Password"
                  type={isPassword ? "password" : "text"}
                  className="!h-12 w-[390px] bg-[#FBFBFB]"
                  suffixIcon={
                    <Image src={eye} alt="icon" onClick={() => setIsPassword(!isPassword)} className="cursor-pointer" />
                  }
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.password?.message} />
              </div>
            )}
          />
        </div>

        <div className="flex gap-2 items-start font-medium">
          <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <div className="text-[#343A40] text-[14px]">
            Creating an account means you’re okay with our 
            <span className="text-primary underline text-[14px]">Terms of Service</span> and 
            <span className="text-primary underline text-[14px]">Privacy Policy</span>.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="btn-primary h-12 w-full flex items-center justify-center !font-medium"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} /> : <>Create account</>}
          </div>
        </div>

        <div className="text-center text-[#495057] text-[14px]">
          Already registered?{" "}
          <Link href="/auth/login" className="text-primary font-medium text-[14px]">
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
