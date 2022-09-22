import { Button, Form, message } from "antd";

import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";

import PlatformProperties from "services/PlatformProperties";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";

const Config = (props) => {
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetctData();
  }, []);

  const fetctData = async (id) => {
    try {
      const { data } = await PlatformProperties.list();
      if (data.length > 0) {
        form.setFieldsValue({
          ...data[0],
        });
        setId(data[0].id);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        let formdata = new FormData();
        for (let k in values) formdata.append(k, values[k]);
        if (!id) return;

        PlatformProperties.put(id, formdata)
          .then((res) => {
            message.success(`Config updated successfully`);
          })
          .finally(() => {
            setSubmitLoading(false);
          });
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
            justifyContent="end"
            alignItems="center"
          >
            <div className="mb-3">
              <Restricted to={"configuration_edit"}>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={submitLoading}
                >
                  Save
                </Button>
              </Restricted>
            </div>
          </Flex>
          <GeneralField />
        </div>
      </Form>
    </>
  );
};

export default Config;
