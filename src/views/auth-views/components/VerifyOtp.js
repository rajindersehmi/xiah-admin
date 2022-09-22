import { Alert, Button, Form, Input } from "antd";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  hideAuthMessage,
  sendOtp,
  showAuthMessage,
  showLoading,
  verifyOtp,
} from "redux/actions/Auth";

export const VerifyOtpForm = (props) => {
  let history = useHistory();

  const {
    showLoading,
    verifyOtp,
    sendOtp,
    phone,
    token,
    loading,
    showMessage,
    message,
  } = props;

  const initialCredential = {
    otp: "",
  };

  useEffect(() => {
    if (token) history.push("/");
  }, [token]);

  const onVerifyOtp = (values) => {
    showLoading();
    verifyOtp({ ...values, phone });
  };

  const onResendOtp = () => {
    showLoading();
    sendOtp({ phone });
  };

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  }, [showMessage]);

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
        onFinish={onVerifyOtp}
      >
        <Form.Item
          name="otp"
          label="Enter your otp"
          rules={[
            {
              required: true,
              message: "Please input your otp",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <p onClick={onResendOtp}>
          Didn't received otp? <span className="text-primary"> Resend otp</span>
        </p>
        {/* {phone?.phone && (
          <p>
            OTP send to number:{" "}
            <span className="font-weight-bold">{phone?.phone}</span>
          </p>
        )} */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Verify Otp
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

VerifyOtpForm.propTypes = {};

VerifyOtpForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect, verifyOtp, phone } =
    auth;
  return { loading, message, showMessage, token, redirect, verifyOtp, phone };
};

const mapDispatchToProps = {
  verifyOtp,
  sendOtp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtpForm);
