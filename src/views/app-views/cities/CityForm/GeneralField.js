import { Card, Col, Form, Input, Row } from "antd";
import CustomCheckbox from "components/shared-components/CustomCheckbox";
import React from "react";
import utils from "utils";

const rules = {
  required: [
    {
      required: true,
      message: "This field is required",
    },
  ],
};
const formStructure = {
  district: {
    col: 12,
    rules: rules.required,
  },
  country: {
    col: 12,
    rules: rules.required,
  },
  postcode: {
    col: 6,
    rules: rules.required,
  },
  ward: {
    col: 6,
    rules: rules.required,
  },
  district_code: {
    col: 6,
    rules: [],
  },
  county_code: {
    col: 6,
    rules: [],
  },
  grid_ref: {
    col: 6,
    rules: [],
  },
  county: {
    col: 12,
    rules: [],
  },
  ward_code: {
    col: 6,
    rules: [],
  },
  constituency: {
    col: 6,
    rules: [],
  },
  introduced: {
    col: 12,
    rules: [],
  },
  parishd: {
    col: 12,
    rules: [],
  },
  national_park: {
    col: 12,
    rules: [],
  },
  population: {
    col: 12,
    rules: [],
  },
  built_up_area: {
    col: 12,
    rules: [],
  },
  built_up_sub_division: {
    col: 12,
    rules: [],
  },

  rural_urban: {
    col: 6,
    rules: [],
  },

  london_zone: {
    col: 6,
    rules: [],
  },

  lsoa_code: {
    col: 6,
    rules: [],
  },

  local_authority: {
    col: 6,
    rules: [],
  },

  msoa_code: {
    col: 6,
    rules: [],
  },
  parish_code: {
    col: 6,
    rules: [],
  },

  census_output_area: {
    col: 6,
    rules: [],
  },
  constituency_code: {
    col: 6,
    rules: [],
  },

  lower_layer_super_output_area: {
    col: 12,
    rules: [],
  },
  middle_layer_super_output_area: {
    col: 12,
    rules: [],
  },

  index_of_multiple_deprivation: {
    col: 12,
    rules: [],
  },

  quality: {
    col: 6,
    rules: [],
  },

  user_type: {
    col: 6,
    rules: [],
  },

  nearest_station: {
    col: 6,
    rules: [],
  },

  distance_to_station: {
    col: 12,
    rules: [],
  },

  postcode_area: {
    col: 6,
    rules: [],
  },
  postcode_district: {
    col: 6,
    rules: [],
  },
  police_force: {
    col: 6,
    rules: [],
  },
  water_company: {
    col: 6,
    rules: [],
  },

  plus_code: {
    col: 6,
    rules: [],
  },
  average_income: {
    col: 6,
    rules: [],
  },
  sewage_company: {
    col: 6,
    rules: [],
  },
  region: {
    col: 6,
    rules: [],
  },
  northing: {
    col: 6,
    rules: [],
  },
  easting: {
    col: 6,
    rules: [],
  },
  households: {
    col: 6,
    rules: [],
  },
  altitude: {
    col: 6,
    rules: [],
  },
  longitude: [
    {
      col: 6,
      rules: rules.required,
    },
  ],
  latitude: [
    {
      col: 6,
      rules: rules.required,
    },
  ],
};

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={16}>
            {Object.entries(formStructure).map((input) => (
              <Col xs={24} sm={24} md={input[1].col}>
                <Form.Item
                  name={input[0]}
                  label={utils.humanize(input[0])}
                  rules={input[1].rules}
                >
                  <Input placeholder={utils.humanize(input[0])} />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Other info">
          <Form.Item name="latitude" label="Latitude" rules={rules.required}>
            <Input placeholder="Latitude" />
          </Form.Item>
          <Form.Item name="longitude" label="Longitude" rules={rules.required}>
            <Input placeholder="Longitude" />
          </Form.Item>

          <Form.Item name="in_use" valuePropName="checked">
            <CustomCheckbox>In use?</CustomCheckbox>
          </Form.Item>
          <Form.Item name="is_terminated" valuePropName="checked">
            <CustomCheckbox>Is terminated?</CustomCheckbox>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
