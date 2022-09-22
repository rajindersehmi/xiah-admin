import React, { useState, useEffect } from "react";
import { Button, Form, message, Row, Select, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import PermissionsService from "services/Permissions";
import utils from "utils";
const { Option } = Select;

function AssignRole({ role }) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [rolesData, setRolesData] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchAllRoles();
    if (role?.length > 0) {
      form.setFieldsValue({ role_id: role[0].name });
    }
  }, [role]);
  const fetchAllRoles = async () => {
    setSubmitLoading(true);
    try {
      const res = await PermissionsService.getRolesWithPermission();
      setRolesData(res.role);
    } catch (error) {
      message.error(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const onFinish = async (values) => {
    setSubmitLoading(true);
    try {
      const res = await PermissionsService.assignRole(id, values);
      message.success("Assigned Successfully.");
    } catch (error) {
      message.error(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      {/* <div className="container"> */}
      {/* <Row
          gutter={16}
          style={{ display: "flex", justifyContent: "flex-end" }}
        > */}
      {/* <Col xs={24} sm={24} md={7}> */}
      <Card title="Assign role">
        <Form.Item
          name="role_id"
          label="Select Role"
          rules={[
            {
              required: true,
              message: "Please fill this field",
            },
          ]}
        >
          <Select>
            {rolesData.map((role) => (
              <Option value={role.id}>{utils.humanize(role.name)}</Option>
            ))}
          </Select>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              Save
            </Button>
          </Form.Item>
        </div>
      </Card>
      {/* </Col> */}
      {/* </Row> */}
      {/* </div> */}
    </Form>
  );
}

export default AssignRole;
