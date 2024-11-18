import React from "react";
import { useSelector } from "react-redux";

import Teacher from "./Teacher";
import Student from "./Student";
import Admin from "./Admin";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user.role;

  return (
    <>
      {role === "admin" && <Admin id={user.id} />}
      {role === "teacher" && <Teacher id={user.id} />}
      {role === "student" && <Student id={user.id} />}
    </>
  );
};

export default Profile;
