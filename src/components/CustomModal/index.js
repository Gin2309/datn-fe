import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import cx from "classnames";
import { Button } from "antd";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;
    padding: 0;
  }

  .ant-modal-header {
    border-bottom: none;
    padding: 16px;
    border-radius: 8px 8px 0 0;
  }

  .ant-modal-body {
    padding: 24px;
  }
`;

const CustomModal = ({
  title,
  isOpen,
  onCancel,
  onSubmit,
  children,
  width,
  customFooter,
  textCancel,
  textOk,
  typeOk,
  btnCancel,
  className,
  isLoading,
  forceRender,
  ...rest
}) => {
  return (
    <StyledModal
      title={title}
      width={width}
      open={isOpen}
      className={cx("custom-modal", className)}
      onCancel={onCancel}
      centered
      forceRender={forceRender}
      maskClosable={false}
      footer={
        customFooter
          ? null
          : [
              <div
                key="footer-buttons"
                className="flex justify-end gap-[10px] border-t-[1px] w-full px-[15px] h-[72px] items-center"
              >
                {!btnCancel && (
                  <Button
                    type="danger"
                    wrapClassName="w-[100px]"
                    onClick={onCancel}
                  >
                    {textCancel || "Hủy bỏ"}
                  </Button>
                )}

                <Button
                  type={typeOk || "primary"}
                  wrapClassName="p-3"
                  onClick={onSubmit}
                  loading={isLoading}
                >
                  {textOk || "Xong"}
                </Button>
              </div>,
            ]
      }
      {...rest}
    >
      {children}
    </StyledModal>
  );
};

export default CustomModal;
