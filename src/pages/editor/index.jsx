import React, { useState, useRef, useEffect } from "react";
import "./style.css";

import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";

import { languages } from "../../assets/languages.js";

import { runCode } from "../../api/runCode.js";

// Icons
import {MenuOutlined, CaretDownOutlined, CaretRightOutlined, CopyFilled} from '@ant-design/icons';
import { useRoomContext } from "../../context/room/room.context";


const Editor = () => {
  const { roomLoaded } = useRoomContext();

  const code = "print('hello')";

  const [ roomLoad, setRoomLoad ] = useState(roomLoaded);

  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");
  const [codeToSubmit, setCodeToSubmit] = useState(code);

  const xtermRef = useRef(null);
  const editorRef = useRef(null);

  const writeToTerminal = (data) => {
    xtermRef.current.terminal.writeln(data);
  };

  const runSouceCode = () => {
    let solutionResponse = runCode(codeToSubmit, stdin, language.id).then(
      (res) => {
        if (res.stdout) {
          writeToTerminal(res.stdout);
          writeToTerminal(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        } else if (res.stderr) {
          writeToTerminal(res.stderr);
          writeToTerminal(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        } else {
          writeToTerminal(res.compile_output);
          writeToTerminal(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        }
      }
    );
  };

  const handleEditorChange = (value, e) => {
    setCodeToSubmit(value);
  };

  const chooseLanguage = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setLanguage({
      id: e.target.options[selectedIndex].getAttribute("data-key"),
      name: e.target.value,
    });
  };

  return (
    <div className="container-editor">

      {roomLoad && <h1>loading...</h1>}
      
      <div className="navbar-editor">
        <div className="navbar-main">
          <MenuOutlined className="menu-ico"/>
          <h1>CoEditor</h1>
        </div>

        <div className="navbar-config">
          <div class="custom-select">
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

            <span class="custom-arrow"><CaretDownOutlined className="arrow"/></span>
          </div>

          <div class="custom-select">
            <select className="theme dropdown" onChange={(e) => setTheme(e.target.value)}>
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
            </select>
            <span class="custom-arrow"><CaretDownOutlined className="arrow"/></span>
          </div>

          <div className="run"></div>
          <button className="run-button" onClick={runSouceCode}>run <CaretRightOutlined className="play-ico"/></button>
        </div>

        <div className="navbar-info">
          <h2>FShinoda /</h2>
          <a><CopyFilled />Link</a>
        </div>
        
      </div>

      <div className="sidebar">
        <div id="sidebar-header">
          <h1>Files</h1>
          <h2>Ico</h2>
        </div>

        <div id="sidebar-files">
          <a>main.py</a>
          <a>teste.py</a>
          <a>go.py</a>
        </div>

      </div>

      <div className="editor">
        <MonacoEditor
          valueProp={codeToSubmit}
          languageProp={language.name}
          themeProp={theme}
          onChangeProp={handleEditorChange}
        />
      </div>
      <div className="terminal">
        <Terminal terminalRef={xtermRef} />
      </div>
    </div>
  );
}

export default Editor;
