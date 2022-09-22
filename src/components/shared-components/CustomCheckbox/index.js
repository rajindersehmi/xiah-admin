import { Checkbox } from "antd";
import React, { useEffect } from "react";

const CustomCheckbox = ({ children, ...rest }) => {
  useEffect(() => {
    if (rest.checked) {
      return rest.onChange(1);
    }
    rest.onChange(0);
  }, [rest.checked]);
  return <Checkbox {...rest}>{children}</Checkbox>;
};

export default CustomCheckbox;
