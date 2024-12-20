import React, { useState, useEffect } from "react";
import { Table, Skeleton } from "antd";
import { CustomInput } from "../components/CustomInput";
import CustomTabs from "../components/CustomTabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStudentList, addGrade } from "../services/teacher.api";
import { getTeacher } from "../services/teacher.api";
import toast from "react-hot-toast";

const GradePage = () => {
  const [classId, setClassId] = useState(null);
  const [formFilter, setFormFilter] = useState({ page: 1, pageSize: 20 });

  const {
    data: studentList,
    isLoading: isLoadingStudents,
    refetch,
  } = useQuery(["GRADE", classId], () => getStudentList(classId), {
    enabled: !!classId,
  });

  const { data: classes, isLoading: isLoadingClasses } = useQuery(
    ["CLASS", formFilter],
    () => getTeacher(),
    { refetchOnWindowFocus: false }
  );

  const tabs =
    classes?.data?.classes?.map((classItem) => ({
      key: classItem.id,
      label: classItem.name,
    })) || [];

  useEffect(() => {
    if (classes?.data?.classes?.length > 0) {
      setClassId(classes?.data?.classes[0].id);
    }
  }, [classes]);

  const transformedData = studentList?.data?.map((item) => ({
    id: item.studentId,
    name: item.name,
    hs1: item.grade
      ? item.grade.scoreFactor1
        ? parseFloat(item.grade.scoreFactor1)
        : ""
      : "",
    hs2: item.grade
      ? item.grade.scoreFactor2
        ? parseFloat(item.grade.scoreFactor2)
        : ""
      : "",
    hs3: item.grade
      ? item.grade.scoreFactor3
        ? parseFloat(item.grade.scoreFactor3)
        : ""
      : "",
    avg: item.grade
      ? item.grade.averageScore
        ? parseFloat(item.grade.averageScore)
        : ""
      : "",
  }));

  const { mutate: updateGrade, isLoading } = useMutation(
    (data) => addGrade(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi cập nhật điểm!");
      },
    }
  );

  const handleScoreChange = (value, record, field) => {
    let parsedValue = null;

    const trimmedValue = String(value).trim();

    if (trimmedValue !== "") {
      parsedValue = parseFloat(trimmedValue);

      if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 10) {
        toast.error("Điểm phải nằm trong khoảng từ 0 đến 10!");
        return;
      }
    }

    const updatedRecord = {
      ...record,
      [field]: parsedValue,
    };

    const gradeData = {
      addGrade: [
        {
          userId: updatedRecord.id,
          classId: classId,
          scoreFactor1:
            updatedRecord.hs1 !== null ? Number(updatedRecord.hs1) : "",
          scoreFactor2:
            updatedRecord.hs2 !== null ? Number(updatedRecord.hs2) : "",
          scoreFactor3:
            updatedRecord.hs3 !== null ? Number(updatedRecord.hs3) : "",
        },
      ],
    };

    updateGrade(gradeData);
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "HS1",
      dataIndex: "hs1",
      editable: true,
      render: (text, record) => (
        <CustomInput
          value={text}
          onBlur={(e) => handleScoreChange(e.target.value, record, "hs1")}
          onChange={() => {}}
          type="number"
        />
      ),
    },
    {
      title: "HS2",
      dataIndex: "hs2",
      editable: true,
      render: (text, record) => (
        <CustomInput
          value={text}
          onBlur={(e) => handleScoreChange(e.target.value, record, "hs2")}
          onChange={() => {}}
          type="number"
        />
      ),
    },
    {
      title: "HS3",
      dataIndex: "hs3",
      editable: true,
      render: (text, record) => (
        <CustomInput
          value={text}
          onBlur={(e) => handleScoreChange(e.target.value, record, "hs3")}
          onChange={() => {}}
          type="number"
        />
      ),
    },
    {
      title: "Điểm trung bình",
      dataIndex: "avg",
      render: (text) => (text ? text.toFixed(2) : "-"),
    },
  ];

  const handleTabChange = (value) => {
    setClassId(value);
  };

  return (
    <div>
      <h2 className="font-semibold mb-4 text-lg">Quản lý điểm</h2>
      {isLoadingClasses ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <>
          <div className="mb-4">
            <CustomTabs
              tabs={tabs}
              onChange={handleTabChange}
              activeKey={classId}
            />
          </div>

          <Table
            rowKey="id"
            columns={columns}
            dataSource={transformedData || []}
            loading={isLoading || isLoadingStudents || isLoadingClasses}
            pagination={false}
            bordered
          />
        </>
      )}
    </div>
  );
};

export default GradePage;
