import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./style.css";

const FileBox = (props) => {
  const maxLength = 12;

  return (
    <div id="file-box" onClick={props.clickEvent}>
      {props.name ? (
        <input
          id="file-box-input"
          disabled={true}
          maxLength={maxLength}
          value={props.name}
          
        />
      ) : (
        <input
          id="file-box-input"
          autoFocus
          maxLength={maxLength}
          placeholder=" "
          onKeyDown={props.event}
          onBlur={props.toggle}
        />
      )}

      <MoreOutlined className="more-ico" />
    </div>
  );
};

export default FileBox;
