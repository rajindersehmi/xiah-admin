import {
  CheckCircleFilled,
  GlobalOutlined,
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  SwitcherTwoTone,
  CopyOutlined,
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Modal, Card, Checkbox, Col, message, Row, Table, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";

import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { Icon } from "components/util-components/Icon";
import { env } from "configs/EnvironmentConfig";
import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "services/User";

const { confirm } = Modal;

const PartnerProfile = ({ data }) => {
  if (!data) return null;
  return (
    <Card>
      <Row justify="center">
        <Col sm={24} md={23}>
          <div className="d-md-flex">
            <Avatar
              size={100}
              shape="square"
              src={
                data?.partner_details?.logo
                  ? `${env.BASE_IMG_URL}/partner/${data.partner_details.logo}`
                  : "/img/avatars/thumb-15.jpg"
              }
            />
            <div className="ml-md-4 w-100">
              <Flex
                alignItems="center"
                mobileFlex={false}
                className="mb-3 text-md-left text-center"
              >
                <h2 className="mb-0 mt-md-0 mt-2">
                  {data?.first_name} {data?.last_name}{" "}
                  {data.partner_verified === 1 ? (
                    <CheckCircleFilled className="text-primary" />
                  ) : null}
                </h2>
              </Flex>
              <Row>
                <Col xs={24} md={12}>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={MailOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Email:</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.email}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={PhoneOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Phone:</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.phone}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={IdcardOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Company Name:</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.partner_details?.company_name ?? "N/A"}
                      </span>
                    </Col>
                  </Row>
                </Col>

                <Col xs={24} md={12}>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={FieldTimeOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Create Date</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {moment(data?.created_at).format("MMMM Do YYYY") ??
                          "N/A"}
                      </span>
                    </Col>
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={FieldTimeOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Update Date</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {moment(data?.updated_at).format("MMMM Do YYYY") ??
                          "N/A"}
                      </span>
                    </Col>
                  </Row>{" "}
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={GlobalOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Website</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.partner_details?.company_website ? (
                          <Link
                            to={{
                              pathname: data.partner_details?.company_website,
                            }}
                            target="_blank"
                          >
                            {data?.partner_details?.company_website}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={CopyOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">Business Tags</span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.partner_details?.bussiness_tags
                          ? JSON.parse(
                              data?.partner_details?.bussiness_tags
                            ).map((tag) => <Tag>{tag}</Tag>)
                          : "N/A"}
                      </span>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={12} sm={12} md={10}>
                      <Icon
                        type={UsergroupDeleteOutlined}
                        className="text-primary font-size-md"
                      />
                      <span className="text-muted ml-2">
                        Organization size:
                      </span>
                    </Col>
                    <Col xs={12} sm={12} md={14}>
                      <span className="font-weight-semibold">
                        {data?.partner_details?.organization_size ?? "N/A"}
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const WalletTransactions = ({ transactions, currentBalance }) => {
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_, el) => `${CURRENCY_SYMBOL} ${el.amount ?? 0}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, el) => (
        <Tag color={el.type === "deposit" ? "green" : "red"}>{el.type}</Tag>
      ),
    },
    {
      title: "Transaction date",
      dataIndex: "created_at",
      render: (_, el) => moment(el.created_at).format("MMM DD, YYYY"),
    },
  ];

  if (!transactions) return null;
  return (
    <Card title={`Wallet Balance: ${CURRENCY_SYMBOL} ${currentBalance ?? 0}`}>
      {/* <h4 className="text-muted">Transactions</h4> */}
      <div className="mb-3">
        <Row>
          <Col sm={24} md={22}>
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

const VerifyPartner = ({ checked, onVerify, documents }) => {
  return (
    <Card>
      <Checkbox checked={checked === 1 ? true : false} onChange={onVerify}>
        Verify Partner
      </Checkbox>
      {documents?.length > 0 && (
        <p className="mt-2">
          <p className="text-muted mb-0">Documents:</p>{" "}
          {documents.map((d) => (
            <a
              href={`${env.BASE_IMG_URL}/partner/${d.document_url}`}
              target="_blank"
              rel="noreferrer"
            >
              <Tag color="blue">{d.document_type}</Tag>
            </a>
          ))}
        </p>
      )}
    </Card>
  );
};

const ActivePlan = ({ plan }) => {
  if (!plan) return null;
  return (
    <Card title="Current Plan">
      <Row className="mb-2">
        <Col xs={12} md={6}>
          <span className="text-muted">Name:</span>
        </Col>
        <Col xs={12} md={18}>
          <span className="font-weight-bold">{plan.title}</span>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} md={6}>
          <span className="text-muted">Price:</span>
        </Col>
        <Col xs={12} md={18}>
          <span className="font-weight-bold">
            {CURRENCY_SYMBOL}
            {plan.price}/month
          </span>
        </Col>
      </Row>
      <p className="text-muted mb-0 mt-2">Benefits:</p>
      {JSON.parse(plan.benefit).map((elm, i) => (
        <p className="font-weight-bold" key={`plan-benefit-${i}`}>
          {elm}
        </p>
      ))}
    </Card>
  );
};

const Profile = (props) => {
  const param = useParams();
  const [partnerDetail, setPartnerDetail] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (param.id) fetchData(param.id);
  }, [param]);

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const res = await UserService.partnerDetails(id);
      if (res) setPartnerDetail(res?.data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyPartner = async (e) => {
    const { checked } = e.target;

    const formdata = new FormData();
    if (checked) formdata.append("verified", 1);
    else formdata.append("verified", 0);

    confirm({
      content: `Are you sure you want to ${
        checked ? "verfiy" : "unverfiy"
      } this partner?`,
      async onOk() {
        try {
          const res = await UserService.verifyPartner(
            partnerDetail.id,
            formdata
          );
          if (res) {
            fetchData(partnerDetail.id);
            message.success(
              `Partner ${checked ? "verfied" : "unverified"} successfully`
            );
          }
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="container my-4">
        <PartnerProfile data={partnerDetail} />
        <Row gutter="16">
          <Col xs={24} sm={24} md={16}>
            <WalletTransactions
              transactions={partnerDetail?.wallte_transaction}
              currentBalance={partnerDetail?.wallet?.balance}
            />
            {/* <Interested /> */}
          </Col>
          <Col xs={24} sm={24} md={8}>
            <VerifyPartner
              onVerify={verifyPartner}
              checked={partnerDetail?.partner_verified}
              documents={partnerDetail?.partner_documents}
            />

            <ActivePlan plan={partnerDetail?.partner_details?.partner_plans} />
            {/* <Group /> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
