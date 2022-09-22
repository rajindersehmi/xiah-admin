import { Button, Form, message } from "antd";
import Flex from "components/shared-components/Flex";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/DateConstant";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BannerService from "services/Banner";
import GeneralField from "./GeneralField";
import moment from "moment";
import Restricted from "views/app-views/permissions/Restricted";
const ADD = "ADD";
const EDIT = "EDIT";

const BannerForm = (props) => {
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
      const res = await BannerService.get(id);
      if (res)
        form.setFieldsValue({
          ...res?.data,
          start_at: moment(),
          end_at: moment(res?.data?.end_at),
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
        const { start_at, end_at, ...rest } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        if (start_at)
          formdata.append(
            "start_at",
            moment(start_at).format(DATE_FORMAT_YYYY_MM_DD)
          );
        if (end_at)
          formdata.append(
            "end_at",
            moment(end_at).format(DATE_FORMAT_YYYY_MM_DD)
          );

        if (mode === ADD) {
          BannerService.post(formdata)
            .then((res) => {
              history.push("/app/banners");
              message.success(`Created Banner`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          BannerService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/banners");
              message.success(`Banner saved`);
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
              {mode === "ADD" ? "Add New Banner" : `Edit Banner`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "banner_create" : "banner_edit"}>
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
          <GeneralField form={form} />
        </div>
      </Form>
    </>
  );
};

export default BannerForm;
