import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PartnerPlanSerive from "services/PartnerPlan";
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
      const res = await PartnerPlanSerive.get(id);

      if (res)
        form.setFieldsValue({
          ...res.data,
          benefit: JSON.parse(res?.data?.benefit ?? ""),
          price: Number(res.price) ? Number(res.price) : 0,
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
        const { benefit, text_label, ...rest } = values;

        for (let k in rest) if (rest[k]) formdata.append(k, rest[k]);
        formdata.append("benefit", JSON.stringify(benefit));
        formdata.append("text_label", text_label ? text_label : " ");

        if (file && file.length > 0) formdata.append("icon", file[0]);

        if (mode === ADD) {
          PartnerPlanSerive.post(formdata)
            .then((res) => {
              history.push("/app/partner-plans");
              message.success(`Created plan`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          PartnerPlanSerive.put(param.id, formdata)
            .then((res) => {
              history.push("/app/partner-plans");
              message.success(`Plan saved`);
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
              {mode === "ADD" ? "Add New Plan" : `Edit Plan`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted
                to={
                  mode === "ADD" ? "partner_plan_create" : "partner_plan_edit"
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
