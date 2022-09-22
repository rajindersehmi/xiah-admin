import { Button, Form, message } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import FaqService from "services/Faq";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const FaqForm = (props) => {
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
      const res = await FaqService.get(id);
      if (res)
        form.setFieldsValue({
          ...res,
          content: BraftEditor.createEditorState(res.content),
          category_id: res?.category_faq?.map((c) => c.id),
          brand_id: res?.brand_faq?.map((b) => b.id),
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
        const { content, brand_id, category_id, ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        if (content) formdata.append("content", content.toHTML());
        if (brand_id?.length > 0)
          brand_id.forEach((b) => formdata.append("brand_id[]", b));
        if (category_id?.length > 0)
          category_id.forEach((b) => formdata.append("category_id[]", b));
        if (mode === ADD) {
          FaqService.post(formdata)
            .then((res) => {
              history.push("/app/faqs");
              message.success(`Created faq`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          FaqService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/faqs");
              message.success(`Faq saved`);
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
              {mode === "ADD" ? "Add New Faq" : `Edit Faq`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "faq_create" : "faq_edit"}>
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

export default FaqForm;
