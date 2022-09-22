import { Button, Card, Form, message, Radio, Tabs } from "antd";
import Flex from "components/shared-components/Flex";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm_ss } from "constants/DateConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EnquiryService from "services/Enquiry";
import Utils from "utils";
import { enquiryTypes } from "../enquiry-list";
import CategoryFields from "./CategoryField";
import GeneralField from "./GeneralField";
import OtherFields from "./OtherFields";
const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const EnquiryForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [enquiryType, setEnquiryType] = useState("");

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
      const { Enquiries } = await EnquiryService.get(id);
      if (!Enquiries) return;

      form.setFieldsValue({
        ...Enquiries,
        expiry_on: Enquiries.expiry_on ? moment(Enquiries.expiry_on) : null,
        contact_form_id: Enquiries?.contact_form?.contact_form_id ?? null,
        contact_form:
          Enquiries?.contact_form?.data &&
          Enquiries?.contact_form?.data !== "undefined"
            ? JSON.parse(Enquiries.contact_form.data)
            : null,
      });

      setEnquiryType(Enquiries?.enquiry_type);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        const {
          expiry_on,
          next_possible_update,
          contact_form,

          ...rest
        } = values;
        const formdata = new FormData();

        // appending all required fields here , which do not need any formating
        for (let k in rest) if (rest[k]) formdata.append(k, rest[k]);

        if (enquiryType && enquiryType !== "category") {
          // if enquiry type exist append it and also the more details of the enquiry
          // also checking for enquiry type category , as that data needs its seperate formating
          formdata.append("enquiry_type", enquiryType);
          let details = rest[enquiryType];
          if (details)
            for (let k in details)
              if (details[k]) formdata.append(k, details[k]);
        }

        // apending contact form if the enquiry type is category
        if (
          enquiryType &&
          (enquiryType === "category" || enquiryType === "extra_services")
        ) {
          formdata.append("enquiry_type", enquiryType);
          const stringifyContactForm = JSON.stringify(contact_form);
          if (!!stringifyContactForm) {
            formdata.append("submissionData", stringifyContactForm);
          }
        }

        // formating expiry time to match the DB need
        if (expiry_on) {
          formdata.append(
            "expiry_on",
            moment(expiry_on).format(DATE_FORMAT_YYYY_MM_DD_HH_mm_ss)
          );
        }
        if (next_possible_update) {
          formdata.append(
            "next_possible_update",
            moment(next_possible_update).format(DATE_FORMAT_YYYY_MM_DD_HH_mm_ss)
          );
        } else {
          formdata.append(
            "next_possible_update",
            moment().format(DATE_FORMAT_YYYY_MM_DD_HH_mm_ss)
          );
        }

        // post and put request based on mode of the form
        if (mode === ADD) {
          EnquiryService.post(formdata)
            .then((res) => {
              history.push("/app/enquiries");
              message.success(`Created Enquiry`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          EnquiryService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/enquiries");
              message.success(`Enquiry saved`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }

        // End
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
              {mode === "ADD" ? "Add New Enquiry" : `Edit Enquiry`}{" "}
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

          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1" forceRender="true">
              {mode === ADD && (
                <Card>
                  <Radio.Group
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                  >
                    {enquiryTypes.map((type) => (
                      <Radio key={type.key} value={type.value}>
                        {type.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Card>
              )}
              <GeneralField />
            </TabPane>

            {enquiryType &&
            (enquiryType === "category" || enquiryType === "extra_services") ? (
              <TabPane
                tab={Utils.humanize(enquiryType)}
                key="2"
                forceRender="true"
              >
                <CategoryFields enquiry_type={enquiryType} />
              </TabPane>
            ) : (
              <TabPane tab={Utils.humanize(enquiryType)} key="2">
                <OtherFields enquiry_type={enquiryType} />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default EnquiryForm;
