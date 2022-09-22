import { Form, Input, message, Modal } from "antd";
import React, { useEffect } from "react";
import PermissionService from "services/Permissions";

const AddRoleModal = ({ addModal, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: "" });
  }, [addModal]);

  const onFinish = () => {
    form.validateFields().then((values) => {
      const formdata = new FormData();
      formdata.append("name", values.name);
      PermissionService.createRole(formdata).then(() => {
        message.success("Role Created");
        closeModal();
      });
    });
  };

  return (
    <Modal visible={addModal.show} onCancel={closeModal} onOk={onFinish}>
      <h2>Add New Role</h2>
      <br />
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Role Name" required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
