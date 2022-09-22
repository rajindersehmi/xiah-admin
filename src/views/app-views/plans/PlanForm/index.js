import { Button, Card, Form, message, Radio, Tabs } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/DateConstant";
import moment from "moment";
import React, { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router";
import PlanService from "services/Plan";
import BroadbandplanFields from "./BroadbandplanField";
import BroadbandTV from "./BroadbandTV";
import BroadbandPhone from "./BroadbandPhone";
import BroadbandTVPhone from "./BroadbandTVPhone";
import BroadbandTVPhoneMobile from "./BroadbandTVPhoneMobile";

import DataCardPlanFields from "./DataCardPlanField";
import DTHplanFields from "./DTHplanField";
import GeneralField from "./GeneralField";
import InternationalSimPlanFields from "./InternationalSimPlanField";
import MobileplanFields from "./MobileplanField";
import OtherPlanFields from "./OtherPlanField";
import SatelliteBroadbandFields from "./SatelliteBroadbandPlanFields";
import TabletPlanFields from "./TabletPlanField";
const { TabPane } = Tabs;
const ADD = "ADD";
const EDIT = "EDIT";

const PlanTypes = [
  {
    key: "broadband",
    label: "Broadband",
  },
  {
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "mobile-sim",
    label: "Mobile Sim",
  },
  {
    key: "dth",
    label: "TV",
  },

  {
    key: "data-card",
    label: "Data Card",
  },
  {
    key: "satellite-broadband",
    label: "Satellite Broadband",
  },
  {
    key: "tablet",
    label: "Tablet",
  },
  {
    key: "international-sim-card",
    label: "International Sim Card",
  },
  {
    key: "broadband_tv",
    label: "Broadband + TV",
  },
  {
    key: "broadband_phone",
    label: "Broadband + Phone",
  },
  {
    key: "broadband_tv_phone",
    label: "Broadband + TV + Phone",
  },
  {
    key: "broad_tv_phone_mobile",
    label: "Broadband + TV + Phone +Mobile",
  },
];

const PlansForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [planType, setPlanType] = useState("broadband");
  const [contractNo, setContractNo] = useState("");
  const [contractUnit, setContractUnit] = useState("days");
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
      const { plan } = await PlanService.get(id);
      if (plan) {
        form.setFieldsValue({
          ...plan,
          ...plan?.plan_info,
          night_time_free_usage_period: moment(
            plan?.plan_info?.night_time_free_usage_period ?? ""
          ),
          contract: plan?.plan_info?.contract.split(" ")[0],
          contract_period_suffix: plan?.plan_info?.contract.split(" ")[1],
          tag_id: plan?.tags?.map((tag) => tag.id),
          content: BraftEditor.createEditorState(plan.content),
          offer_terms_conditions: BraftEditor.createEditorState(
            plan?.plan_info?.offer_terms_conditions
          ),
          privacy_policy: BraftEditor.createEditorState(
            plan?.plan_info?.privacy_policy
          ),
          location_id: plan?.locations?.map((l) => l.id),
          meta_title: plan.seo.title,
          meta_description: plan.seo.description,
          keywords: plan?.seo?.keywords ? plan.seo.keywords.split(",") : "",
          multiple_color_add: plan?.plan_info?.multiple_color_add
            ? plan.plan_info.multiple_color_add.split(",")
            : "",
          author: plan.seo.author,
          type: plan.seo.type,
          conical_tag: plan.seo.canonical_tag,
          active_till: moment(plan?.active_till),
          active_from: moment(plan?.active_from),
        });
        setPlanType(plan.plan_type);
        setContractNo(plan?.plan_info?.contract.split(" ")[0]);
        setContractUnit(plan?.plan_info?.contract.split(" ")[1]);
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
        const {
          content,
          privacy_policy,
          offer_terms_conditions,
          active_till,
          active_from,
          vendor_id,
          location_id,
          tag_id,
          contract,
          contract_period_suffix,
          ...rest
        } = values;
        for (let k in rest) formdata.append(k, rest[k] ?? " ");
        formdata.append("planType", planType);
        formdata.append("plan_type", planType);
        formdata.append("contract", `${contractNo} ${contractUnit}`);

        if (tag_id?.length > 0)
          tag_id.forEach((b) => formdata.append("tag_id[]", b));
        if (vendor_id && vendor_id.length > 0)
          vendor_id.forEach((id) => formdata.append("vendor_id[]", id));
        if (location_id && location_id.length > 0)
          location_id.forEach((id) => formdata.append("location_id[]", id));
        if (content) formdata.append("content", content.toHTML());
        if (privacy_policy)
          formdata.append("privacy_policy", privacy_policy.toHTML());
        if (offer_terms_conditions)
          formdata.append(
            "offer_terms_conditions",
            offer_terms_conditions.toHTML()
          );

        if (active_till)
          formdata.append(
            "active_till",
            moment(active_till).format(DATE_FORMAT_YYYY_MM_DD)
          );
        if (active_from)
          formdata.append(
            "active_from",
            moment(active_from).format(DATE_FORMAT_YYYY_MM_DD)
          );

        if (mode === ADD) {
          PlanService.post(formdata)
            .then((res) => {
              history.push("/app/plans");
              message.success(`Created plans`);
            })
            .finally(() => setSubmitLoading(false));
        }
        if (mode === EDIT) {
          PlanService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/plans");
              message.success(`Plan saved`);
            })
            .finally(() => setSubmitLoading(false));
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

  const planDetailsForm = useCallback(() => {
    if (planType === "mobile")
      return (
        <MobileplanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "mobile-sim")
      return (
        <MobileplanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "dth")
      return (
        <DTHplanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "data-card")
      return (
        <DataCardPlanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "tablet")
      return (
        <TabletPlanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "satellite-broadband")
      return (
        <SatelliteBroadbandFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "international-sim-card")
      return (
        <InternationalSimPlanFields
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "broadband_tv")
      return (
        <BroadbandTV
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "broadband_phone")
      return (
        <BroadbandPhone
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "broadband_tv_phone")
      return (
        <BroadbandTVPhone
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    if (planType === "broad_tv_phone_mobile")
      return (
        <BroadbandTVPhoneMobile
          contractNo={contractNo}
          contractUnit={contractUnit}
          setContractNo={setContractNo}
          setContractUnit={setContractUnit}
        />
      );
    return (
      <BroadbandplanFields
        contractNo={contractNo}
        contractUnit={contractUnit}
        setContractNo={setContractNo}
        setContractUnit={setContractUnit}
      />
    );
  }, [planType]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          speed_suffix: "mbps",
          download_speed_suffix: "mbps",
          upload_speed_suffix: "mbps",
          speed_after_usage_suffix: "mbps",
          usage_suffix: "mb",
          planType: "broadband",
          plan_type: "broadband",
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
            <TabPane tab="General" key="1">
              <GeneralField {...uploadProps} />
            </TabPane>
            <TabPane tab="Plan Details" key="2">
              <Card title="Plan type">
                <Form.Item name="plan_type">
                  <Radio.Group
                    value={planType}
                    onChange={(e) => setPlanType(e.target.value)}
                    // disabled={mode === EDIT}
                  >
                    {PlanTypes.map((t) => (
                      <Radio value={t.key} key={t.key}>
                        {t.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
                {planDetailsForm()}
              </Card>
            </TabPane>
            <TabPane tab="Cost, Warranty and other details" key="3">
              <OtherPlanFields
                form={form}
                contractNo={contractNo}
                contractUnit={contractUnit}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default PlansForm;
