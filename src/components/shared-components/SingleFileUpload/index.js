import { DeleteOutlined } from "@ant-design/icons";
import { Image, Input } from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { env } from "configs/EnvironmentConfig";
import { MAX_FILE_SIZE } from "constants/ApiConstant";
import React, { useState } from "react";

const SingleFileUpload = (props) => {
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]?.size > MAX_FILE_SIZE) {
      setError("Max file upload limit is 1 MB");
    } else {
      setError(null);
      props.onChange(e.target.files[0]);
    }
  };
  return (
    <>
      <div>
        <label>
          <Input
            type="file"
            onChange={handleChange}
            className="d-none"
            accept="image/png, image/jpeg"
          />
          <CustomIcon className="display-3" svg={ImageSvg} />
          <p>Click to upload</p>
        </label>
        {error && <p className="text-danger">{error}</p>}
      </div>

      {props?.value && (
        <div className="w-100 d-flex align-items-center justify-content-between">
          <Image
            src={
              typeof props.value === "string"
                ? `${env.BASE_IMG_URL}/${props.folder}/${props.value}`
                : URL.createObjectURL(props.value)
            }
            style={{ height: 80, width: 100, objectFit: "contain" }}
            className="mt-2"
          />

          <DeleteOutlined onClick={() => props.onChange(null)}>
            remove
          </DeleteOutlined>
        </div>
      )}
    </>
  );
};

export default SingleFileUpload;
