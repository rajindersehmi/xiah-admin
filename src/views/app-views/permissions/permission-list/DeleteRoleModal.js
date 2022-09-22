import React from "react";
import { Modal } from "antd";

function DeleteRoleModal({ show, closeModal, deleteRole }) {
  return (
    <Modal
      visible={show}
      onCancel={closeModal}
      onOk={deleteRole}
      title="Confirm Delete"
    >
      <p>Are you sure you want to delete this role?</p>
    </Modal>
  );
}

export default DeleteRoleModal;
