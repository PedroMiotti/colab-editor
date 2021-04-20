import React, { useState, useRef, useEffect } from "react";
import "./style.css";

import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import { languages } from "../../assets/languages.js";
import { runCode } from "../../api/runCode.js";

// Icons
import {CaretDownOutlined, CaretRightOutlined, CopyFilled, FileAddOutlined, MoreOutlined} from '@ant-design/icons';
import { useRoomContext } from "../../context/room/room.context";

const Editor = () => {
  const { roomLoaded } = useRoomContext();

  const code = "console.log('Hello');";

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
    <div id="editorPage">
      <div id="container-editor">
        {roomLoad && <h1>loading...</h1>}

        <div id="navbar-editor">
          <div className="navbar-main">
            <h1>ALL.CO</h1>
          </div>

          <div className="navbar-config">
            <div className="custom-select">
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

            <div className="custom-select">
              <select className="theme dropdown" onChange={(e) => setTheme(e.target.value)}>
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
              </select>

              <span class="custom-arrow"><CaretDownOutlined className="arrow"/></span>
            </div>

            <div className="run"></div>

            <button className="run-button" onClick={runSouceCode}><CaretRightOutlined className="play-ico"/></button>
          </div>

          <div className="navbar-info">
            <h2>FShinoda /</h2>
            <a><CopyFilled />Link</a>
          </div>
        </div>

        <div id="editorPageContent">
          <div className="sidebar"></div>

          <div className="xtndFiles">
            <div className="sidebar-header">
              <h2>Files</h2>
              <FileAddOutlined className="file-ico"/>
            </div>

            <div className="sidebar-files">
              <div>
                <a>main.py</a>
                <MoreOutlined className="more-ico"/>
              </div>

              <div className="bg-dark">
                <a>teste.py</a>
                <MoreOutlined className="more-ico"/>
              </div>

              <div>
                <a>go.py</a>
                <MoreOutlined className="more-ico"/>
              </div>
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

          <div className="codeTerminal">
            <Terminal terminalRef={xtermRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;