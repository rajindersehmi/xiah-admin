import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, message } from "antd";
import { env } from "configs/EnvironmentConfig";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser, signOut } from "redux/actions/Auth";
import UserService from "services/User";

export const NavProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await UserService.loggedIn();
      dispatch(fetchUser(res.data));
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("auth_token");
    window.location.reload();
    history.push("/auth/login");
  };

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar
            size={45}
            src={`${env.BASE_IMG_URL}/user/${user?.profile_picture}`}
          />
          <div className="pl-3">
            <h4 className="mb-0">
              {user?.first_name ?? "N/A"} {user?.last_name ?? ""}
            </h4>
            <span className="text-muted">{user?.user_type ?? ""}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item onClick={(e) => handleSignout()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={`${env.BASE_IMG_URL}/user/${user?.profile_picture}`} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
