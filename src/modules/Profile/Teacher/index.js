import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateTeacher, getTeacher } from "../../../services/teacher.api";

const Teacher = ({ id }) => {
  const { data, refetch } = useQuery(["DETAIL"], () => getTeacher());

  console.log(data);

  return <div>Teacher</div>;
};

export default Teacher;
