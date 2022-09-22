import { Button, Form, message } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BlogService from "services/Blog";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";
import moment from "moment";

const ADD = "ADD";
const EDIT = "EDIT";

const BlogForm = (props) => {
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
      const res = await BlogService.get(id);
      if (res)
        form.setFieldsValue({
          ...res,
          start_date: res.start_date ? moment(res.start_date) : moment(),
          end_date: res.end_date ? moment(res.end_date) : moment(),
          tags: res.tags ? res.tags.split(",") : "",
          content: BraftEditor.createEditorState(res.content),
          meta_title: res.seo.title,
          meta_description: res.seo.description,
          keywords: res.seo.keywords ? res.seo.keywords.split(",") : "",
          author: res.seo.author,
          type: res.seo.type,
          conical_tag: res.seo.canonical_tag,
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
        const { content, end_date, start_date, ...rest } = values;
        let formdata = new FormData();
        for (let k in rest) formdata.append(k, rest[k] ?? "");
        if (content) formdata.append("content", content.toHTML());
        if (start_date)
          formdata.append(
            "start_date",
            moment(start_date).format("YYYY-MM-DD HH:mm:ss")
          );
        if (end_date)
          formdata.append(
            "end_date",
            moment(end_date).format("YYYY-MM-DD HH:mm:ss")
          );

      

        if (mode === ADD) {
          BlogService.post(formdata)
            .then((res) => {
              message.success(`Created blog`);
              history.push("/app/blogs");
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          BlogService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/blogs");
              message.success(`Blog saved`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      })
      .catch((error) => {
        message.error(error.message ?? "Fill all the required fields");
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
              {mode === "ADD" ? "Add New Blog" : `Edit Blog`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "blog_create" : "blog_edit"}>
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

export default BlogForm;
