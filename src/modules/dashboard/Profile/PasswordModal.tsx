"use client";
import React, { useState } from "react";
import Image from "next/image";

import { message, Modal } from "antd";
import Label from "@/components/CustomLabel";
import { CustomInput } from "@/components/CustomInput";
import InputError from "@/components/InputError";
import { passwordSchema } from "./schema";

import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { CustomButton } from "@/components/CustomButton";

import eye from "@/assets/eye.svg";

const PasswordModal = ({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) => {
  const [isPassword, setIsPassword] = useState(true);
  const [isPassword2, setIsPassword2] = useState(true);
  const [isPassword3, setIsPassword3] = useState(true);

  const {
    getValues,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const { mutate: changePasswordMutation, isLoading } = useMutation((data: any) => changePassword(data), {
    onSuccess: () => {
      message.success("Sucess!");
      reset();
      handleCancel();
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const onChangePassword = (data: any) => {
    changePasswordMutation(data);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<div className="text-2xl text-primary font-medium">Change Password</div>}
      centered
      width={700}
      footer={
        <div className="flex justify-end w-[100%] gap-[12px]">
          <CustomButton outline={true} className="!h-11 !w-[120px]" onClick={handleCancel}>
            Cancel
          </CustomButton>
          <CustomButton
            isLoading={isLoading}
            type="primary"
            className="!h-11 !w-[120px]"
            onClick={handleSubmit(onChangePassword)}
          >
            Change Password
          </CustomButton>
        </div>
      }
    >
      <div>
        <div className="w-full grid grid-cols-1 gap-4 py-6">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Password" />
                <CustomInput
                  placeholder="Enter your password"
                  type={isPassword ? "password" : "text"}
                  className="!h-12 w-full bg-[#FBFBFB]"
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

          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="New Password" />
                <CustomInput
                  placeholder="Enter your new password"
                  type={isPassword2 ? "password" : "text"}
                  className="!h-12 w-full bg-[#FBFBFB]"
                  suffixIcon={
                    <Image
                      src={eye}
                      alt="icon"
                      onClick={() => setIsPassword2(!isPassword2)}
                      className="cursor-pointer"
                    />
                  }
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.newPassword?.message} />
              </div>
            )}
          />

          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Label label="Confirm New Password" />
                <CustomInput
                  placeholder="Confirm new password"
                  type={isPassword3 ? "password" : "text"}
                  className="!h-12 w-full bg-[#FBFBFB]"
                  suffixIcon={
                    <Image
                      src={eye}
                      alt="icon"
                      onClick={() => setIsPassword3(!isPassword3)}
                      className="cursor-pointer"
                    />
                  }
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.confirmNewPassword?.message} />
              </div>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
