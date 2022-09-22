import { Button, Form, message } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ExtraService from "services/Extra";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const ExtraServiceForm = (props) => {
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
      const res = await ExtraService.get(id);
      if (res)
        form.setFieldsValue({
          ...res.data,
          description: BraftEditor.createEditorState(res?.data?.description),
          features: JSON.parse(res?.data?.features),
          metrics_list: JSON.parse(res?.data?.metrics_list),
          tag_id: res.data?.tags?.map((t) => t.id),
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
        const { description, features, metrics_list, tag_id, ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        formdata.append("description", description.toHTML());
        if (tag_id?.length > 0)
          tag_id.forEach((b) => formdata.append("tag_id[]", b));
        else formdata.append("tag_id[]", 0);
        if (features?.length > 0)
          features.forEach((b) => formdata.append("features[]", b));
        if (metrics_list?.length > 0)
          metrics_list.forEach((b) => formdata.append("metrics_list[]", b));

        if (file && file.length > 0) formdata.append("image", file[0]);
        if (mode === ADD) {
          ExtraService.post(formdata)
            .then((res) => {
              history.push("/app/extra-service");
              message.success(`Created service`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          ExtraService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/extra-service");
              message.success(`Service saved`);
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
              {mode === "ADD" ? "Add New Service" : `Edit Service`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted
                to={
                  mode === "ADD" ? "extra_service_create" : "extra_service_edit"
                }
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
          <GeneralField {...uploadProps} />
        </div>
      </Form>
    </>
  );
};

export default ExtraServiceForm;
