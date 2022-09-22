import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import GeneralField from "./GeneralField";

import TicketService from "services/Tickets";
import BraftEditor from "braft-editor";
const ADD = "ADD";
const EDIT = "EDIT";

const TicketForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imgSrc, setSrc] = useState(null);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetchData(id);
    }
  }, [form, mode, param, props]);

  const fetchData = async (id) => {
    try {
      const res = await TicketService.get(id);

      if (res) {
        setSrc(res?.["data model"].images);
        form.setFieldsValue({
          ...res?.["data model"],
          description: BraftEditor.createEditorState(
            res?.["data model"].description
          ),
        });
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
        const { images, ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        formdata.append("status", "active");

        if (images) {
          formdata.append("images", images);
        }

        if (mode === ADD) {
          TicketService.create(formdata)
            .then((res) => {
              history.push("/app/tickets");
              message.success(`Created Ticket`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      })
      .catch((info) => {
        message.error(info.message);
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
              {mode === "ADD" ? "Add New Ticket" : `Edit Ticket`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Back
              </Button>
              {mode === "ADD" && (
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={submitLoading}
                >
                  ADD
                </Button>
              )}
            </div>
          </Flex>
          <GeneralField
            {...uploadProps}
            mode={mode}
            form={form}
            imageSrc={imgSrc}
          />
        </div>
      </Form>
    </>
  );
};

export default TicketForm;
