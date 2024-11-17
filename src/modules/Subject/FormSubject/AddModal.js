import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../../services/user.api";

import { Table, Button } from "antd";
import CustomModal from "../../../components/CustomModal";
import CustomPagination from "../../../components/CustomPagination";
import { convertUnixTimestampToISO } from "../../../utils/formatTime";

const AddModal = ({
  open,
  onCancel,
  onSubmit,
  isSubmitting,
  Ids,
  onSelection,
}) => {
  const [formFilter, setFormFilter] = useState({
    role: "teacher",
    keyword: "",
    page: 1,
    pageSize: 20,
  });
  const [studentIds, setStudentIds] = useState([]);

  const { data, isLoading } = useQuery(
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
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => convertUnixTimestampToISO(createdAt),
    },
  ];

  const handleAdd = () => {
    const firstFilter = Array.from(new Set(studentIds));

    const secondFilter = firstFilter.filter((id) => !Ids.includes(id));

    const submitData = data?.data.filter((student) =>
      secondFilter.includes(student.id)
    );

    onSelection(submitData || []);
    onCancel();
  };

  // phân trang
  const totalPages = Math.ceil(data?.totalCount / formFilter.pageSize);
  const currentPage = formFilter.page;
  const pageSize = formFilter.pageSize;
  const totalCount = data?.totalCount || 0;
  const currentCount = Math.min(currentPage * pageSize, totalCount);

  return (
    <CustomModal
      isOpen={open}
      onCancel={onCancel}
      onSubmit={() => {}}
      width={1000}
      customFooter={true}
      title="Thêm giáo viên"
    >
      <div className="card">
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: studentIds,
            onChange: (selectedRowKeys) => {
              setStudentIds(selectedRowKeys);
            },
          }}
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

        <div className="flex justify-end w-[100%] gap-[15px] pt-6 border-t-[1px] border-[#E5E5E5]">
          <Button type="danger" wrapClassName="w-[100px]" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            type="primary"
            wrapClassName="p-3"
            onClick={handleAdd}
            loading={isSubmitting}
          >
            Thêm
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddModal;
