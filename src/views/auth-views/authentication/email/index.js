import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import Email from "views/auth-views/components/Email";
const Login = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <div className={`h-100 ${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="align-items-stretch h-100 w-100">
        <Col xs={20} sm={20} md={24} lg={24}>
          <div className="container d-flex flex-column justify-content-center pt-7">
            <Row justify="center">
              <Col
                xs={24}
                sm={24}
                md={20}
                lg={10}
                xl={8}
                style={{
                  maxWidth: "100%",
                  flex: "auto",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <h1 style={{ marginBottom: "0rem", fontSize: "25px" }}>
                  Let's get managing this letter...
                </h1>
                <p style={{ fontSize: "16px", marginBottom: "0em" }}>
                  Continue with your mobile number or email
                </p>
                <div>
                  <Email {...props} />
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
