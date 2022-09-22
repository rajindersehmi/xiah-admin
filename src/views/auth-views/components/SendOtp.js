import { PhoneOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input } from "antd";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  hideAuthMessage,
  sendOtp,
  showAuthMessage,
  showLoading,
} from "redux/actions/Auth";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    hideAuthMessage,
    showLoading,
    sendOtp,
    token,
    loading,
    redirect,
    showMessage,
    message,
  } = props;

  const initialCredential = {
    phone: "7018064278 ",
  };

  const onSendOtp = (values) => {
    showLoading();
    sendOtp(values);
  };

  useEffect(() => {
    if (redirect) history.push(redirect);
  }, [redirect]);

  useEffect(() => {
    if (token !== null) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={onSendOtp}
      >
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Send OTP
          </Button>
        </Form.Item>
      </Form>
      <Divider>
        <span className="text-muted font-weight-normal">OR</span>
      </Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/auth/login/email">Login With Email</Link>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  sendOtp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
