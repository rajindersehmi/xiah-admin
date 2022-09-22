import React from "react";
import VerifyOtp from "../../components/VerifyOtp";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
const Verify = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <div className={`${theme === "light" ? "bg-white" : ""}`}>
      <Row justify="center" className="w-100">
        <Col xs={20} sm={20} md={24} lg={24}>
          <div className="container d-flex flex-column justify-content-center h-100">
            <Row justify="center">
              <Col
                xs={24}
                sm={24}
                md={20}
                lg={10}
                xl={8}
                style={{ maxWidth: "100%", flex: "auto", paddingTop: "20px" }}
              >
                <h1>Verify Otp</h1>
                <div className="mt-2">
                  <VerifyOtp {...props} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Verify;
