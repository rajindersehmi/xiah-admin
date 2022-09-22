import {
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, message, Table, Tag } from "antd";
import Flex from "components/shared-components/Flex";

import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import PermissionService from "services/Permissions";

import moment from "moment";
import RevokeModal from "./RevokeModal";
import AddRoleModal from "./AddRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import { useSelector } from "react-redux";
import Restricted from "../Restricted";

const PermissionsList = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
  });
  const [permissionData, setPermissionData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [revokeModal, setRevokeModal] = useState({
    show: false,
    role_id: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    role_id: null,
  });
  const [addRoleModal, setAddRoleModal] = useState({
    show: false,
  });

  const openRevoke = (row) => {
    setRevokeModal({ show: true, role_id: row.id });
  };
  const openDelete = (row) => {
    setDeleteModal({ show: true, role_id: row.id });
  };

  const closeDelete = () => {
    setDeleteModal({ show: false, role_id: null });
  };
  const closeRevoke = (row) => {
    setRevokeModal({ show: false, role_id: null });
    fetchAllRoles();
  };

  const closeAddRole = (row) => {
    setAddRoleModal({ show: false });
  };

  const _onFilterChange = (idx, value) =>
    setFilter((prev) => ({ ...prev, [idx]: value }));

  useEffect(() => {
    fetchAllPermissions();
    fetchAllRoles(filter);
  }, [filter]);

  const fetchAllPermissions = async () => {
    setIsLoading(true);
    try {
      const res = await PermissionService.getAll();
      setPermissionData(res.data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllRoles = async (params) => {
    setIsLoading(true);
    try {
      const res = await PermissionService.getRolesWithPermission(params);
      setRolesData(res.role);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRole = async () => {
    try {
      let formData = new FormData(); //formdata object
      formData.append("id", deleteModal.role_id);
      const res = await PermissionService.deleteRole(formData);
      message.success(res.message);
      closeDelete();
      fetchAllRoles();
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tableColumns = [
    {
      title: "Role",
      dataIndex: "name",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions) => (
        <>
          {permissions.map((per) => {
            return (
              <Tag key={per} color="blue" style={{ marginBottom: "5px" }}>
                {per.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex justifyContent="end">
          <Button
            type="primary"
            onClick={() => history.push(`/app/permissions/edit-role/${elm.id}`)}
          >
            Give
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            onClick={() => openRevoke(elm)}
          >
            Revoke
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            onClick={() => openDelete(elm)}
          >
            <DeleteOutlined />
          </Button>
        </Flex>
      ),
    },
  ];
  const permissionColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (date) => <span>{moment(date).format("DD MMM YYYY")} </span>,
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  // const isAdmin = useMemo(() => {
  //   if (auth?.user?.role?.length > 0)
  //     if (auth.user.role[0].name === "admin") return true;

  //   return false;
  // }, [auth]);

  return (
    <>
      <Restricted to={"permission_view"}>
        <Card>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}>
              <div className="mr-md-3 mb-3">
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={(e) => onSearch(e)}
                />
              </div>
            </Flex>
            <Flex>
              {/* {selectedRows.length > 0 ? (
                <Button
                  onClick={deleteRow}
                  type="danger"
                  icon={<DeleteOutlined />}
                  className="mr-3"
                  block
                >
                  Delete ({selectedRows.length})
                </Button>
              ) : null} */}
              <div>
                <Button
                  onClick={() => setAddRoleModal({ show: true })}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Role
                </Button>
              </div>
            </Flex>
          </Flex>
          <div className="table-responsive">
            <Table
              loading={isLoading}
              columns={tableColumns}
              dataSource={rolesData}
              pagination={false}
              rowKey={(obj) => {
                return `${obj} ${Math.random * 100}`;
              }}
              // pagination={{
              //   ...paginationOptions,
              //   total: totalData,
              //   current: filter.page,
              //   pageSize: filter.perPage,
              // }}
            />
          </div>
        </Card>

        <Card title="Permissions list">
          <div className="table-responsive">
            <Table
              columns={permissionColumns}
              dataSource={permissionData}
              pagination={false}
            />
          </div>
        </Card>
        <RevokeModal
          openModal={openRevoke}
          closeModal={closeRevoke}
          revokeModal={revokeModal}
        />
        <AddRoleModal
          addModal={addRoleModal}
          closeModal={() => closeAddRole()}
        />
        <DeleteRoleModal
          show={deleteModal.show}
          closeModal={closeDelete}
          deleteRole={deleteRole}
        />
      </Restricted>
    </>
  );
};

export default PermissionsList;
