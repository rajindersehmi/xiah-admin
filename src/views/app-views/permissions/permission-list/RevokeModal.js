import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import PermissionService from "services/Permissions";

const RevokeModal = ({ openModal, closeModal, revokeModal }) => {
  const [data, setData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (revokeModal.role_id) fetchRole(revokeModal.role_id);
    form.setFieldsValue({ permissions: "" });
  }, [openModal]);

  const fetchRole = async (id) => {
    try {
      const res = await PermissionService.getSingleRole(id);

      if (res) setData(res);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      const formdata = new FormData();
      formdata.append("permission", values.permissions);
      PermissionService.revokeOne(revokeModal.role_id, formdata).then(() => {
        message.success("Revoked permission - " + values.permissions);
        window.location.reload();
        closeModal();
      });
    });
  };

  const { Option } = Select;

  return (
    <Modal visible={revokeModal.show} onCancel={closeModal} onOk={onFinish}>
      <p style={{ marginBottom: 0 }}>Role</p>
      <h2 style={{ marginTop: "0", marginBottom: "20px" }}>{data?.name}</h2>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="permissions"
          label="Select permission to Revoke"
          required
        >
          <Select>
            {data?.permissions.map((ele) => (
              <Option value={ele.name}>{ele.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RevokeModal;
