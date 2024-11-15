import React from "react";
import { Modal, Button } from "antd";

const ConfirmDeleteModal = ({ open, onSubmit, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" danger onClick={onSubmit}>
          Xóa
        </Button>,
      ]}
    >
      <p>
        Bạn có chắc chắn muốn môn học này không ?. Sau khi xóa dữ liệu sẽ không
        còn trên hệ thống
      </p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
