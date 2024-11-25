import React, { useState } from "react";

import toast from "react-hot-toast";
import { Button, Select } from "antd";
import { CustomInput } from "../components/CustomInput";
import InputError from "../components/InputError";
import CustomLabel from "../components/CustomLabel";

import { useForm, Controller } from "react-hook-form";
import CustomJoditEditor from "../components/CustomEditor";
import { schema } from "../modules/SendNoti/schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { getUserList } from "../services/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendNoti } from "../services/noti.api";

const SendNotiPage = () => {
  const [formFilter, setFormFilter] = useState({
    role: "",
    keyword: "",
    page: 1,
    pageSize: 1000,
  });

  const { data: users, isLoading } = useQuery(
    ["TEACHER", formFilter],
    () =>
      getUserList(
        formFilter.role,
        formFilter.keyword,
        formFilter.page,
        formFilter.pageSize
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    reset,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: mutateSendNotification, isLoading: isSending } = useMutation(
    (data) => sendNoti(data),
    {
      onSuccess: () => {
        toast.success("Thành công!");
        reset();
        setValue("content", "");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Có lỗi xảy ra khi gửi thông báo!"
        );
      },
    }
  );

  const onSubmit = (data) => {
    mutateSendNotification(data);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="text-lg font-semibold">Gửi thông báo</h1>
        <Button
          onClick={handleSubmit(onSubmit)}
          type="primary"
          loading={isSending}
        >
          Gửi thông báo
        </Button>
      </div>

      <div className="flex gap-6 flex-col">
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <CustomLabel label="Tiêu đề" required />
              <CustomInput
                className="!h-10  "
                placeholder="Nhập tiêu đề thông báo"
                onChange={onChange}
                value={value}
              />
              <InputError error={errors.title?.message} />
            </div>
          )}
        />

        <Controller
          name="recipientIds"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <CustomLabel label="Người nhận" required />
              <Select
                className="!h-10 w-full"
                placeholder="Chọn người nhận"
                onChange={onChange}
                value={value}
                options={users?.data?.map((item) => ({
                  value: item.id,
                  label: item.fullName,
                }))}
                allowClear
                mode="multiple"
              />
              <InputError error={errors.recipientIds?.message} />
            </div>
          )}
        />

        <div>
          <CustomLabel label="Nội dung" required />
          <CustomJoditEditor
            value={getValues("content")}
            onChange={(value) => {
              setValue("content", value);
            }}
          />
          <InputError error={errors.content?.message} />
        </div>
      </div>
    </div>
  );
};

export default SendNotiPage;
