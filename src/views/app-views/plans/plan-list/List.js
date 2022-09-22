import {
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Menu,
  message,
  Modal,
  Table,
  Tooltip,
  Select,
} from "antd";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import CategoryService from "services/Category";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PlanService from "services/Plan";
import BrandService from "services/Brand";
import RetrieveDate from "services/RetrieveDate";
import Restricted from "views/app-views/permissions/Restricted";
import useRestriction from "hooks/useRestriction";
import Utils from "utils";
import { env } from "configs/EnvironmentConfig";
const { Option } = Select;
const { confirm } = Modal;

const PlanList = ({ expired }) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [brands, setBrands] = useState([]);
  const isRestricted = useRestriction();
  const [filter, setFilter] = useState({
    page: 1,
    perPage: 10,
    expired,
    category_id: "",
    plan_type: "",
    brand_id: "",
  });
  const [totalData, setTotalData] = useState(0);

  const _onFilterChange = (idx, value) =>
    setFilter((prev) => ({ ...prev, [idx]: value }));

  const _pageSizeChange = (_, pageSize) => _onFilterChange("perPage", pageSize);
  const _pageChange = (page) => _onFilterChange("page", page);

  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: _pageSizeChange,
    onChange: _pageChange,
    pageSizeOptions: [10, 20, 30, 40, 50],
    total: totalData,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };

  useEffect(() => {
    fetchAll(filter);
    fetchCategories();

    fetchBrands();
  }, [filter]);

  const fetchAll = async (params) => {
    setIsLoading(true);
    try {
      const res = await PlanService.list(params);
      setList(res.data);
      setTotalData(res.total);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.list({
        user_type: "category",
        perPage: 10000,
      });
      setCategoryList(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await BrandService.list({
        user_type: "category",
        perPage: 10000,
      });
      setBrands(res.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const PlanTypes = [
    {
      key: "broadband",
      label: "Broadband",
    },
    {
      key: "mobile",
      label: "Mobile",
    },
    {
      key: "mobile-sim",
      label: "Mobile Sim",
    },
    {
      key: "dth",
      label: "TV",
    },

    {
      key: "data-card",
      label: "Data Card",
    },
    {
      key: "satellite-broadband",
      label: "Satellite Broadband",
    },
    {
      key: "tablet",
      label: "Tablet",
    },
    {
      key: "international-sim-card",
      label: "International Sim Card",
    },
    {
      key: "broadband_tv",
      label: "Broadband + TV",
    },
    {
      key: "broadband_phone",
      label: "Broadband + Phone",
    },
    {
      key: "broadband_tv_phone",
      label: "Broadband + TV + Phone",
    },
    {
      key: "broad_tv_phone_mobile",
      label: "Broadband + TV + Phone +Mobile",
    },
  ];

  const dropdownMenu = (row) => (
    <Menu>
      <Restricted to="plan_edit">
        <Menu.Item onClick={() => viewDetails(row)}>
          <Flex alignItems="center">
            <EyeOutlined />
            <span className="ml-2">View Details</span>
          </Flex>
        </Menu.Item>
      </Restricted>
      <Restricted to="plan_delete">
        <Menu.Item onClick={() => deleteRow(row)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">
              {selectedRows.length > 0
                ? `Delete (${selectedRows.length})`
                : "Delete"}
            </span>
          </Flex>
        </Menu.Item>
      </Restricted>
    </Menu>
  );

  const addFaq = () => {
    history.push(`/app/plans/add-plan`);
  };

  const viewDetails = (row) => {
    history.push(`/app/plans/edit-plan/${row.id}`);
  };

  const viewUrl = (row) => {
    window.location.href = row.url;
  };
  const deleteRow = async (row) => {
    confirm({
      title: "Do you want to delete?",
      content:
        "When clicked the OK button, these records will be deleted permenantly.",
      async onOk() {
        try {
          const formdata = new FormData();
          if (selectedRows.length > 0)
            selectedRows.forEach((r) => {
              formdata.append("id[]", r.id);
            });
          else {
            formdata.append("id[]", row.id);
          }
          await PlanService.delete(formdata);
          setSelectedRows([]);
          message.success("Plan deleted successfully");
          fetchAll(filter);
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (date) => <RetrieveDate date={date} />,
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      render: (date) => <RetrieveDate date={date} />,
    },

    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Plan type",
      dataIndex: "plan_type",
      render: (type) => (
        <span>{type === "dth" ? "TV" : Utils.humanize(type)}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category) => <span>{category?.name ?? ""}</span>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (brand) => <span>{brand?.name}</span>,
    },
    {
      title: "User Clicks",
      dataIndex: "plan_analytic_count",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex align-items-center justify-content-end">
          <Tooltip title="URL Link">
            <Link
              to={{ pathname: `${env?.CUSTOMER_URL}plans/${elm?.url}` }}
              target={"_blank"}
              rel="noopener noreferrer"
            >
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                size="small"
              />
            </Link>
          </Tooltip>
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    _onFilterChange("q", value);
  };

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Category</p>
              <Select
                value={filter?.category_id ?? ""}
                onChange={(value) => _onFilterChange("category_id", value)}
                placeholder="Select category"
                style={{ minWidth: "200px" }}
              >
                <Option value="">All</Option>
                {categoryList?.map((category) => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </div>
          </Flex>{" "}
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <Flex className="mb-1" mobileFlex={false} alignItems="center">
              <div className="mr-md-3 mb-3">
                <p className="text-muted mb-1">Plan Type</p>
                <Select
                  value={filter?.plan_type ?? ""}
                  onChange={(value) => _onFilterChange("plan_type", value)}
                  placeholder="Select category"
                  style={{ minWidth: "200px" }}
                >
                  <Option value="">All</Option>
                  {PlanTypes.map((plan) => (
                    <Option value={plan.key}>{plan.label}</Option>
                  ))}
                </Select>
              </div>
            </Flex>
          </Flex>
          <Flex className="mb-1" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3">
              <p className="text-muted mb-1">Brand</p>
              <Select
                value={filter?.brand_id ?? ""}
                onChange={(value) => _onFilterChange("brand_id", value)}
                placeholder="Select category"
                style={{ minWidth: "200px" }}
              >
                <Option value="">All</Option>
                {brands?.map((brand) => (
                  <Option value={brand.id}>{brand.name}</Option>
                ))}
              </Select>
            </div>
          </Flex>
          <Flex className="mb-1 mt-4" mobileFlex={false} alignItems="center">
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Search123"
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e)}
                allowClear
              />
            </div>
          </Flex>{" "}
          <Flex>
            {selectedRows.length > 0 ? (
              <Restricted to="plan_delete">
                <Button
                  onClick={deleteRow}
                  type="danger"
                  icon={<DeleteOutlined />}
                  className="mr-3"
                  block
                >
                  Delete ({selectedRows.length})
                </Button>
              </Restricted>
            ) : null}
            <div>
              <Restricted to="plan_create">
                <Button
                  onClick={addFaq}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  Add Plan
                </Button>
              </Restricted>
            </div>
          </Flex>
        </Flex>
        <div className="table-responsive">
          <Table
            loading={isLoading}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            rowSelection={
              !isRestricted("blog_delete")
                ? {
                    selectedRowKeys: selectedRowKeys,
                    type: "checkbox",
                    preserveSelectedRowKeys: false,
                    ...rowSelection,
                  }
                : null
            }
            pagination={{
              ...paginationOptions,
              total: totalData,
              current: filter.page,
              pageSize: filter.perPage,
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default PlanList;
