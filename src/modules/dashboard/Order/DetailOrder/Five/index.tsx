"use client";
import React from "react";

import { message } from "antd";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { formatCurrency, formatTextDate } from "@/helper/utility";

import { useMutation } from "@tanstack/react-query";
import { updateOrder } from "@/api/order.service";
import { sendOrderMail } from "@/api/auth.service";
import { profileState } from "@/recoil/state";
import { useRecoilValue } from "recoil";

const Five = ({ data, oid, createdTime }: { data: any; oid: any; createdTime: string }) => {
  const amount = data.orderTotal;
  const profile = useRecoilValue(profileState);

  const { mutate: updateMutation, isLoading: isUpdating } = useMutation((data: any) => updateOrder(data, oid), {
    onSuccess: async () => {
      await handleSendMail();
      window.location.replace(`/dashboard/order/payment-success?amount=${amount}`);
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const handleUpdate = () => {
    const submitData = {
      ...data?.data,
      status: "READY",
    };
    updateMutation(submitData);
  };

  const onCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      const name = details.payer.name.given_name;
      handleUpdate();
    });
  };

  const { mutateAsync: sendMailMutation, isLoading: isSending } = useMutation((data: any) => sendOrderMail(data), {
    onError: (err: any) => {
      message.error(err.response?.data?.message);
    },
  });

  const handleSendMail = () => {
    const submittedData = {
      orderId: oid,
      service: data.service,
      designStyle: data.designStyle,
      additionalService: data.additionalService,
      orderTotal: data.orderTotal,
      createdTime: formatTextDate(createdTime),
      email: profile?.data?.email,
    };

    return sendMailMutation(submittedData);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 -mx-6 step5">
        <div className="flex flex-col gap-6 w-full md:max-w-[426px] mx-0 my-0 px-4 py-[80px] md:mx-auto md:my-auto md:px-0 md:py-0">
          <h1 className="text-center text-[#6C757D]">Select a payment method:</h1>

          <div>
            <PayPalButtons
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
          </div>
        </div>

        <div className="bg-white hidden md:block">
          <div className="flex flex-col gap-6 p-6 ">
            <h1 className="text-[#212529] text-lg font-medium">Order sumary</h1>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h1 className="uppercase text-[#6C757D] text-[12px]">Order Id</h1>
                <h2 className="text-[#343A40]">{data.id}</h2>
              </div>
              <div>
                <h1 className="uppercase text-[#6C757D] text-[12px]">Service</h1>
                <h2 className="text-[#343A40]">{data.service}</h2>
              </div>
              <div>
                <h1 className="uppercase text-[#6C757D] text-[12px]">Design style</h1>
                <h2 className="text-[#343A40]">{data.designStyle}</h2>
              </div>
              <div>
                <h1 className="uppercase text-[#6C757D] text-[12px]">Additional Service</h1>
                <h2 className="text-[#343A40]">{data.additionalService}</h2>
              </div>
            </div>

            <h1 className="text-primary font-medium text-[32px]">{formatCurrency(amount)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Five;
