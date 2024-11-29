import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteUser, getUserList } from "../../services/user.api";

import { Table, Button } from "antd";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteModal";
import CustomPagination from "../../components/CustomPagination";
import CustomTabs from "../../components/CustomTabs";

import { IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

import { convertUnixTimestampToISO } from "../../utils/formatTime";

const tabs = [
  { key: "", label: "Tất cả người dùng" },
  { key: "admin", label: "Admin" },
  { key: "teacher", label: "Giáo viên" },
  { key: "student", label: "Học sinh" },
];

const UserPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const { mutate: DeleteMutation, isLoading: isDeleting } = useMutation(
    (id) => deleteUser(id),
    {
      onSuccess: () => {
        toast.success("Xóa thành công");
        setOpen(false);
        refetch();
        setSelectedUserId(null);
      },
      onError: (err) => {
        toast.error(err?.message.error || "Có lỗi xảy ra");
      },
    }
  );

  const handleDelete = (id) => {
    setSelectedUserId(id);
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
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
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
      render: (value) => {
        const roleMapping = {
          admin: "Admin",
          teacher: "Giáo viên",
          student: "Học sinh",
        };

        return <span>{roleMapping[value] || value}</span>;
      },
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
          <Tooltip title="Chỉnh sửa người dùng">
            <IconButton
              color="#757574"
              aria-label="View"
              onClick={() => navigate(`/admin/edit-user/${record.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa người dùng">
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
        <h1 className="text-lg font-semibold">{currentTab.label}</h1>

        <div className="flex justify-between">
          <CustomTabs
            tabs={tabs}
            onChange={handleTabChange}
            activeKey={formFilter.role}
          />

          <Button type="primary" onClick={() => navigate("/admin/add-user")}>
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
        onSubmit={() => DeleteMutation(selectedUserId)}
      />
    </>
  );
};

export default UserPage;
