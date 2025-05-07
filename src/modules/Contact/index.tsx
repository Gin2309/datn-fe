"use client";
import React from "react";
import Image from "next/image";

import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import { CustomTextarea } from "@/components/CustomInput";
import { message } from "antd";

import blog from "@/assets/blog.png";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import schema from "./schema";
import { sendMail } from "@/api/send-mail.service";

const Contact = () => {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: sendMailMutation, isLoading } = useMutation((data: any) => sendMail(data), {
    onSuccess(response: any) {
      message.success("Success!");
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = () => {
    const data = getValues();
    sendMailMutation(data);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 pb-6">
        <div className="hidden lg:block">
          <Image src={blog} alt="" className="object-cover object-center h-full w-full" />
        </div>
        <div className="flex justify-center py-12 md:py-[56px] lg:py-[64px]">
          <div>
            <div className="mb-9 md:mb-12">
              <h1 className="font-medium text-[24px] md:text-[30px] lg:text-[36px] mb-4">Contact us</h1>
              <h2 className="text-[#6C757D] text-[16px] md:text-[18px]">
                You can reach us anytime via{" "}
                <span className="text-primary text-[16px] md:text-[18px]">hi@vamedia.com</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <Controller
                name="fullname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Fullname" />
                    <CustomInput
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Your name"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.fullname?.message} />
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
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Enter your email"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.email?.message} />
                  </div>
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Phone number" />
                    <CustomInput
                      className="!h-12  bg-[#FBFBFB]"
                      placeholder="Enter phone number"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.phoneNumber?.message} />
                  </div>
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Label label="Message" />
                    <CustomTextarea
                      className="bg-[#FBFBFB]"
                      placeholder="Enter message"
                      onChange={onChange}
                      value={value}
                      rows={4}
                    />
                    <InputError error={errors.message?.message} />
                  </div>
                )}
              />
            </div>

            <div onClick={handleSubmit(onSubmit)} className="btn-primary h-12 w-[88px]">
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
