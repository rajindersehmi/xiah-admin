import React from "react";
import SendOtp from "../../components/SendOtp";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
const Login = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  return (
    <div className={`${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="w-100">
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="container d-flex flex-column justify-content-center pt-7">
            <Row justify="center">
              <Col
                xs={24}
                sm={24}
                md={20}
                lg={10}
                xl={8}
                style={{ maxWidth: "100%", flex: "auto", paddingTop: "20px" }}
              >
                <h1 style={{ fontSize: "25px" }}>
                  Let's get managing this letter...
                </h1>
                <p style={{ fontSize: "16px" }}>
                  Continue with your mobile number or email
                </p>
                <div className="mt-2">
                  <SendOtp {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
