import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Box } from "@mui/material";
import { Button, Select } from "antd";

import toast from "react-hot-toast";
import { CustomInput } from "../../../components/CustomInput";
import InputError from "../../../components/InputError";
import CustomLabel from "../../../components/CustomLabel";
import CustomDatePicker from "../../../components/CustomDatePicker";

import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  updateUser,
  createUser,
  getDetailsUser,
} from "../../../services/user.api";
import { getClassesList } from "../../../services/classes.api";
import { addClass } from "../../../services/teacher.api";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Giáo viên" },
  { value: "student", label: "Học sinh" },
];

const FormUsers = ({ mode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [formFilter, setFormFilter] = useState({ page: 1, pageSize: 999 });
  const [submitClass, setSubmitClass] = useState([]);

  const { data } = useQuery(["DETAIL", id], () => getDetailsUser(id), {
    enabled: !!id,
  });

  const { data: classes, isLoading: isLoadingClasses } = useQuery(
    ["CLASS", formFilter],
    () => getClassesList(formFilter.page, formFilter.pageSize),
    {
      refetchOnWindowFocus: false,
    }
  );

  const userData = data?.data;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    context: { mode },
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
    if (mode !== "add" && data && userData) {
      reset({
        fullName: userData?.fullName,
        username: userData?.username,
        email: userData?.email,
        phone: userData?.phone,
        birthDate: userData?.birthDate,
        role: userData?.role,
      });
    }
  }, [mode, userData]);

  const { mutate: addClassMutation, isLoading: isAdding } = useMutation(
    (data) => addClass(id, data),
    {
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      },
    }
  );

  const handleClassChange = (value) => {
    setSubmitClass(value);
  };

  const { mutate: mutateCreateUser, isLoading } = useMutation(
    (data) => (mode === "add" ? createUser(data) : updateUser(id, data)),
    {
      onSuccess: () => {
        reset();
        navigate("/admin/users", { replace: true });
        toast.success("Thành công");
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại."
        );
      },
    }
  );

  const onSubmit = (data) => {
    mutateCreateUser(data);

    const classIds = submitClass;

    addClassMutation({ classIds });
  };

  useEffect(() => {
    if (classes) {
      setSubmitClass(classes?.data?.map((item) => item.id));
    }
  }, [classes]);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h1 className="text-lg font-semibold">
          {mode === "add" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
        </h1>
        <div className="flex gap-2">
          <Button danger onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            {mode === "add" ? "Tạo" : "Lưu"}
          </Button>
        </div>
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
                />
                <InputError error={errors.role?.message} />
              </div>
            )}
          />

          {mode === "add" && (
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <CustomLabel label="Mật khẩu" required />
                  <CustomInput
                    className="!h-10  "
                    placeholder="Nhập mật khẩu"
                    onChange={onChange}
                    value={value}
                    type="password"
                  />
                  <InputError error={errors.password?.message} />
                </div>
              )}
            />
          )}

          {mode === "edit" && (
            <div>
              <CustomLabel label="Lớp giảng dạy" />
              <Select
                className="!h-10  w-full"
                placeholder="Thêm lớp học"
                onChange={handleClassChange}
                value={submitClass}
                options={classes?.data?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                allowClear
                mode="multiple"
              />
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default FormUsers;
