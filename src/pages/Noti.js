import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getNoti } from "../services/noti.api.js";
import { Skeleton } from "antd";

const Noti = () => {
  const { data, isLoading } = useQuery(["NOTI"], () => getNoti());

  return (
    <div className="p-4">
      <div className="flex mb-3">
        <h1 className="text-lg font-semibold">Danh sách thông báo</h1>
      </div>
      <div className="space-y-4">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="rounded-lg shadow-md p-4 border">
                <Skeleton active />
              </div>
            ))
        ) : data?.data?.length > 0 ? (
          data?.data?.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg shadow-md p-4 border bg-white"
            >
              <h2 className="font-semibold text-xl">{notification.title}</h2>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: notification.content }}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-[16px] text-gray-500 mt-[100px]">
            Không có thông báo nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default Noti;
