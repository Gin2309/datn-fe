import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Box } from "@mui/material";
import { Button, Select, Table } from "antd";
import toast from "react-hot-toast";
import { CustomInput } from "../../../components/CustomInput";
import InputError from "../../../components/InputError";
import CustomLabel from "../../../components/CustomLabel";
import AddModal from "./AddModal";

import CloseIcon from "@mui/icons-material/Close";

import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  updateClasses,
  createClasses,
  getDetailClasses,
} from "../../../services/classes.api";
import { getUserList } from "../../../services/user.api";

const FormClasses = ({ mode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [formFilter, setFormFilter] = useState({
    role: "teacher",
    keyword: "",
    page: 1,
    pageSize: 20,
    isAddClass: false,
  });

  useEffect(() => {
    setStudentIds(student.length > 0 ? student.map((item) => item.id) : []);
  }, [student]);

  const { data } = useQuery(["DETAIL", id], () => getDetailClasses(id), {
    enabled: !!id,
  });

  const detail = data?.data;

  useEffect(() => {
    if (data) {
      setStudent(data?.data?.users);
    }
  }, [data]);

  const { data: teacher } = useQuery(
    ["data", formFilter],
    () =>
      getUserList(
        formFilter.role,
        formFilter.keyword,
        formFilter.page,
        formFilter.pageSize,
        formFilter.isAddClass
      ),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    context: { mode },
    defaultValues: {
      name: detail?.name || "",
      schoolYear: detail?.schoolYear || "",
      homeroomTeacher: detail?.homeroomTeacher || null,
      studentIds: detail?.studentIds || [],
    },
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      reset({
        name: detail?.name,
        schoolYear: detail?.schoolYear || "",
        homeroomTeacher: detail?.homeroomTeacher || null,
        studentIds: detail?.studentIds || [],
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

  const onSubmit = () => {
    const data = getValues();

    const submitedData = {
      ...data,
      studentIds: studentIds,
    };

    mutationAction(submitedData);
  };

  const handleAdd = (items) => {
    setStudent((prev) => [...prev, ...items]);
  };

  const handleRemove = (id) => {
    setStudent((prev) => prev.filter((student) => student.id !== id));
  };

  const handleCancel = () => {
    navigate(-1);
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
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record) => (
        <span
          className="cursor-pointer"
          onClick={() => handleRemove(record.id)}
        >
          <CloseIcon />
        </span>
      ),
    },
  ];

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h1 className="text-lg font-semibold">
          {mode === "add" ? "Thêm lớp học" : "Chỉnh sửa lớp học"}
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

          <Controller
            name="schoolYear"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Năm học" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập năm học"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.schoolYear?.message} />
              </div>
            )}
          />

          <Controller
            name="homeroomTeacher"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <CustomLabel label="Giáo viên chủ nhiệm" required />
                  <Select
                    options={teacher?.data?.map((teacher) => ({
                      value: teacher.id,
                      label: teacher.fullName,
                    }))}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    showSearch={true}
                    onChange={onChange}
                    value={value}
                    className="w-full h-10"
                    placeholder="Chọn giáo viên chủ nhiệm"
                  />
                  <InputError error={errors.homeroomTeacher?.message} />
                </div>
              );
            }}
          />
        </div>
      </div>

      <div className="card">
        <Table
          columns={columns}
          dataSource={student}
          rowKey="id"
          pagination={false}
        />
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          className="w-[120px]"
        >
          Thêm học sinh
        </Button>
      </div>

      <AddModal
        open={open}
        onCancel={() => setOpen(false)}
        Ids={studentIds}
        onSelection={handleAdd}
      />
    </Box>
  );
};

export default FormClasses;
