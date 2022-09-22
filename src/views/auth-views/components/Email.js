import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input } from "antd";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  hideAuthMessage,
  loginWithEmail,
  showAuthMessage,
  showLoading,
} from "redux/actions/Auth";

function Email(props) {
  let history = useHistory();
  const {
    hideAuthMessage,
    showLoading,
    loginWithEmail,
    token,
    loading,
    redirect,
    showMessage,
    message,
  } = props;

  const initialCredential = {
    email: "admin@xiah.com",
    pass: "admin@123",
  };

  const onSignInWithEmail = (values) => {
    showLoading();
    loginWithEmail(values);
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
        onFinish={onSignInWithEmail}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="pass"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your phone number",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log In
          </Button>
        </Form.Item>
      </Form>
      {/* <Divider>
        <span className="text-muted font-weight-normal">OR</span>
      </Divider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/auth/login">Login With Phone</Link>
      </div> */}
    </>
  );
}

Email.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Email.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  loginWithEmail,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
