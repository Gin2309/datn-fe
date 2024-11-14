import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const CustomDatePicker = ({ onChange, value, ...props }) => {
  const handleChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      onChange(formattedDate);
    } else {
      onChange("");
    }
  };

  return (
    <DatePicker
      onChange={handleChange}
      value={value ? dayjs(value, "YYYY-MM-DD") : null}
      {...props}
    />
  );
};

export default CustomDatePicker;
