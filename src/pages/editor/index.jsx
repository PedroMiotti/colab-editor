import React, { useState, useRef, useEffect } from "react";
import {useParams} from 'react-router-dom';
import "./style.css";

// Components
import UserLine from './components/userLine/userLine';
import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import FileBox from "./components/fileBox/index.jsx";

import { FitAddon } from "xterm-addon-fit";

import { convertToUint8 } from '../../utils/convertToUint8';

import { languages } from "../../assets/languages.js";
import { runCode } from "../../api/runCode.js";

import DiffMatchPatch from "diff-match-patch";

import { useDebouncedCallback } from "use-debounce";

import automerge from "automerge";

// Antd
import {notification} from 'antd';

// Icons
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SendOutlined,
  CoffeeOutlined,
  CopyFilled,
  FileOutlined,
  SettingOutlined,
  UserOutlined,
  PlusOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

// Context
import { useRoomContext } from "../../context/room/room.context";

// Split.js
import Split from "react-split";
import { string } from "prop-types";

const dmp = new DiffMatchPatch();


const Editor = () => {
  const {
    roomLoaded,
    files,
    currentFileCode,
    codeChange,
    createFile,
    joinFile,
    updateFileCode,
  } = useRoomContext();

  const [roomLoad, setRoomLoad] = useState(roomLoaded);

  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");
  const [codeToSubmit, setCodeToSubmit] = useState("");

  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isOpenFiles, setIsOpenFiles] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [fileList, setFileList] = useState(files);
  const [currentFile, setCurrentFile] = useState({});
  const [loadDoc, setLoadDoc] = useState(false);

  const [content, setContent] = useState("");

  const editorRef = useRef(null);
  const doc = useRef(null);

  const [isOpenChat, setIsOpenChat] = useState(false);

  const username = localStorage.getItem("username");

  // copy id to clipboard
  const { namespaceId } = useParams();
  const url = namespaceId;

  const successNotification = (type, placement) =>{
    notification[type]({
      message: 'Copiado para a área de transferência',
      duration: 1.5,
      className : "copyNotification",    
      placement,
    });
  };

  const copyToClipboard = (e) =>{
    navigator.clipboard.writeText(e.target.value);
    successNotification('success', 'bottomRight');
  }


  useEffect(() => {
    if (files) setFileList(files);
  }, [files]);


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let file_name = event.target.value;

      if (!file_name) return;

      createFile(file_name);
      setIsAddingFile(!isAddingFile);
      setInputValue("");
    }
  };

  const chooseFile = (fileName) => {
    let file = fileList.find((f) => f.filename === fileName);

    if(file.filename === currentFile.filename){
      return;
    }
    else{
      joinFile(currentFile.filename, fileName);
      setCurrentFile(file);
      
      let parsedCode = JSON.parse(file.text);
      doc.current = automerge.load(parsedCode);
      setContent(doc.current.content.toString());
      
      setLoadDoc(true);
    }
  };

  useEffect(() => {
    if (loadDoc) {
      let parsedCode = JSON.parse(currentFileCode);
      doc.current = automerge.load(parsedCode);
      setContent(doc.current.content.toString());
    }

    return () => {
      setLoadDoc(" ");
      setContent(" ");
    }
  }, [currentFileCode]);

  const xtermRef = useRef(null);
  const fitAddon = new FitAddon();

  /* Fazer uma função bloqueante?*/
  /* xtermRef.current.terminal.setOption("theme", {background: "#bbb"});
  xtermRef.current.terminal.resize(28,30);*/

  /*xtermRef.current.terminal.loadAddon(fitAddon);
  fitAddon.fit(); */

  //xtermRef.current.terminal.resize(20,10);

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

  const chooseLanguage = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setLanguage({
      id: e.target.options[selectedIndex].getAttribute("data-key"),
      name: e.target.value,
    });
  };

  const handleChange = useDebouncedCallback((value) => {
    const prevValue = doc.current.content.toString()

    const patches = dmp.patch_make(prevValue, value);

    let startIdx = -1;
    let changeLength = 0;

    const newDoc = automerge.change(doc.current, docRef => {
      patches.forEach(patch => {
        let idx = patch.start1;

        patch.diffs.forEach(([operation, changeText]) => {
          switch (operation) {
            case 1: // Insertion
              if (startIdx === -1) {
                startIdx = idx;
              }
              docRef.content.insertAt(idx, ...changeText.split(""));
              changeLength += changeText.length;

            case 0: // No Change
              idx += changeText.length;
              break;

            case -1: // Deletion
              if (startIdx === -1) {
                startIdx = idx;
              }
              for (let i = 0; i < changeText.length; i++) {
                docRef.content.deleteAt(idx);
              }
              changeLength -= changeText.length;
              break;
          }
        });
      });
    });

    const changes = automerge.getChanges(doc.current, newDoc);
    doc.current = newDoc;

    updateFileCode(
      currentFile.filename,
      JSON.stringify(changes),
      startIdx,
      changeLength
    );

    setContent(doc.current.content.toString());
  }, 700);

  useEffect(() => {
    if (codeChange.update) {
      handleChange.flush();

      setTimeout(() => {
        const { changes, startIdx, changeLength } = codeChange;

        let parsedCode = JSON.parse(changes);

        let newChanges = automerge.applyChanges(doc.current, parsedCode); 
        console.log(newChanges.content.toString())
        doc.current = newChanges;

        const editor = editorRef.current;
        const model = editor.getModel();
        let offset = model.getOffsetAt(editor.getPosition());

        if (offset > startIdx) {
          offset += changeLength;
        }

        setContent(doc.current.content.toString());

        document.activeElement.blur();
        
        // Set new cursor position
        setTimeout(() => {
          editor.focus();
          const newPosition = model.getPositionAt(offset);
          editor.setPosition(newPosition);
          editor.setSelection({
            startLineNumber: newPosition.lineNumber,
            endLineNumber: newPosition.lineNumber,
            startColumn: newPosition.column,
            endColumn: newPosition.column,
          });

        }, 1);
      }, 1);
    }
  }, [codeChange]);

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

                <span className="custom-arrow">
                  <CaretDownOutlined className="arrow" />
                </span>
              </div>

              <div className="custom-select">
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
              </div>

              <div className="run"></div>

              <button className="run-button" onClick={runSouceCode}>
                <CaretRightOutlined className="play-ico" />
              </button>
            </div>

            <div className="navbar-info">
              <h2>{username}/</h2>
              <button className="btn-copy" value={url} onClick={copyToClipboard}>
                <CopyFilled className="copy-icon"/>
                Link
              </button>
            </div>
          </div>
        </div>

        <div id="bottom">
          <div id="sidebar">
            <div className="sidebar-top">

              <div
                className={isOpenFiles ? "sidebar-item-toogle" : "sidebar-item"}
                onClick={() => {setIsOpenFiles(!isOpenFiles); setIsOpenChat(false)}}
              >
                <FileOutlined />
              </div>

              <div className={isOpenChat ? "sidebar-item-toogle" : "sidebar-item"}
                onClick={() => {setIsOpenChat(!isOpenChat); setIsOpenFiles(false)}} style={{fontSize: '.8em'}}>
                <CoffeeOutlined/>
              </div>
              
            </div>
            <div id="sidebar-bottom">
              <div className="sidebar-item" >
                <UserOutlined />
              </div>
              <div className="sidebar-item">
                <SettingOutlined />
              </div>
            </div>
          </div>

          {isOpenFiles ? (
            <div id="container">
              <div id="files-header">
                <h2>Files</h2>
                <PlusOutlined
                  className="plus-ico"
                  onClick={() => setIsAddingFile(!isAddingFile)}
                />
              </div>
              <div id="files-body">
                {fileList
                  ?.map((files) => (
                    <FileBox
                      name={files.filename}
                      key={files._id}
                      clickEvent={() => chooseFile(files.filename)}
                    />
                  ))
                  .sort()}

                {isAddingFile ? (
                  <FileBox
                    event={handleKeyDown}
                    toggle={() => setIsAddingFile(!isAddingFile)}
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {isOpenChat ? (
            <div id="container">
              <div className="user-list">
                <div className="user-list-header">
                  <div className="line">
                    <div className="line-title">
                      <h6>Online</h6>
                    </div>
                  </div>
                </div>
                <div className="user-list-content">
                  <UserLine username="FShinoda" img={<UserOutlined />} imgName="raposa"/>
                  <UserLine username="Pedron" img={<UserOutlined />} imgName="rinoceronte"/>
                  <UserLine username="Jotaki" img={<UserOutlined />} imgName="dragão ma"/>
                  <UserLine username="Kitashima" img={<UserOutlined />}/>
                  <UserLine username="Katashima" img={<UserOutlined />}/>
                  <UserLine username="Hiroshima" img={<UserOutlined />}/>
                  <UserLine username="Katajima" img={<UserOutlined />}/>
                  <UserLine username="Keitajima" img={<UserOutlined />}/>
                  <UserLine username="Katahashi" img={<UserOutlined />}/>
                  <UserLine username="Kotashima" img={<UserOutlined />}/>
                </div>
              </div>
              {/* <div className="user-messages"></div> */}
            </div>
          ) : null}

          {/* Configuração Split.js e as duas respectivas divs que serão divididas por ele */}
          <Split
            className="split"
            minSize={100}
            gutterSize={4} 
          >
            <div id="editor">
              <div id="resistent-box">
                <MonacoEditor
                  languageProp={language.name}
                  themeProp={theme}
                  valueProp={content}
                  onChangeProp={handleChange}
                  path={currentFile?.filename}
                  editorRef={editorRef}
                  style={{height: "100%"}}
                />
              </div>
            </div>

            <div id="terminal-editor">
              <Terminal terminalRef={xtermRef} />
            </div>

          </Split>
        </div>
      </div>
    </div>
  )
};

export default Editor;
