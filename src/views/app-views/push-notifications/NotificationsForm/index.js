import { Button, Form, message } from "antd";

import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Restricted from "views/app-views/permissions/Restricted";
import GeneralField from "./GeneralField";
import moment from "moment";
import PushNotificationService from "services/PushNotification";

const ADD = "ADD";
const EDIT = "EDIT";

const NotificationForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const { data } = await PushNotificationService.get(id);
      if (data)
        form.setFieldsValue({
          ...data,
          send_to: data?.role,
          schedule_date: data?.scheduled_at ? moment(data.scheduled_at) : "",
          schedule_time: data?.scheduled_at ? moment(data.scheduled_at) : "",
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
        const { title, description, send_to, schedule_date, schedule_time } =
          values;

        let body = {
          title,
          description,
          role: send_to,
          sent: 0,
          scheduled_at: `${moment(schedule_date).format("YYYY-MM-DD")} ${moment(
            schedule_time
          ).format("HH:mm:ss")}`,
        };

        if (send_to === "Custom List") {
          if (selectedRows.length > 0)
            body["users"] = selectedRows.map((r) => r.id);
        }

        if (mode === ADD) {
          PushNotificationService.post(body)
            .then((res) => {
              history.push("/app/push-notifications");
              message.success(`Created notification successfully`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          PushNotificationService.put(param.id, body)
            .then((res) => {
              history.push("/app/push-notifications");
              message.success(`Notification saved`);
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
      setFile((prev) => [file]);
      return false;
    },
    fileList: file,
  };

  const handleSelectRowsChange = (rows) => {
    setSelectedRows(rows);
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
              {mode === "ADD" ? "Add New Notification" : `Edit Notificatio`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Restricted to={mode === "ADD" ? "award_create" : "award_edit"}>
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
          <GeneralField
            {...uploadProps}
            onSelectRowsChange={handleSelectRowsChange}
          />
        </div>
      </Form>
    </>
  );
};

export default NotificationForm;
