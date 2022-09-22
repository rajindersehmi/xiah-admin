import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TagService from "services/Tag";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const TagForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const res = await TagService.get(id);
      if (res)
        form.setFieldsValue({
          ...res.data,
        });
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
        const { ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);

        if (mode === ADD) {
          TagService.post(formdata)
            .then((res) => {
              history.push("/app/tags");
              message.success(`Created tag`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          TagService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/tags");
              message.success(`Tag saved`);
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
              {mode === "ADD" ? "Add New Tag" : `Edit Tag`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "tag_create" : "tag_edit"}>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
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

export default TagForm;
