import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getClassesList, deleteClasses } from "../../services/classes.api";

import { Table, Button } from "antd";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import CustomPagination from "../../components/CustomPagination";
import CustomTabs from "../../components/CustomTabs";

import { IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { convertUnixTimestampToISO } from "../../utils/formatTime";

const tabs = [
  { key: "", label: "Tất cả tài khoản" },
  { key: "admin", label: "Admin" },
  { key: "teacher", label: "Giáo viên" },
  { key: "student", label: "Học sinh" },
];

const Classes = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formFilter, setFormFilter] = useState({
    role: "",
    keyword: "",
    page: 1,
    pageSize: 20,
  });

  const currentTab = tabs.find((tab) => tab.key === formFilter.role) || {
    label: "Tất cả tài khoản",
  };

  const { data, isLoading, refetch } = useQuery(
    ["data", formFilter],
    () =>
      getClassesList(
        formFilter.role,
        formFilter.keyword,
        formFilter.page,
        formFilter.pageSize
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: DeleteMutation, isLoading: isDeleting } = useMutation(
    (id) => deleteClasses(id),
    {
      onSuccess: () => {
        toast.success("Xóa thành công");
        setOpen(false);
        refetch();
        setSelectedId(null);
      },
      onError: (err) => {
        toast.error(err?.message.error || "Có lỗi xảy ra");
      },
    }
  );

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Số học sinh",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (value) => value || "---",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => convertUnixTimestampToISO(createdAt),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Tooltip title="Chỉnh sửa lớp học">
            <IconButton
              color="#757574"
              aria-label="View"
              onClick={() => navigate(`/admin/edit-classes/${record.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa lớp học">
            <IconButton
              color="#757574"
              aria-label="View"
              onClick={() => handleDelete(record.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setFormFilter((prev) => ({
      ...prev,
      role: key,
    }));
  };

  // phân trang
  const totalPages = Math.ceil(data?.totalCount / formFilter.pageSize);
  const currentPage = formFilter.page;
  const pageSize = formFilter.pageSize;
  const totalCount = data?.totalCount || 0;
  const currentCount = Math.min(currentPage * pageSize, totalCount);

  return (
    <>
      <div className="card">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Quản lý lớp học</h1>

          <Button type="primary" onClick={() => navigate("/admin/add-classes")}>
            Thêm mới
          </Button>
        </div>

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

      <DeleteModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={() => DeleteMutation(selectedId)}
      />
    </>
  );
};

export default Classes;
