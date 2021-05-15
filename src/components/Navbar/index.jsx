import React, { useState } from "react";
import './style.css';

// Router-dom
import { useParams } from "react-router-dom";

// Assets
import { languages } from "../../assets/languages.js";
import { runCode } from "../../api/runCode.js";

// Components
import { customNotification } from '../Notification';

// Icons
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CopyFilled,
  } from "@ant-design/icons";


const Navbar = () => {
  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [codeToSubmit, setCodeToSubmit] = useState("");
  const [stdin, setStdin] = useState("");

  const username = localStorage.getItem("username");

  const runSouceCode = () => {
    let solutionResponse = runCode(codeToSubmit, stdin, language.id).then(
      (res) => {
        if (res.stdout) {
          console.log(res.stdout + `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`)
        } else if (res.stderr) {
          console.log(res.stderr + `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`)
        } else {
          console.log(res.compile_output + `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`)
        }
      }
    );
  };

  // copy id to clipboard
  const { namespaceId } = useParams();
  const url = namespaceId;

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
    customNotification("success", "bottomRight", "Copiado para a área de transferência", "copyNotification", 1.5  );
  };

  const chooseLanguage = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setLanguage({
      id: e.target.options[selectedIndex].getAttribute("data-key"),
      name: e.target.value,
    });
  };

  return (
    <div id="navbar-editor">
      <div className="navbar-main">
        <h1>ALL.CO</h1>
      </div>

      <div className="navbar-config">
        {/* <div className="custom-select">
          <select className="language dropdown" onChange={chooseLanguage}>
            {languages.map((language) => (
              <option
                value={language.value}
                data-key={language.id}
                key={language.id}
              >
                {language.name}
              </option>
            ))}
          </select>

          <span className="custom-arrow">
            <CaretDownOutlined className="arrow" />
          </span>
        </div> */}

        {/* <div className="custom-select">
          <select
            className="theme dropdown"
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <span className="custom-arrow">
            <CaretDownOutlined className="arrow" />
          </span>
        </div> */}

        <div className="run"></div>

        <button className="run-button" onClick={runSouceCode}>
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
