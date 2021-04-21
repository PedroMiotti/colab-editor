import React, { useState, useRef, useEffect } from "react";
import "./style.css";

import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import {FitAddon} from 'xterm-addon-fit';

import { languages } from "../../assets/languages.js";
import { runCode } from "../../api/runCode.js";
import FileBox from "./components/fileBox/index.jsx";


// Icons
import {CaretDownOutlined, 
  CaretRightOutlined, 
  CopyFilled, 
  FileOutlined, 
  SettingOutlined, 
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';

import { useRoomContext } from "../../context/room/room.context";

// Split.js
import Split from 'react-split';

const Editor = () => {
  const { roomLoaded } = useRoomContext();

  
  

  const code = "console.log('Hello');";

  const [ roomLoad, setRoomLoad ] = useState(roomLoaded);

  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");
  const [codeToSubmit, setCodeToSubmit] = useState(code);

  const xtermRef = useRef(null);
  const fitAddon = new FitAddon();
  const editorRef = useRef(null);

  /* Fazer uma função bloqueante?*/
  /* xtermRef.current.terminal.setOption("theme", {background: "#bbb"});
  xtermRef.current.terminal.resize(28,30);*/
  
  /*xtermRef.current.terminal.loadAddon(fitAddon);
  fitAddon.fit(); */

  xtermRef.current.terminal.resize(20,10);
  
  

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


        <div id="top">
          {/* NAVBAR */}
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
        </div>

        
        <div id="bottom">

          <div id="sidebar">
            <div>
              <div className="sidebar-item">
                <FileOutlined/>
              </div>
              
            </div>
            <div id="sidebar-bottom">
              <div className="sidebar-item">
                <UserOutlined />
                
              </div>
              <div className="sidebar-item">
                <SettingOutlined />
              </div>
              
              
            </div>
            
          </div>
          
          <div id="files">
            <div id="files-header">
              <h2>Files</h2>
              <PlusOutlined className="plus-ico"/>
            </div>
            <div id="files-body">
              <FileBox name="python.js"/>
              <FileBox name="py.java"/>
              <FileBox name="pypy.py"/>
            </div>
          </div>



          {/* Configuração Split.js e as duas respectivas divs que serão divididas por ele */}          
          <Split
            className="split"
            minSize={100} 
            gutterSize={4} /* finura da barra */
          >
            <div id="editor">
              <div id="resistent-box">
                <MonacoEditor
                  valueProp={codeToSubmit}
                  languageProp={language.name}
                  themeProp={theme}
                  onChangeProp={handleEditorChange}
                />

              </div>
              
            </div>
            <div id="terminal-editor">
              <Terminal terminalRef={xtermRef}  />
              
              
            </div>
          </Split>
          
          
        </div>

        
      </div>
    </div>
  );
}

export default Editor;