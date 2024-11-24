import React, { useState } from "react";
import { Table } from "antd";
import { CustomInput } from "../components/CustomInput";

const GradePage = () => {
  const [data, setData] = useState([
    { id: 1, name: "Nguyễn Văn A", dob: "2005-05-12", hs1: 8, hs2: 7, hs3: 9 },
    { id: 2, name: "Trần Thị B", dob: "2006-03-25", hs1: 6, hs2: 6, hs3: 7 },
    { id: 3, name: "Lê Văn C", dob: "2005-10-10", hs1: 9, hs2: 8, hs3: 10 },
  ]);

  const handleSave = (key, field, value) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.id);
    if (index > -1) {
      newData[index][field] = value;
      newData[index].avg =
        (newData[index].hs1 + newData[index].hs2 + newData[index].hs3) / 3;
      setData(newData);
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      editable: false,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      editable: false,
    },
    {
      title: "HS1",
      dataIndex: "hs1",
      editable: true,
      render: (text, record) => (
        <CustomInput
          value={text}
          onChange={(value) => handleSave(record.id, "hs1", parseInt(value))}
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
          onChange={(value) => handleSave(record.id, "hs2", parseInt(value))}
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
          onChange={(value) => handleSave(record.id, "hs3", parseInt(value))}
        />
      ),
    },
    {
      title: "Điểm trung bình",
      dataIndex: "avg",
      render: (text, record) => {
        const avg = (record.hs1 + record.hs2 + record.hs3) / 3;
        return avg.toFixed(2);
      },
    },
  ];

  return (
    <div>
      <h2>Trang điểm học sinh</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default GradePage;
