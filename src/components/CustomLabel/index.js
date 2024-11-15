import React from "react";

const CustomLabel = ({
  required,
  infoText,
  label,
  hasInfoIcon = true,
  className = "",
}) => {
  return (
    <div className="mb-2 flex items-center gap-1 font-semibold">
      <span className={`font-medium text-[#495057] ${className} text-[14px]`}>
        {label}
      </span>
      {required && <span className="text-[#FF5C00]">*</span>}
    </div>
  );
};

export default CustomLabel;
