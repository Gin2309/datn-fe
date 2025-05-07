"use client";
import React from "react";
import { CustomModal } from ".";

import { message } from "antd";
import { CustomTextarea } from "../CustomInput";
import { CustomButton } from "../CustomButton";
import Label from "../CustomLabel";

import { useMutation, useQuery } from "@tanstack/react-query";
import { sendFeedBack } from "@/api/send-mail.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import schema from "./schema";
import InputError from "../InputError";
import { getOrderDetail, updateOrder } from "@/api/order.service";

const SendFeedBack = ({
  isOpen,
  onCancel,
  oid,
  refetch,
}: {
  isOpen: boolean;
  onCancel: () => void;
  oid: any;
  refetch: any;
}) => {
  const {
    getValues,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleCancel = () => {
    onCancel();
    reset();
  };

  const { data } = useQuery(["ORDER", oid, isOpen], () => getOrderDetail(oid), {
    enabled: Boolean(oid && isOpen),
  });

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation((data: any) => updateOrder(data, oid), {
    onSuccess: () => {
      message.success("Success!");
      onCancel();
      refetch();
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const handleUpdate = () => {
    const submitData = {
      ...data?.data,
      status: "REWORK",
    };
    updateMutation(submitData);
  };

  const { mutate: sendMutation, isLoading } = useMutation((data: any) => sendFeedBack(data), {
    onSuccess: () => {
      handleUpdate();
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const onSubmit = (data: any) => {
    if (!oid) {
      message.warning("Order ID is missing! Submission is not allowed.");
      return;
    }

    const submitedData = {
      ...data,
      orderId: oid,
    };

    sendMutation(submitedData);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCancel}
      onSubmit={handleSubmit(onSubmit)}
      title={`Feedback For Order #${oid}`}
      customFooter
      width={800}
    >
      <div>
        <div className="mb-6">
          <div>
            <Controller
              name="content"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Label label="Feedback" required className="text-[16px]" />
                  <CustomTextarea
                    className={`suffix-icon h-11 !rounded`}
                    placeholder="Enter your feedback"
                    onChange={onChange}
                    value={value}
                  />
                  <InputError error={errors.content?.message} />
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end w-[100%] gap-[15px]">
          <CustomButton outline={true} className="!h-11 !w-[120px]" onClick={handleCancel}>
            Cancel
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            type="primary"
            className="!h-11 !w-[120px]"
            onClick={handleSubmit(onSubmit)}
          >
            Send
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default SendFeedBack;
