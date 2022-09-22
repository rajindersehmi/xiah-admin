import { BellOutlined, MailOutlined, CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, List, Menu, notification } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useState, useEffect } from "react";
import NotificationService from "services/Notification";

import { messaging } from "configs/FirebaseConfig";
import { useHistory } from "react-router-dom";

// const getIcon = (icon) => {
//   switch (icon) {
//     case "mail":
//       return <MailOutlined />;
//     case "alert":
//       return <WarningOutlined />;
//     case "check":
//       return <CheckCircleOutlined />;
//     default:
//       return <MailOutlined />;
//   }
// };

const getNotificationBody = (list, fetchAgain, NotificationLink) => {
  const markAsRead = async (id) => {
    const res = await NotificationService.markAsRead(id);
    if (res) fetchAgain();
  };

  return list.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item className="list-clickable " style={{ position: "relative" }}>
          <div
            onClick={() => {
              NotificationLink(item);
              markAsRead(item.id);
            }}
          >
            <Flex alignItems="center">
              <div className="mr-3">
                <span className="font-weight-bold text-dark">
                  {item.title}{" "}
                </span>
                <br />
                <small className="text-gray-light">{item.description}</small>
              </div>
              <CloseOutlined
                style={{ position: "absolute", top: 5, right: 5 }}
              />
              {/* <small className="ml-auto">
              {moment(item.created_at).fromNow()}
            </small> */}
            </Flex>
          </div>
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="empty"
      />
      <p className="mt-3">You have viewed all notifications</p>
    </div>
  );
};

export const NavNotification = () => {
  let history = useHistory();
  const NotificationLink = (item) => {
    switch (item.type) {
      case "partner":
        history.push(`/app/tickets/messages/${item.type_id}`);

        break;
      case "enquiry":
        history.push(`/app/enquiries/edit-enquiry/${item.type_id}`);
        break;
      case "ticket":
        history.push(`/app/tickets/messages/${item.type_id}`);

        break;
      default:
        return <MailOutlined />;
    }
    return item;
  };

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNotifications();
    messaging.onMessage((payload) => {
      if (payload?.notification?.title)
        notification.success({ message: payload.notification.title });
      fetchNotifications();
    });
  }, []);

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  const fetchNotifications = async () => {
    try {
      const res = await NotificationService.list();
      if (res) setData(res.data);
    } catch (error) {}
  };

  const markAllAsRead = () => {
    const res = NotificationService.markAllAsRead();
    setData([]);
    if (res) fetchNotifications();
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const notificationList = (
    <div className="nav-dropdown nav-notification">
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Notification</h4>
        <Button
          className="text-primary"
          type="text"
          onClick={() => markAllAsRead()}
          size="small"
        >
          Mark all read
        </Button>
      </div>
      <div className="nav-notification-body">
        {getNotificationBody(data, fetchNotifications, NotificationLink)}
      </div>
    </div>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={notificationList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={["click"]}
    >
      <Menu mode="horizontal">
        <Menu.Item key="notification">
          <Badge count={data.length}>
            <BellOutlined className="nav-icon mx-auto" type="bell" />
          </Badge>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavNotification;
