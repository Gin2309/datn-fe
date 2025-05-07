import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CustomModal } from "@/components/CustomModal";

import { deleteOrder } from "@/api/order.service";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { CustomButton } from "@/components/CustomButton";

import DeleteIcon from "@/assets/deleteRed.svg";

const DeleteModal = ({ isOpen, onCancel, oid }: { isOpen: boolean; onCancel: () => void; oid: any }) => {
  const router = useRouter();

  const { mutate: deleteMutation, isLoading } = useMutation((id: any) => deleteOrder(id), {
    onSuccess: () => {
      message.success("Success!");
      router.push("/dashboard/order");
    },
    onError: (err: any) => {
      message.error(err?.message || "Failed!");
    },
  });

  const handleDelete = () => {
    deleteMutation(oid);
  };

  return (
    <CustomModal isOpen={isOpen} onCancel={onCancel} onSubmit={() => {}} customFooter width={423}>
      <div className="flex flex-col items-center justify-start gap-6 text-[#1C1C28]">
        <div className="w-[100%] ">
          <div className="w-[46px] h-[46px] bg-[#FFF5F4] flex items-center justify-center rounded-md">
            <Image src={DeleteIcon} height={32} width={32} alt="icon" />
          </div>
        </div>

        <div className="flex text-xl font-medium">Are you sure you want to delete Order {oid} ?</div>
        <p>
          Once deleted, Order <span className="font-medium">{oid}</span> will no longer exist in the system.
        </p>

        <div className="flex justify-start w-[100%] gap-[15px]">
          <CustomButton outline={true} className="!h-11 !w-[120px]" onClick={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton disabled={isLoading} className="!h-11 !w-[120px]" onClick={handleDelete}>
            Delete
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
