import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GeneralField from "./GeneralField";

import PermissionService from "services/Permissions";

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
    fetchPermissions();
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const res = await PermissionService.getSingleRole(id);
      if (res) {
        form.setFieldsValue({
          ...res,
          role: res.name,
          permissions: res.permissions.map((ele) => ele.name),
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await PermissionService.getAll({ perPage: 1000 });
      if (res) setPermissions(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        let role_name = new FormData();
        if (mode === ADD) {
          role_name.append("name", values.role);
          PermissionService.createRole(role_name)
            .then((res) => {
              let perm_list = new FormData();
              perm_list.append("id", res.id);
              values.permissions.map((ele) =>
                perm_list.append("permissions[]", ele)
              );
              PermissionService.assignPermissions(perm_list);
            })
            .then(() => {
              history.push("/app/permissions");
              message.success("Created Role");
              // setSubmitLoading(false);
            })
            .catch((err) => {
              message.error("Something went wrong while creating blog");

              // setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          let perm_list = new FormData();
          perm_list.append("id", param.id);

          values.permissions.map((ele) =>
            perm_list.append("permissions[]", ele)
          );
          PermissionService.assignPermissions(perm_list)
            .then(() => {
              history.push("/app/permissions");
              window.location.reload();
              message.success("Updated Role");
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      })
      .catch((info) => {
        message.error("Please enter all required field ");
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">
              {mode === "ADD" ? "Add New Role" : `Edit Role`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={submitLoading}
                disabled={submitLoading}
              >
                {mode === "ADD" ? "Add" : `Save`}
              </Button>
            </div>
          </Flex>
          <GeneralField permissions={permissions} />
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
