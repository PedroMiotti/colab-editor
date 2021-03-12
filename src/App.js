import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import { XTerm } from "xterm-for-react";

import { UnControlled as CodeMirror } from "react-codemirror2";
// Lib
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// Languages
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/clike/clike.js";

// Themes
import "codemirror/theme/monokai.css";
// Keymaps
import "codemirror/keymap/vim.js";
import "codemirror/keymap/emacs.js";
import "codemirror/keymap/sublime.js";
// Addons
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/search/searchcursor";

import { languages } from "./assets/languages.js";

import { runCode } from "./api/runCode.js";

function App() {
  const code = "print('hello')";

  const [language, setLanguage] = useState({ id: "71", name: "python" });
  const [keymap, setKeymap] = useState("sublime");
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
      }
    );
  };

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
        <select className="keymap" onChange={(e) => setKeymap(e.target.value)}>
          <option value="sublime">Sublime</option>
          <option value="vim">Vim</option>
          <option value="emacs">Emacs</option>
        </select>
        <button className="run-button" onClick={runSouceCode}>
          run
        </button>
      </div>
      <div className="editor">
        {/* <textarea ref={editorRef} defaultValue={`${code}`} /> */}
        <CodeMirror
          value={codeToSubmit}
          onChange={(editor, data, value) => {
            setCodeToSubmit(value);
          }}
          options={{
            lineNumbers: true,
            mode: `${language.name}`,
            keyMap: `${keymap}`,
            theme: "monokai",
            tabSize: 4,
            // autoCloseBrackets: true,
            // autoCloseTags: true,
          }}
        />
      </div>
      <div className="terminal">
        <XTerm ref={xtermRef} />
      </div>
    </div>
  );
}

export default App;
