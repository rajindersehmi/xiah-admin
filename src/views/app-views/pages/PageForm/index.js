import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GeneralField from "./GeneralField";
import PageService from "services/Page";
import BraftEditor from "braft-editor";

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const { data } = await PageService.get(id);
      if (data)
        form.setFieldsValue({
          ...data,
          content: BraftEditor.createEditorState(data?.content),
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
        let formdata = new FormData();
        const { content, published, ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        if (content) formdata.append("content", content.toHTML());
        formdata.append("published", published ? 1 : 0);
        if (file && file.length > 0) formdata.append("image", file[0]);
        if (mode === ADD) {
          PageService.post(formdata)
            .then((res) => {
              history.push("/app/pages");
              message.success(`Created page`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          PageService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/pages");
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

  const uploadProps = {
    onRemove: (f) => {
      setFile((prev) => {
        const index = prev.indexOf(f);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFile((prev) => [...prev, file]);
      return false;
    },
    fileList: file,
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
          <GeneralField {...uploadProps} />
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
