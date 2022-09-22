import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserService from "services/User";
import PermissionsService from "services/Permissions";
import GeneralField from "./GeneralField";
import AssignRole from "./AssignRole";

const ADD = "ADD";
const EDIT = "EDIT";

const FaqForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
    fetchAllRoles();
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const { data } = await UserService.get(id);
      if (data) {
        form.setFieldsValue({
          ...data,
          is_fixed_otp: Number(data?.is_fixed_otp ?? 0),
        });
        setUserData(data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const fetchAllRoles = async () => {
    try {
      const res = await PermissionsService.getRolesWithPermission();
      setRolesData(res.role);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        let { phone, ...rest } = values;
        let formdata = new FormData();
        for (let k in rest) formdata.append(k, rest[k]);

        formdata.append("phone", Number(phone));

        for (var pair of formdata.entries()) {
        }

        if (mode === ADD) {
          UserService.create(formdata)
            .then((res) => {
              history.push("/app/users");
              message.success(`Created user`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }

        if (mode === EDIT) {
          UserService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/users");
              message.success(`User saved`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      })
      .catch((info) => {
        message.error("Please enter all required field ");
        setSubmitLoading(false);
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">
              {mode === "ADD" ? "Add New User" : `Edit User`}{" "}
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

          <GeneralField userData={userData} roles={rolesData} mode={mode} />
        </div>
      </Form>
    </>
  );
};

export default FaqForm;
