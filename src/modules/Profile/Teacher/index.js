import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { Box } from "@mui/material";
import { Button, Select } from "antd";
import CustomLabel from "../../../components/CustomLabel";
import { CustomInput } from "../../../components/CustomInput";
import InputError from "../../../components/InputError";
import CustomDatePicker from "../../../components/CustomDatePicker";

import { List, Typography } from "antd";
import { getTeacher, updateTeacher } from "../../../services/teacher.api";
import { schema } from "./schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Giáo viên" },
  { value: "student", label: "Học sinh" },
];

const Teacher = ({ id }) => {
  const { data, isLoading, refetch } = useQuery(
    ["DETAIL"],
    () => getTeacher(id),
    {
      enabled: !!id,
      onSuccess: (response) => {
        const { subject, classes } = response.data;

        const subjectId = subject.id;
        const classIds = classes.map((cls) => cls.id);

        sessionStorage.setItem("subjectId", subjectId);
        sessionStorage.setItem("classIds", JSON.stringify(classIds));
      },
    }
  );

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
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        email: userData?.email,
        phone: userData?.phone,
      });
    }
  }, [userData]);

  const { mutate: updateMuation, isLoading: isUpdate } = useMutation(
    (data) => updateTeacher(data),
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

  const onSubmit = () => {
    const data = getValues();

    const submitData = {
      ...data,
      subjectId: userData.subject?.id,
    };

    updateMuation(submitData);
  };

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h1 className="text-lg font-semibold">{userData?.fullName}</h1>

        <Button
          type="primary"
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
        >
          Lưu
        </Button>
      </Box>

      <div className="card mb-6 shadow-md">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CustomLabel label="Tên đăng nhập" required />
            <CustomInput
              className="!h-10  "
              placeholder="Nhập tên đăng nhập"
              onChange={() => {}}
              value={userData?.username}
              disabled
            />
          </div>

          <div>
            <CustomLabel label="Họ và tên" required />
            <CustomInput
              className="!h-10  "
              placeholder="Nhập họ và tên"
              onChange={() => {}}
              value={userData?.fullName}
              disabled
            />
          </div>

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

          <div>
            <CustomLabel label="Ngày sinh" required />
            <CustomDatePicker
              onChange={() => {}}
              picker="date"
              value={userData?.birthDate}
              className="h-10 w-full"
              placeholder="Chọn ngày sinh"
              disabled
            />
          </div>

          <div>
            <CustomLabel label="Vai trò" required />
            <Select
              className="!h-10   w-full"
              placeholder="Chọn vai trò"
              onChange={() => {}}
              value={userData?.role}
              options={roleOptions}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="card shadow-md">
        <Typography.Title level={4}>Danh sách lớp học</Typography.Title>
        <div className="-mt-8">
          <List
            dataSource={userData?.classes}
            renderItem={(cls) => (
              <List.Item>
                Môn {userData.subject?.name} : {cls.name}
              </List.Item>
            )}
          />
        </div>
      </div>
    </Box>
  );
};

export default Teacher;
