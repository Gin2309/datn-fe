import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Guard = ({ element, allowedRoles }) => {
  const userData = useSelector((state) => state.auth.user);
  const role = userData?.role;
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!allowedRoles.includes(role) && !hasShownToast) {
      toast.error("Bạn không có quyền truy cập vào trang này!");
      setHasShownToast(true);
    }
  }, [role, allowedRoles, hasShownToast]);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/admin/profile" replace />;
  }

  return element;
};

export default Guard;
