import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Utils from "utils";
import moment from "moment";
import { AuditReportFields, RequirementFields } from "./FieldData";
import PlanService from "services/Plan";

const { Option } = Select;

const OtherFields = (props) => {
  const { enquiry_type } = props;
  const [plansList, setPlansList] = useState([]);

  useEffect(() => {
    fetchAll();
  }, [enquiry_type]);

  const fetchAll = async () => {
    try {
      const res = await PlanService.list();
      setPlansList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const formattedPlanOptions = useMemo(() => {
    const options = plansList.map((plan) => ({
      value: plan.id,
      key: plan.name,
    }));
    return options;
  }, [plansList]);

  const planFeild = useMemo(() => {
    return [
      {
        type: "select",
        key: "id",
        label: "Plan",
        disabled: true,
        options: formattedPlanOptions,
      },
    ];
  }, [formattedPlanOptions]);

  const fieldsSelector = useMemo(() => {
    switch (enquiry_type) {
      case "requirement":
        return RequirementFields;
      case "audit_report":
        return AuditReportFields;
      case "plan_purchase":
        return planFeild;

      default:
        return [];
    }
  }, [enquiry_type, planFeild]);

  return (
    <Card>
      <Row gutter={16}>
        {fieldsSelector.map(({ key, type, ...rest }) => {
          if (type === "date")
            return (
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name={[enquiry_type, key]}
                  label={Utils.humanize(key)}
                >
                  <CustomDatePicker
                    placeholder={`Select ${Utils.humanize(key)}`}
                  />
                </Form.Item>
              </Col>
            );

          if (type === "select")
            return (
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name={[enquiry_type, key]}
                  label={Utils.humanize(rest.label ? rest.label : key)}
                >
                  <Select
                    placeholder={`Select ${Utils.humanize(key)}`}
                    disabled={rest?.disabled}
                  >
                    {rest.options.map(({ key, value }) => (
                      <Option key={value} value={value}>
                        {key}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            );

          if (type === "checkbox-list")
            return (
              <Col>
                <Form.Item
                  name={[enquiry_type, key]}
                  label={Utils.humanize(key)}
                >
                  <CheckboxList {...rest} />
                </Form.Item>
              </Col>
            );

          return (
            <Col xs={24} sm={24} md={8}>
              <Form.Item name={[enquiry_type, key]} label={Utils.humanize(key)}>
                <Input placeholder={`Enter ${Utils.humanize(key)}`} />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export const CustomDatePicker = ({ onChange, value, ...rest }) => {
  const _dateChange = (_, dateString) => {
    onChange(dateString);
  };
  return (
    <DatePicker
      value={value ? moment(value) : null}
      onChange={_dateChange}
      className="w-100"
      {...rest}
      placeholder="select date"
    />
  );
};

const CheckboxList = (props) => {
  const { value, list, ...rest } = props;
  const [options, setOptions] = useState(list);

  useEffect(() => {
    if (value) return setOptions(JSON.parse(value));

    if (list) return setOptions(list);
  }, [value]);

  const _onCheckboxChange = useCallback(
    (e) => {
      let tempOptions = [...options];
      const { value } = e.target;

      const option = tempOptions.find((o) => o.id === value);
      let index = tempOptions.indexOf(option);

      if (~index) {
        tempOptions[index] = { ...option, checked: !option.checked };
      }

      const stringified = JSON.stringify(tempOptions);
      rest.onChange(stringified);
    },
    [options]
  );

  return (
    <Row gutter={16}>
      {options.map(({ name, id, checked }) => (
        <Col xs={24} md={8}>
          <Checkbox
            checked={checked}
            value={id}
            key={id}
            onChange={_onCheckboxChange}
          >
            {name}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
};

export default OtherFields;
