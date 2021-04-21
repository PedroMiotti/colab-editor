import React, { useState, useRef, useEffect } from "react";
import "./style.css";

import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import { languages } from "../../assets/languages.js";
import { runCode } from "../../api/runCode.js";

// Icons
import {CaretDownOutlined, CaretRightOutlined, CopyFilled, FileAddOutlined, MoreOutlined} from '@ant-design/icons';
import { useRoomContext } from "../../context/room/room.context";


const Teste = () => {
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


// TB - TOPBAR
// SB - SIDEBAR
// FL - FILE LIST
// ED - EDITOR
// TM - TERMINAL


  return (
      <div id="editor-page">

      </div>
  )
}

export default Teste;