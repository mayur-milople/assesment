import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import "antd/dist/antd.css";

const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const RendorCropImage = ({ getImageArray, imgArray }) => {
  const [fileList, setFileList] = useState(imgArray);

  const onChange = ({ fileList: newFileList }) => {
    getImageArray(newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  return (
    <ImgCrop grid rotate>
      <Upload
        listType="picture-card"
        maxCount={1}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 3 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default RendorCropImage;
