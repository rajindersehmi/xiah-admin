import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CityService from "services/City";
import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const CityForm = (props) => {
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
      const { data } = await CityService.get(id);
      if (data)
        form.setFieldsValue({
          ...data,
          is_terminated: Number(data.is_terminated),
          in_use: Number(data.in_use),
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
        const { is_terminated, in_use, ...rest } = values;
        for (let k in rest) if (rest[k]) formdata.append(k, rest[k]);
        formdata.append("in_use", in_use);
        formdata.append("is_terminated", is_terminated);

        if (mode === ADD) {
          CityService.post(formdata)
            .then((res) => {
              history.push("/app/cities");
              message.success(`Created city`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          CityService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/cities");
              message.success(`City saved`);
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
              {mode === "ADD" ? "Add New City" : `Edit City`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "cities_create" : "cities_edit"}>
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

export default CityForm;
