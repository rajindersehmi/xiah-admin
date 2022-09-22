import { Button, Form, message } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BrandService from "services/Brand";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const history = useHistory();
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
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
      const res = await BrandService.get(id);
      if (res)
        form.setFieldsValue({
          ...res.brand,
          content: BraftEditor.createEditorState(res?.brand?.content),
          description: BraftEditor.createEditorState(res?.brand?.description),
          award_id: res?.brand?.award_brands?.map((award) => award.id),
          tag_id: res?.brand?.tags?.map((tag) => tag.id),
          category_id: res?.brand?.brand_category.map((b) => b.id),
          meta_title: res?.brand?.seo.title,
          meta_description: res?.brand?.seo.description,
          keywords: res?.brand.seo.keywords
            ? res?.brand.seo.keywords.split(",")
            : "",
          author: res?.brand?.seo.author,
          type: res?.brand?.seo.type,
          conical_tag: res?.brand?.seo.canonical_tag,
        });
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
          award_id,
          tag_id,
          category_id,
          plan_id,
          phone,
          ...rest
        } = values;
        for (let k in rest) formdata.append(k, rest[k]);
        formdata.append("description", description.toHTML());
        formdata.append("content", content.toHTML());
        formdata.append("phone", Number(phone));
        if (award_id?.length > 0)
          award_id.forEach((b) => formdata.append("award_id[]", b));
        if (tag_id?.length > 0)
          tag_id.forEach((b) => formdata.append("tag_id[]", b));
        if (category_id?.length > 0)
          category_id.forEach((b) => formdata.append("category_id[]", b));

        if (file && file.length > 0) formdata.append("logo", file[0]);
        if (mode === ADD) {
          BrandService.post(formdata)
            .then((res) => {
              history.push("/app/brands");
              message.success(`Created brand`);
            })

            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          BrandService.put(param.id, formdata)
            .then((res) => {
              history.push("/app/brands");
              message.success(`Brand saved`);
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
    // .finally(() => {
    //   setSubmitLoading(false);
    // });
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
              {mode === "ADD" ? "Add New Brand" : `Edit Brand`}{" "}
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
          <GeneralField {...uploadProps} />
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
