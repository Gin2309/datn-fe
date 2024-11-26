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
  updateSubject,
  getDetailSubject,
  createSubject,
} from "../../../services/subject.api";

const FormSubject = ({ mode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState([]);
  const [studentIds, setStudentIds] = useState([]);

  useEffect(() => {
    setStudentIds(student.length > 0 ? student.map((item) => item.id) : []);
  }, [student]);

  const { data } = useQuery(["DETAIL", id], () => getDetailSubject(id), {
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setStudent(data?.data?.users);
    }
  }, [data]);

  const {
    getValues,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    context: { mode },
    defaultValues: {
      name: detail?.name || "",
    },
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      reset({
        name: detail?.name,
      });
    }
  }, [mode, detail]);

  const { mutate: mutationAction, isLoading } = useMutation(
    (data) => (mode === "add" ? createSubject(data) : updateSubject(id, data)),
    {
      onSuccess: async () => {
        reset();
        navigate("/admin/subject", { replace: true });
        toast.success("Thành công");
      },
    }
  );

  const onSubmit = () => {
    const data = getValues();

    const submitedData = {
      ...data,
      teacherIds: studentIds,
    };

    mutationAction(submitedData);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleAdd = (items) => {
    setStudent((prev) => [...prev, ...items]);
  };

  const handleRemove = (id) => {
    setStudent((prev) => prev.filter((student) => student.id !== id));
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
          {mode === "add" ? "Thêm môn học" : "Chỉnh sửa môn học"}
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
        <div className="">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <CustomLabel label="Tên môn học" required />
                <CustomInput
                  className="!h-10  "
                  placeholder="Nhập tên môn học"
                  onChange={onChange}
                  value={value}
                />
                <InputError error={errors.name?.message} />
              </div>
            )}
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
          Thêm giáo viên
        </Button>
      </div>

      <AddModal
        open={open}
        onCancel={() => setOpen(false)}
        Ids={studentIds}
        onSelection={handleAdd}
        subjectId={id}
      />
    </Box>
  );
};

export default FormSubject;
