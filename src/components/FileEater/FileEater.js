import React, { useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";
import { Button } from "@chakra-ui/react";

const Descriptor = ({ status, file, requestRemove }) => {
  const style = {
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #e9e9e9",
    textAlign: "center",
    color: "#666666",
  };
  const activeStyle = {
    ...style,
    border: "1px solid #1890ff",
  };
  console.log(file);
  if (status === "dropped")
    return (
      <div style={activeStyle}>
        {/* <FileDoneOutlined style={{ fontSize: "32px" }} /> */}
        <br />
        파일이 선택되었습니다
        <div style={{ fontSize: "10px" }}>
          <br />
          파일명: {file?.name}
          <br />
          파일 크기: {(file?.size / (1024 * 1024)).toFixed(2)}MB
        </div>
        <br />
        <Button danger onClick={requestRemove}>
          삭제
        </Button>
      </div>
    );
  if (status === "dragOver")
    return (
      <div style={activeStyle}>
        {/* <FileAddOutlined style={{ fontSize: "32px" }} /> */}
        <br />
        이곳에 파일을 드롭하세요!
      </div>
    );
  return (
    <div style={style}>
      {/* <FileAddOutlined style={{ fontSize: "32px" }} /> */}
      <br />
      이곳에 파일을 드래그&드롭 하세요
    </div>
  );
};
const FileEater = ({ sizeLimit = Number.MAX_SAFE_INTEGER, onChangeFile = (file) => {} }) => {
  const [status, setStatus] = useState();
  const [files, setFiles] = useState();
  useEffect(() => {
    console.log("files", files);
    if (files) {
      let ok = true;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > sizeLimit) {
          ok = false;
          break;
        }
      }

      if (!ok) {
        alert("파일 크기 제한을 초과했습니다");
        setFiles(null);
        setStatus(null);
      } else {
        onChangeFile(files[0]);
      }
    } else {
      onChangeFile(null);
    }
  }, [files]);
  return (
    <div>
      <FileDrop
        onFrameDragEnter={(event) => {
          console.log("onFrameDragEnter", event);
        }}
        onFrameDragLeave={(event) => {
          console.log("onFrameDragLeave", event);
        }}
        onFrameDrop={(event) => {
          console.log("onFrameDrop", event);
        }}
        onDragOver={(event) => {
          console.log("onDragOver", event);
          setStatus("dragOver");
        }}
        onDragLeave={(event) => {
          if (status !== "dropped") setStatus(null);
          console.log("onDragLeave", event);
        }}
        onDrop={(files, event) => {
          setStatus("dropped");
          setFiles(files);
          console.log("onDrop!", files, event);
        }}
      >
        <Descriptor
          status={status}
          file={files ? files[0] : null}
          requestRemove={() => {
            setStatus(null);
            setFiles(null);
          }}
        >
          {/* <FileAddOutlined style={{ fontSize: "32px" }} /> */}
          <br />
          이곳에 파일을 드래그&드롭 하세요
        </Descriptor>
      </FileDrop>
    </div>
  );
};

export default FileEater;
