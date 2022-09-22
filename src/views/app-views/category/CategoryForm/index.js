import { Button, Card, Form, message, Radio, Tabs } from "antd";
import BraftEditor from "braft-editor";
import Flex from "components/shared-components/Flex";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import CategoryService from "services/Category";
import GeneralField from "./GeneralField";
import StaticPageForm from "./StaticFormFields";
const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const CategoryForm = (props) => {
  const history = useHistory();
  const [pageType, setPageType] = useState("listing");
  const { mode = ADD, param } = props;
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const save_page_data = 1;

  useEffect(() => {
    if (mode === EDIT) {
      const { id } = param;
      fetctData(id);
    }
  }, [form, mode, param, props]);

  const fetctData = async (id) => {
    try {
      const { data } = await CategoryService.get(id);
      if (data) {
        let staticData = {};
        if (data?.page_data) staticData = data?.page_data[0];
        form.setFieldsValue({
          ...data,
          ...staticData,
          // howItWork: {
          //   title: staticData?.howItWork?.title,
          //   description: staticData?.howItWork?.description,
          //   button1Text: staticData?.howItWork?.buttonText,
          //   button1Link: staticData?.howItWork?.buttonLink,
          // },
          // whatIncluded: {
          //   title: staticData?.whatIncluded?.title,
          //   description: staticData?.whatIncluded?.description,
          //   whatIncludedArray: staticData?.whatIncluded?.WhatsIncluddedArray,
          // },
          content: BraftEditor.createEditorState(data.content),
          description: BraftEditor.createEditorState(data.description),
          meta_title: data.seo.title,
          meta_description: data.seo.description,
          keywords: data.seo.keywords ? data.seo.keywords.split(",") : "",
          author: data.seo.author,
          type: data.seo.type,
          conical_tag: data.seo.canonical_tag,
        });

        setPageType(data.page_type);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        const {
          content,
          description,
          heroSection,
          whatIncluded,
          howItWork,
          bussinessLogo,
          ...rest
        } = values;

        let formdata = new FormData();
        for (let k in rest) formdata.append(k, rest[k]);
        formdata.append("content", content.toHTML());
        formdata.append("description", description.toHTML());
        formdata.append("save_page_data", "1");

        if (file && file.length > 0) formdata.append("image", file[0]);
        if (heroSection) {
          formdata.append(`heroSection[title]`, heroSection["title"]);
          formdata.append(
            `heroSection[description]`,
            heroSection["description"]
          );
          formdata.append(
            "heroSection[button1Text]",
            heroSection["button1Text"]
          );
          formdata.append(
            "heroSection[button1Link]",
            heroSection["button1Link"]
          );
          formdata.append(
            "heroSection[button2Text]",
            heroSection["button2Text"]
          );
          formdata.append(
            "heroSection[button2Link]",
            heroSection["button2Link"]
          );
          formdata.append(`heroSection[image]`, heroSection["image"]);
        }

        if (bussinessLogo && bussinessLogo?.length > 0) {
          Object.values(bussinessLogo).forEach((b, idx) => {
            formdata.append(`bussinessLogo[${idx}][image]`, b.logo);
          });
        }

        if (howItWork) {
          formdata.append(`howItWork[title]`, howItWork["title"]);
          formdata.append(`howItWork[description]`, howItWork["description"]);
          formdata.append("howItWork[button1Text]", howItWork["button1Text"]);
          formdata.append("howItWork[button1Link]", howItWork["button1Link"]);
          formdata.append(`howItWork[image]`, howItWork["image"]);
        }

        if (whatIncluded) {
          formdata.append("whatIncluded[title]", whatIncluded["title"]);
          formdata.append(
            "whatIncluded[description]",
            whatIncluded["description"]
          );
          if (
            whatIncluded?.whatIncludedArray &&
            whatIncluded?.whatIncludedArray.length > 0
          ) {
            whatIncluded?.whatIncludedArray.forEach((arr, idx) => {
              formdata.append(
                `whatIncluded[whatIncludedArray][${idx}][title]`,
                arr?.title
              );
              formdata.append(
                `whatIncluded[whatIncludedArray][${idx}][description]`,
                arr?.description
              );
              formdata.append(
                `whatIncluded[whatIncludedArray][${idx}][image]`,
                arr?.image
              );
            });
          }
        }

        if (featuredImages && featuredImages.length > 0)
          formdata.append("logo", featuredImages[0]);

        if (mode === ADD) {
          CategoryService.post(formdata, save_page_data)
            .then((res) => {
              if (res) {
                history.push("/app/category");
                message.success(`Created category`);
              }
            })
            .finally(() => {
              setSubmitLoading(false);
            });
        }
        if (mode === EDIT) {
          CategoryService.put(param.id, formdata, save_page_data)
            .then((res) => {
              history.push("/app/category");
              message.success(`Category saved`);
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

  const featuredImageUploadProps = {
    onFeaturedRemove: (f) => {
      setFeaturedImages((prev) => {
        const index = prev.indexOf(f);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeFeaturedUpload: (file) => {
      setFeaturedImages((prev) => [...prev, file]);
      return false;
    },
    fileList: file,
  };

  const pageForm = useCallback(() => {
    if (pageType === "static")
      return (
        <TabPane tab="Static Page" key="2" forceRender="true">
          <StaticPageForm />{" "}
        </TabPane>
      );
    return null;
  }, [pageType]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ page_type: pageType }}
        onValuesChange={(values) => {}}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="between"
            alignItems="center"
          >
            <h2 className="mb-3">
              {mode === "ADD" ? "Add New Category" : `Edit Category`}{" "}
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
          <Tabs defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <Card>
                <Form.Item
                  name="page_type"
                  label="Page type"
                  onChange={(e) => setPageType(e.target.value)}
                >
                  <Radio.Group>
                    <Radio value="listing">Listing</Radio>
                    <Radio value="static">Static</Radio>
                  </Radio.Group>
                </Form.Item>
              </Card>
              <GeneralField {...uploadProps} {...featuredImageUploadProps} />
            </TabPane>

            {pageForm()}
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default CategoryForm;
