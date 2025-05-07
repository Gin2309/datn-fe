"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { message } from "antd";
import { CustomInput } from "@/components/CustomInput";
import { schema } from "./schema";
import PasswordModal from "./PasswordModal";

import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/state";

import blog from "@/assets/blog.png";
import avatar from "@/assets/Avatar.svg";
import mail from "@/assets/mail2.svg";
import camera from "@/assets/camera.svg";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import InputError from "@/components/InputError";
import { updateProfile, uploadFile } from "@/api/auth.service";

const Profile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const ProfileData = profile?.data;
  const [image, setImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const {
    getValues,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: ProfileData?.name || "",
      avatar: ProfileData?.avatar || "",
      email: ProfileData?.email || "",
      phone: ProfileData?.phone || "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: ProfileData?.name || "",
        avatar: ProfileData?.avatar || "",
        email: ProfileData?.email || "",
        phone: ProfileData?.phone || "",
      });

      setImage(ProfileData?.avatar);
    }
  }, [profile, reset]);

  const { mutate: updateMution, isLoading: isUpdating } = useMutation((data: any) => updateProfile(data), {
    onSuccess: (data:any) => {
      message.success("Sucess!");
        setProfile({
          ...profile,
          data: {
            ...profile.data,
            ...data.data
          } 
        });
    },
    onError(err: any) {
      message.error(err.response?.data?.message);
    },
  });

  const { mutate: uploadMutation, isLoading: isUploading } = useMutation((file: File) => uploadFile(file), {
    onSuccess: (data:any) => {
      setImage(data.data);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }, 
    onError: (error: any) => {
      console.error("Error during upload:", error);
      message.error(error.response?.data?.message || "Error during upload try again.");
    },
  });

  const onHandleSubmit = () => {
    const data = getValues();
    const submitData = {
      ...data,
      avatar: image || "",
    };

    updateMution(submitData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    uploadMutation(selectedFile);
  };

  const handleCameraClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen mb-6">
      <div className="w-full overflow-hidden h-[200px] md:h-[250px] -mt-3">
        <Image src={blog} alt="icon" className="w-full" />
      </div>

      <input
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />

      <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-8">
        <div className="flex items-center justify-between -mt-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image
                src={image ? image : avatar}
                alt="avatar"
                width={96}
                height={96}
                className="border-[4px] border-[#fff] w-[96px] h-[96px] md:h-[160px] md:w-[160px] object-cover object-center rounded-full shadow-sm"
              />
              <button
                onClick={handleCameraClick}
                disabled={isUploading}
                className="flex items-center cursor-pointer justify-center bg-white rounded-full h-8 w-8 md:h-12 md:w-12 shadow-sm absolute bottom-0 right-0"
              >
                <Image src={camera} alt="cam" className="w-4 h-4 " />
              </button>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-[#101828] font-semibold text-[24px]">{ProfileData?.name}</h1>
              <h2 className="text-[#6C757D]">{ProfileData?.email}</h2>
            </div>
          </div>

          <div className="hidden lg:flex justify-end gap-2">
            <div onClick={() => setOpen(true)} className="btn-tertiary font-medium h-9">
              Change password
            </div>
            <div onClick={handleSubmit(onHandleSubmit)} className="btn-primary h-9">
              Save Changes
            </div>
          </div>
        </div>

        <div className="block lg:hidden">
          <div className="mb-5">
            <h1 className="text-[#101828] font-semibold text-[24px] mb-1">{ProfileData?.name}</h1>
            <h2 className="text-[#6C757D]">{ProfileData?.email}</h2>
          </div>

          <div className="flex gap-3">
            <div onClick={handleSubmit(onHandleSubmit)} className="btn-primary h-9">
              Save Changes
            </div>
            <div onClick={() => setOpen(true)} className="btn-tertiary font-medium h-9">
              Change password
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div>
            <h1 className="text-[#212529] font-medium text-[14px]">Personal info</h1>
            <h2 className="text-[#6C757D] text-[14px]">Update your photo and personal details</h2>
          </div>
          <div className="col-span-1 lg:col-span-2 p-4 md:p-6 gap-4 md:gap-6 rounded-lg bg-[#fff] flex flex-col shadow-sm">
            <div className=" grid grid-cols-2 gap-4 md:gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="col-span-1">
                    <div className="text-[#495057] font-medium text-[14px]">Your name</div>
                    <CustomInput
                      className="!h-12 bg-[#FBFBFB]"
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
                  <div className="col-span-2 md:col-span-1">
                    <div className="text-[#495057] font-medium text-[14px]">Email</div>
                    <CustomInput
                      className="!h-12 bg-[#FBFBFB]"
                      placeholder="Enter your email"
                      onChange={onChange}
                      value={value}
                      prefixIcon={<Image src={mail} alt="" />}
                    />
                    <InputError error={errors.email?.message} />
                  </div>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="col-span-2 md:col-span-1">
                    <div className="text-[#495057] font-medium text-[14px]">Phone number</div>
                    <CustomInput
                      className="!h-12 bg-[#FBFBFB]"
                      placeholder="Enter your phone"
                      onChange={onChange}
                      value={value}
                    />
                    <InputError error={errors.phone?.message} />
                  </div>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <div className="btn-tertiary font-medium">Cancel</div>
              <div onClick={handleSubmit(onHandleSubmit)} className="btn-primary">
                Save Changes
              </div>
            </div>
          </div>
        </div>
      </div>

      <PasswordModal isOpen={open} onCancel={() => setOpen(false)} />
    </div>
  );
};

export default Profile;
