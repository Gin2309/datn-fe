import React, { useEffect } from "react";
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
  updateClasses,
  createClasses,
  getDetailClasses,
} from "../../../services/classes.api";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Giáo viên" },
  { value: "student", label: "Học sinh" },
];

const FormClasses = ({ mode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const { data } = useQuery(["DETAIL", id], () => getDetailClasses(id), {
    enabled: !!id,
  });

  const detail = data?.data;

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
      name: detail?.name || "",
    },
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      reset({
        name: detail?.name,
      });
    }
  }, [mode, detail]);

  const { mutate: mutationAction, isLoading } = useMutation(
    (data) => (mode === "add" ? createClasses(data) : updateClasses(id, data)),
    {
      onSuccess: async () => {
        reset();
        navigate("/admin/classes", { replace: true });
        toast.success("Thành công");
      },
    }
  );

  const onSubmit = (data) => {
    mutationAction(data);
  };

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
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Tên lớp học" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập tên lớp học"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.name?.message} />
              </div>
            )}
          />
        </div>
      </div>
    </Box>
  );
};

export default FormClasses;
