import { Modal } from "antd";
import React from "react";

function CustomModal({
  isOpenModal,
  setIsOpenModal,
  sureDeleteModal,
  title,
  children,
}) {
  return (
    <Modal
      title={title}
      open={isOpenModal}
      onOk={sureDeleteModal}
      onCancel={() => setIsOpenModal(false)}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
