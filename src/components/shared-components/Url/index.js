import { Form, Input } from "antd";

const rules = {
  url: [
    {
      required: true,
      //   pattern: new RegExp("[a-zA-Z]+.[a-zA-Z]+"),
      message: "Please fill this field",
    },
    {
      pattern: new RegExp("^[a-zA-Z0-9_.-]*$"),

      message: "please enter a valid url(special charcter not allowed)",
    },
  ],
};
const Url = (props) => {
  return (
    <Form.Item name="url" label="Url" rules={rules.url}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};

export default Url;
