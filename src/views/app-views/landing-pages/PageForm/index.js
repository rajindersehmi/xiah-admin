import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GeneralField from "./GeneralField";
import LandingPageService from "services/LandingPage";
import BraftEditor from "braft-editor";

const ADD = "ADD";
const EDIT = "EDIT";

const PageForm = (props) => {
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
      const { data } = await LandingPageService.get(id);

      let obj = {};
      for (let k in data) {
        if (data[k] !== "undefined") obj[k] = data[k];
        else obj[k] = "";
      }
      if (data)
        form.setFieldsValue({
          ...obj,
          description: BraftEditor.createEditorState(data?.description),
          meta_title: data?.seo?.title,
          meta_description: data?.seo?.description,
          keywords: data?.seo?.keywords ? data?.seo?.keywords.split(",") : "",
          author: data?.seo?.author,
          type: data?.seo?.type,
          conical_tag: data?.seo?.canonical_tag,
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
        const { description, ...rest } = values;

        let formdata = new FormData();
        for (let k in rest) formdata.append(k, rest[k] ? rest[k] : undefined);
        if (description) formdata.append("description", description.toHTML());
        if (mode === ADD) {
          LandingPageService.post(formdata)
            .then((res) => {
              history.push("/app/landing-pages");
              message.success(`Created page`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          LandingPageService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/landing-pages");
              message.success(`Page saved`);
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
              {mode === "ADD" ? "Add New Page" : `Edit Page`}{" "}
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
          <GeneralField />
        </div>
      </Form>
    </>
  );
};

export default PageForm;
