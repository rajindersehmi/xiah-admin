import { Card, Col, Form, Input, Row } from "antd";

import TextEditor from "components/shared-components/TextEditor";
import { months } from "moment";
import React, { useEffect, useMemo, useState } from "react";

const MobilePlanFields = (props) => {
  const { form } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    setState(form.getFieldsValue());
  }, [props.contractNo]);

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        ...state,
        first_year_cost:
          Number(state[`monthly_cost`] * +props.contractNo ?? 0) -
          Number(state["discount_price"] ?? 0) +
          Number(state["one_of_cost"] ?? 0) +
          Number(state["router_cost"] ?? 0) +
          Number(state["activation_fee"] ?? 0) +
          Number(state["equipment_cost"] ?? 0) +
          Number(state["installation_charge"] ?? 0) +
          Number(state["delivery_cost"] ?? 0) +
          Number(state["set_up_cost"] ?? 0) -
          Number(state["reward_price"] ?? 0) +
          Number(state["applied_to_first_bill"] ?? 0) -
          Number(state["applied_to_first_bill_discount"] ?? 0) +
          Number(state["price"] ?? 0),
        // avg_cost: (
        //   Number(form.getFieldsValue().first_year_cost ?? 0) /
        //   Number(props.contractNo)
        // ).toFixed(2),
        // Number(state["one_of_cost"] ?? 0) +
        // Number(state["monthly_cost"] * 12 ?? 0),
        // Number(state["router_cost"] ?? 0) +
        // Number(state["activation_fee"] ?? 0)
        // Number(state["equipment_cost"] ?? 0)
        // Number(state["installation_charge"] ?? 0) +
        // Number(state["set_up_cost"] ?? 0) -
        // (Number(state["reward_price"] ?? 0) +
        // Number(state["applied_to_first_bill"] ?? 0)),
      });
    }
  }, [state, props.contractNo]);

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        avg_cost: (
          Number(form.getFieldsValue().first_year_cost ?? 0) /
          Number(props.contractNo)
        ).toFixed(2),
      });
    }
  }, [form.getFieldsValue()]);

  let unit;
  switch (props.contractUnit) {
    case "months":
      unit = "monthly";
      break;
    case "days":
      unit = "daily";
      break;

    case "years":
      unit = "yearly";
      break;

    case "weeks":
      unit = "wekly";
      break;

    default:
      unit = "";
  }

  const FieldsList = useMemo(
    () => [
      {
        name: "router_cost",
        label: "Router Cost",
      },
      {
        name: "activation_fee",
        label: "Activation Fee",
      },
      {
        name: "discount_price",
        label: "Discount Price ",
      },
      {
        name: "one_of_cost",
        label: "One of Cost ",
      },
      {
        name: `monthly_cost`,
        label: `per/${props?.contractUnit?.substring(
          0,
          props?.contractUnit?.length - 1
        )} Cost`,
      },
      {
        name: "first_year_cost",
        label: "Total Contract Cost",
      },
      {
        name: `avg_cost`,
        label: `${unit} Average Cost`,
      },
      {
        name: "monthly_cost_after_18_months",
        label: `per/${props?.contractUnit?.substring(
          0,
          props?.contractUnit?.length - 1
        )} Cost after ${props?.contractNo} ${props?.contractUnit}`,
      },
      {
        name: "set_up_cost",
        label: "Setup Cost ",
      },
      {
        name: "delivery_cost",
        label: "Delivery Cost ",
      },
      {
        name: "equipment_cost",
        label: "Equipment Cost ",
      },
      {
        name: "to_pay_today",
        label: "To Pay Today ",
      },
      {
        name: "applied_to_first_bill",
        label: "Applied to First Bill ",
      },
      {
        name: "applied_to_first_bill_discount",
        label: "Applied to First Bill Discount",
      },
      {
        name: "reward_price",
        label: "Reward Price",
      },
      {
        name: "price",
        label: "Price",
      },
      {
        name: "installation_charge",
        label: "Installation Charge",
      },
    ],
    [props.contractNo, props.contractUnit]
  );

  const _onFieldChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Cost & Warranty">
          <Row gutter={16}>
            {FieldsList.map((field, index) => (
              <Col xs={24} sm={24} md={8}>
                <Form.Item name={field.name} label={field.label}>
                  <Input
                    placeholder={field.label}
                    name={field.name}
                    onChange={_onFieldChange}
                    disabled={
                      field.name === "avg_cost" ||
                      field.name === "first_year_cost"
                    }
                  />
                </Form.Item>
              </Col>
            ))}
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="privacy_policy" label="Privacy policy">
                <TextEditor />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="offer_terms_conditions"
                label="Offer terms conditions"
              >
                <TextEditor />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MobilePlanFields;
