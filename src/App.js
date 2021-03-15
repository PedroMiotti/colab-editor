import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import { XTerm } from "xterm-for-react";

import MonacoEditor from './components/editor'

import { languages } from "./assets/languages.js";

import { runCode } from "./api/runCode.js";

function App() {
  const code = "print('hello')";

  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");
  const [codeToSubmit, setCodeToSubmit] = useState(code);

  const xtermRef = useRef(null);
  const editorRef = useRef(null);

  const runSouceCode = () => {
    let solutionResponse = runCode(codeToSubmit, stdin, language.id).then(
      (res) => {
        if (res.stdout) {
          xtermRef.current.terminal.writeln(res.stdout);
          xtermRef.current.terminal.writeln(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        }
        else if(res.stderr){
          xtermRef.current.terminal.write(res.stderr);
          xtermRef.current.terminal.writeln(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        }
        else{
          xtermRef.current.terminal.writeln(res.compile_output);
          xtermRef.current.terminal.writeln(
            `\nExecution Time : ${res.time} Secs Memory used : ${res.memory} bytes`
          );
        }
      }
    );
  };

  const handleEditorChange = (value, e) => {
    setCodeToSubmit(value);
  }

  const chooseLanguage = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setLanguage({
      id: e.target.options[selectedIndex].getAttribute("data-key"),
      name: e.target.value,
    });
  };

  return (
    <div className="App">
      <div className="topbar">
        <select className="language" onChange={chooseLanguage}>
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
        <select className="theme" onChange={(e) => setTheme(e.target.value)}>
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <button className="run-button" onClick={runSouceCode}>
          run
        </button>
      </div>
      <div className="editor">
        <MonacoEditor valueProp={codeToSubmit} languageProp={language.name} themeProp={theme} onChangeProp={handleEditorChange}/>
      </div>
      <div className="terminal">
        <XTerm ref={xtermRef} />
      </div>
    </div>
  );
}

export default App;
