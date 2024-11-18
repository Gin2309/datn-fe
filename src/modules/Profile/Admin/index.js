import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { Box } from "@mui/material";
import { Button, Select } from "antd";
import CustomLabel from "../../../components/CustomLabel";
import { CustomInput } from "../../../components/CustomInput";
import InputError from "../../../components/InputError";
import CustomDatePicker from "../../../components/CustomDatePicker";

import { schema } from "./schema";
import { getDetailsUser, updateUser } from "../../../services/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Giáo viên" },
  { value: "student", label: "Học sinh" },
];

const Admin = ({ id }) => {
  const { data, refetch } = useQuery(["DETAIL", id], () => getDetailsUser(id), {
    enabled: !!id,
  });

  const userData = data?.data;

  const {
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: userData?.fullName || "",
      username: userData?.username || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      birthDate: userData?.birthDate || null,
      role: userData?.role || null,
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData?.fullName,
        username: userData?.username,
        email: userData?.email,
        phone: userData?.phone,
        birthDate: userData?.birthDate,
        role: userData?.role,
      });
    }
  }, [userData]);

  const { mutate: updateMuation, isLoading } = useMutation(
    (data) => updateUser(id, data),
    {
      onSuccess: async () => {
        refetch();
        toast.success("Thành công");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  const onSubmit = (data) => {
    updateMuation(data);
  };

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h1 className="text-lg font-semibold">Thông tin cá nhân</h1>

        <Button
          type="primary"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
        >
          Lưu
        </Button>
      </Box>

      <div className="card">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Tên đăng nhập" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập tên đăng nhập"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.username?.message} />
              </div>
            )}
          />

          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Họ và tên" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập họ và tên"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.fullName?.message} />
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Email" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập email"
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
                <CustomLabel label="Số điện thoại" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập số điện thoại"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.phone?.message} />
              </div>
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <CustomLabel label="Ngày sinh" required />
                  <CustomDatePicker
                    onChange={onChange}
                    picker="date"
                    value={value}
                    className="h-10 w-full"
                    placeholder="Chọn ngày sinh"
                  />
                  <InputError error={errors.birthDate?.message} />
                </div>
              );
            }}
          />

          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Vai trò" required />
                <Select
                  className="!h-10   w-full"
                  placeholder="Chọn vai trò"
                  onChange={onChange}
                  value={value}
                  options={roleOptions}
                  disabled
                />
                <InputError error={errors.role?.message} />
              </div>
            )}
          />
        </div>
      </div>
    </Box>
  );
};

export default Admin;
