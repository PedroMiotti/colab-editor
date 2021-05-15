import React, { useState, useRef, useEffect } from "react";
import "./style.css";

// Components
import UserLine from "./components/userLine/userLine";
import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import FileBox from "./components/fileBox/index.jsx";

import Navbar from "../../components/Navbar";

import DiffMatchPatch from "diff-match-patch";

import { useDebouncedCallback } from "use-debounce";

import automerge from "automerge";

// Icons
import {
  SendOutlined,
  PlusOutlined,
  ConsoleSqlOutlined,

  CoffeeOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
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

  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");

  const [roomLoad, setRoomLoad] = useState(roomLoaded);
  const [codeToSubmit, setCodeToSubmit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentFile, setCurrentFile] = useState({});
  const [loadDoc, setLoadDoc] = useState(false);
  const [content, setContent] = useState("");
  
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [fileList, setFileList] = useState(files);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenFiles, setIsOpenFiles] = useState(true);

  const editorRef = useRef(null);
  const doc = useRef(null);
  const termRef = useRef(null);

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

    joinFile(currentFile.filename, fileName);
    setCurrentFile(file);

    let parsedCode = JSON.parse(file.text);
    doc.current = automerge.load(parsedCode);
    setContent(doc.current.content.toString());

    setLoadDoc(true);
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
    };
  }, [currentFileCode]);

  const handleChange = useDebouncedCallback((value) => {
    const prevValue = doc.current.content.toString();

    const patches = dmp.patch_make(prevValue, value);

    let startIdx = -1;
    let changeLength = 0;

    const newDoc = automerge.change(doc.current, (docRef) => {
      patches.forEach((patch) => {
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
        console.log(newChanges.content.toString());
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
        
        {/* TODO -> Create a loading page  */}
        {roomLoad && <h1>loading...</h1>}

        <Navbar />

        <div id="bottom">
          <div id="sidebar">
            <div className="sidebar-top">
              <div
                className={isOpenFiles ? "sidebar-item-toogle" : "sidebar-item"}
                onClick={() => {
                  setIsOpenFiles(!isOpenFiles);
                  setIsOpenChat(false);
                }}
              >
                <FileOutlined />
              </div>

              <div
                className={isOpenChat ? "sidebar-item-toogle" : "sidebar-item"}
                onClick={() => {
                  setIsOpenChat(!isOpenChat);
                  setIsOpenFiles(false);
                }}
                style={{ fontSize: ".8em" }}
              >
                <CoffeeOutlined />
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
                  <UserLine
                    username="FShinoda"
                    img={<UserOutlined />}
                    imgName="raposa"
                  />
                  <UserLine
                    username="Pedron"
                    img={<UserOutlined />}
                    imgName="rinoceronte"
                  />
                  <UserLine
                    username="Jotaki"
                    img={<UserOutlined />}
                    imgName="dragão ma"
                  />
                </div>
              </div>
            </div>
          ) : null}

          <Split className="split" minSize={100} gutterSize={4}>
            <MonacoEditor
              languageProp={language.name}
              themeProp={theme}
              valueProp={content}
              onChangeProp={handleChange}
              path={currentFile?.filename}
              editorRef={editorRef}
            />
            <Terminal terminalRef={termRef} />
          </Split>
        </div>
      </div>
    </div>
  );
};

export default Editor;
