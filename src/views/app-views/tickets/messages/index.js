import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TicketService from "services/Tickets";
import classes from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { env } from "configs/EnvironmentConfig";
import Utils from "utils";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";

const Messages = (props) => {
  const [data, setData] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEnd = useRef(null);

  const scrolltoBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const { id } = props.match.params;
    fetchData(id);
    scrolltoBottom();
  }, [props]);

  useEffect(() => {
    scrolltoBottom();
  }, [data]);

  const fetchData = async (id) => {
    try {
      const res = await TicketService.get(id);
      if (res) {
        setData(res?.["data model"]);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const sendMessage = async (id) => {
    form.validateFields().then(async (vals) => {
      let formdata = new FormData();
      for (let k in vals) formdata.append(k, vals[k]);
      try {
        setIsSubmiting(true);
        await TicketService.sendMessage(id, formdata).then((res) => {
          form.resetFields();
          fetchData(id);
        });
      } finally {
        setIsSubmiting(false);
      }
    });
  };

  const updateStatus = useCallback(async (status) => {
    const formdata = new FormData();
    formdata.append("status", status);
    try {
      setLoading(true);
      const id = props.match.params.id;
      const res = await TicketService.updateStatus(id, formdata);
      if (res) fetchData(id);
      message.success("Status updated successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const [form] = Form.useForm();

  if (!data) <div></div>;

  return (
    <div>
      <Card>
        <Row>
          <Col xs={24} md={12}>
            <h2 className="mb-3">{data?.title}</h2>
            <p>{data?.description}</p>
            <p>Enquiry Regarding: {data?.related_to}</p>
            <p>
              Created At:{" "}
              {moment(data?.created_at).local().format("DD-MM-YYYY HH:mm:ss")}
            </p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              gap: "20px",
            }}
          >
            <Flex>
              <div>
                <Tag color={data?.status === "closed" ? "green" : "gold"}>
                  {data?.status}
                </Tag>
              </div>
              {loading ? (
                <Spin size="small" />
              ) : (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    updateStatus(data.status === "active" ? "closed" : "active")
                  }
                >
                  <Tag color="blue">
                    {data?.status === "active" ? "Close" : "Open"} Ticket
                  </Tag>
                </div>
              )}
            </Flex>
          </Col>
        </Row>
      </Card>
      <Row gutter={6}>
        <Col xs={24} md={12}>
          <Card title="User Info">
            <Flex alignItems="center" justifyContent="between">
              <AvatarStatus
                icon={<UserOutlined />}
                src={env.BASE_IMG_URL + "/user/" + data?.user?.profile_picture}
                name={`${data?.user?.first_name} ${data?.user?.last_name}`}
              />
              <Link to={`/app/users/edit-user/${data?.user?.id}`}>
                View Profile
              </Link>
            </Flex>
            <p className="mt-2">E-mail: {data?.user?.email}</p>
            <p>User Type: {data?.user?.user_type}</p>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Enquiry Info">
            <p>
              Reference ID:{" "}
              <Link
                to={`/app/enquiries/edit-enquiry/${data?.enquiry?.reference_id}`}
              >
                {data?.enquiry?.reference_id}
              </Link>
            </p>
            <p>
              Enquiry Type: {Utils.humanize(data?.enquiry?.enquiry_type ?? "")}
            </p>
            <p>Remarks: {data?.enquiry?.remarks}</p>
          </Card>
        </Col>
      </Row>
      <Card>
        <Row className={classes.messageCont}>
          {data?.messages.map((ele, id) => (
            <Col
              xs={24}
              key={`message-${id}`}
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection:
                  ele.user.user_type !== "admin" ? "row" : "row-reverse",
                gap: "20px",
              }}
            >
              <Avatar
                size={30}
                src={`${env.BASE_IMG_URL}/user/${ele.user.profile_picture}`}
              />
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h5 style={{ margin: "0" }}>
                    {ele.user.first_name ?? "No Name"}{" "}
                    {ele.user.first_name ? ele.user.last_name ?? "NA" : ""}
                  </h5>
                  <p style={{ margin: 0 }}>
                    ( {moment(ele.created_at).fromNow(true)} ago )
                  </p>
                </div>

                <p>{ele.message}</p>
              </div>
            </Col>
          ))}
          <div ref={messageEnd}></div>
        </Row>
        <Form name="basic" autoComplete="off" form={form}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={17}>
              <Form.Item name="message">
                <Input placeholder="Send a message" disabled={isSubmiting} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7}>
              <Flex justifyContent="end">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isSubmiting}
                  disabled={isSubmiting}
                  onClick={() => sendMessage(data?.id)}
                >
                  Send Message
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Messages;
