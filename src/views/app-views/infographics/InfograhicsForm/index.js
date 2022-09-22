import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import InfograhpicService from "services/Infographic";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";
import BraftEditor from "braft-editor";

const ADD = "ADD";
const EDIT = "EDIT";

const InfographicForm = (props) => {
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
      const { data } = await InfograhpicService.get(id);
      if (data)
        form.setFieldsValue({
          ...data,
          meta_title: data.seo.title,
          meta_description: data.seo.description,
          tags: data.tags ? data.tags.split(",") : "",
          keywords: data?.seo?.keywords ? data.seo.keywords.split(",") : "",
          author: data.seo.author,
          type: data.seo.type,
          conical_tag: data.seo.canonical_tag,
          description: BraftEditor.createEditorState(data.description),
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
        for (let k in values) formdata.append(k, values[k]);
        if (values.description)
          formdata.append("description", values.description.toHTML());
        if (mode === ADD) {
          InfograhpicService.post(formdata)
            .then((res) => {
              history.push("/app/infographics");
              message.success(`Created infograhic`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          InfograhpicService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/infographics");
              message.success(`Infograhic saved`);
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
              {mode === "ADD" ? "Add New Infographic" : `Edit Infographic`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted
                to={mode === "ADD" ? "infographic_create" : "infographic_edit"}
              >
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

export default InfographicForm;
