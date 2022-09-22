import { Card, Button, Modal, Form, message, Table } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import { env } from "configs/EnvironmentConfig";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BusinessListingService from "services/BusinessListingService";
import GeneralField from "./GeneralField";
const { confirm } = Modal;

const ADD = "ADD";
const EDIT = "EDIT";

const ListingForm = (props) => {
  const history = useHistory();
  const [partnerId, setPartnerId] = useState(null);
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [claimingData, setClaimingData] = useState([]);
  const [file, setFile] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const { data } = await BusinessListingService.get(id);
      if (!data) return;

      setPartnerId(data?.partners_id);
      form.setFieldsValue({
        ...data,
        award_id: data.award_bussiness.map((a) => a.id),
        tag_id: data?.tags?.map((tag) => tag.id)
          ? data?.tags?.map((tag) => tag.id)
          : [],
        category_id: data.bussiness_category.map((b) => b.id),
        description: BraftEditor.createEditorState(data?.description),
        content: BraftEditor.createEditorState(data?.content),
        specifications: BraftEditor.createEditorState(data?.specifications),
        users: data.users ? JSON.parse(data?.users) : [],
        features: data.features ? JSON.parse(data?.features) : [],
        available_support: data?.available_support
          ? JSON.parse(data.available_support)
          : [],
      });

      if (data?.is_claimed !== 1) fetchClaimingData(id);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchClaimingData = async (id) => {
    try {
      const { data } = await BusinessListingService.getClaiming(id);
      if (data) setClaimingData(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        let formdata = new FormData();
        const {
          description,
          content,
          specifications,
          category_id,
          award_id,
          users,
          features,
          available_support,
          tag_id,
          ...rest
        } = values;

        for (let k in rest) if (rest[k]) formdata.append(k, rest[k] ?? "");
        if (description) formdata.append("description", description.toHTML());
        if (content) formdata.append("content", content.toHTML());
        if (tag_id?.length > 0)
          tag_id.forEach((b) => formdata.append("tag_id[]", b));
        if (specifications)
          formdata.append("specifications", specifications.toHTML());
        formdata.append("contact_number", Number(rest.contact_phone));
        if (partnerId) formdata.append("partners_id", partnerId);
        if (category_id)
          category_id.forEach((id) => formdata.append("category_id[]", id));
        if (award_id)
          award_id.forEach((id) => formdata.append("award_id[]", id));
        formdata.append("users", JSON.stringify(users));
        formdata.append("features", JSON.stringify(features));
        formdata.append("available_support", JSON.stringify(available_support));
        // if (location_id)
        //   location_id?.forEach((id) =>
        //     formdata.append("location_id[]", Number(id))
        //   );

        if (mode === ADD) {
          BusinessListingService.post(formdata)
            .then((res) => {
              history.push("/app/business-listing");
              message.success(`Listing created`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          BusinessListingService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/business-listing");
              message.success(`Listing saved`);
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      })
      .catch((info) => {
        message.error("Please enter all required field ");
        setSubmitLoading(false);
      });
  };

  const uploadProps = {
    onRemove: (f) => {
      setFile((prev) => {
        const index = prev.indexOf(f);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFile((prev) => [...prev, file]);
      return false;
    },
    fileList: file,
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Partner",
      dataIndex: "claimed_by",
      render: (_, record) =>
        `${record?.claimed_by?.first_name} ${record?.claimed_by?.last_name}`,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Documents",
      dataIndex: "verification_document",
      render: (_, record) => (
        <div>
          {record?.verification_document?.map((doc, index) => (
            <a
              key={index}
              href={`${env.BASE_IMG_URL}/bussiness_listing_claim/${doc.document_url}`}
              target="_blank"
              rel="noreferrer"
            >
              {doc.document_type}
            </a>
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="d-flex">
          <Button
            type="primary"
            onClick={() => updateClaim(elm.claimed_by?.id, "approved")}
          >
            Approve
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => updateClaim(elm.claimed_by?.id, "rejected")}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const updateClaim = (partnerId, status) => {
    const { id } = param;
    const formdata = new FormData();
    formdata.append("status", status);
    formdata.append("partner_id", partnerId);

    confirm({
      content: `Are you sure you want to ${status} this listing claim?`,
      async onOk() {
        try {
          const res = await BusinessListingService.updateClaim(id, formdata);
          if (res) {
            message.success(`Claim updated`);
            if (status === "approved") history.push("/app/business-listing");
            fetchClaimingData(id);
          }
        } catch (error) {
          message.error(error.message);
        }
      },
      onCalcel() {},
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">
              {mode === "ADD" ? "Add New Listing" : `Edit Listing`}{" "}
            </h2>
            <div className="mb-3">
              <Button className="mr-2" onClick={() => history.goBack()}>
                Discard
              </Button>
              <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={submitLoading}
                disabled={submitLoading}
              >
                {mode === "ADD" ? "Add" : `Save`}
              </Button>
            </div>
          </Flex>
          {claimingData && claimingData.length > 0 ? (
            <Card title="Claims">
              <Table
                columns={tableColumns}
                dataSource={claimingData}
                pagination={false}
              />
            </Card>
          ) : null}

          <GeneralField {...uploadProps} />
        </div>
      </Form>
    </>
  );
};

export default ListingForm;
