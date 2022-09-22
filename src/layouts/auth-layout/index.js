import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthViews from "views/auth-views";
import Loading from "components/shared-components/Loading";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Row, Col } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";

export const AuthLayout = () => {
  const { status } = useThemeSwitcher();

  const data = [
    {
      title:
        "  Strength and growth come only through continuous effort and struggle",
    },
    {
      title: "  Mistakes are the growing pains of wisdom.",
    },
    {
      title: "  Every problem is a gift- without problems we would not grow.",
    },
    {
      title: "  Out of your vulnerabilities will come your strength.",
    },
    {
      title:
        "The Harder you work for something, The greater you will feel when you achieve it.",
    },
  ];

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)),url(/img/bg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            border: "1px solid #ffffff20",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          className=""
        >
          <Row className="flex-column-reverse flex-md-row">
            <Col
              xs={24}
              md={12}
              style={{
                borderRight: "1px solid #2d2e2e",
                backgroundColor: "black",
              }}
              // className="d-none d-md-flex"
            >
              <div className="p-3 d-flex flex-column ">
                <h1 style={{ fontSize: "24px" }}>
                  Telecom <span className="text-primary">Supermarket</span> UK
                </h1>

                <p style={{ fontSize: "16px" }}>
                  Grow this platform and create problem solving statement.
                </p>

                {data.map((items, i) => {
                  return (
                    <Flex className="mb-2" key={i}>
                      <CheckOutlined style={{ color: "green" }} />
                      <p
                        style={{
                          fontSize: "12px",
                          marginLeft: "6px",
                        }}
                      >
                        {items.title}
                      </p>
                    </Flex>
                  );
                })}
              </div>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{
                backgroundColor: "black",
              }}
            >
              <div className="w-100 p-3">
                <Switch>
                  <Route path="" component={AuthViews} />
                </Switch>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className="d-flex pt-2"
          style={{
            width: "100%",
            maxWidth: "800px",
            justifyContent: "space-between",
          }}
        ></div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
        }}
        className="d-none d-md-flex"
      >
        <Link to="/terms-of-use">
          <p style={{ cursor: "pointer" }}>Term & Conditions</p>
        </Link>
        <p style={{ padding: "0px 20px" }}>|</p>
        <Link to="/privacy-policy">
          <p style={{ cursor: "pointer" }}>Privacy & Policy</p>
        </Link>
      </div>
    </>
  );
};

export default AuthLayout;
