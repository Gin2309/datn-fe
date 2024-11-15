import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../../services/user.api";

import { Table, Button } from "antd";
import CustomPagination from "../../components/CustomPagination";

const AddModal = () => {
  const [formFilter, setFormFilter] = useState({
    role: "student",
    keyword: "",
    page: 1,
    pageSize: 20,
  });

  const { data, isLoading } = useQuery(
    ["data", formFilter],
    () => getUserList(formFilter),
    {
      refetchOnWindowFocus: false,
    }
  );

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (phone) => phone || "---",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (value) => <span className="capitalize">{value}</span>,
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => convertUnixTimestampToISO(createdAt),
    },
  ];

  return (
    <div className="card">
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data?.data}
        rowKey="id"
        pagination={false}
      />

      <CustomPagination
        page={formFilter.page}
        size={formFilter.pageSize}
        formFilter={formFilter}
        setFormFilter={setFormFilter}
        total={totalCount}
        totalPage={totalPages}
        current={currentCount}
      />
    </div>
  );
};

export default AddModal;
