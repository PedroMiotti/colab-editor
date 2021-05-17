import React, { useState } from "react";
import './style.css';

// Router-dom
import { useParams } from "react-router-dom";

// Assets
// import { runCode } from "../../api/runCode.js";

// Components
import { customNotification } from '../Notification';

// Icons
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CopyFilled,
  } from "@ant-design/icons";


const Navbar = ({ runCode }) => {
  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [codeToSubmit, setCodeToSubmit] = useState("");
  const [stdin, setStdin] = useState("");

  const username = localStorage.getItem("username");

  // copy id to clipboard
  const { namespaceId } = useParams();
  const url = namespaceId;

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
    customNotification("success", "bottomRight", "Copiado para a área de transferência", "copyNotification", 1.5  );
  };

  return (
    <div id="navbar-editor">
      <div className="navbar-main">
        <h1>ALL.CO</h1>
      </div>

      <div className="navbar-config">

        <div className="run"></div>

        <button className="run-button" onClick={runCode}>
          <CaretRightOutlined className="play-ico" />
        </button>
      </div>

      <div className="navbar-info">
        <h2>{username}/</h2>
        <button className="btn-copy" value={url} onClick={copyToClipboard}>
          <CopyFilled className="copy-icon" />
          Link
        </button>
      </div>
    </div>
  );
};

export default Navbar;
