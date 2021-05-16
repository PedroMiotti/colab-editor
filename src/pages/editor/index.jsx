import React, { useState, useRef, useEffect } from "react";
import "./style.css";

// Components
import MonacoEditor from "../../components/Editor/";
import Terminal from "../../components/Terminal/";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import FilesDrawer from "../../components/Sidebar/components/FilesDrawer";
import RoomInfoDrawer from "../../components/Sidebar/components/RoomInfoDrawer";

import DiffMatchPatch from "diff-match-patch";

import { useDebouncedCallback } from "use-debounce";

import automerge from "automerge";

// Icons
import {
} from "@ant-design/icons";

// Context
import { useRoomContext } from "../../context/room/room.context";

// Split.js
import Split from "react-split";

const dmp = new DiffMatchPatch();

const Editor = () => {
  const {
    roomLoaded,
    files,
    currentFileCode,
    codeChange,
    joinFile,
    updateFileCode,
  } = useRoomContext();

  // TODO -> Remove this states and add create the function to reconize the extension of the file
  const [language, setLanguage] = useState({ id: "63", name: "javascript" });
  const [theme, setTheme] = useState("vs-dark");
  const [stdin, setStdin] = useState("");

  const [roomLoad, setRoomLoad] = useState(roomLoaded);
  const [codeToSubmit, setCodeToSubmit] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentFile, setCurrentFile] = useState({});
  const [loadDoc, setLoadDoc] = useState(false);
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState(files);

  const [componentToRenderFromSidebar, setComponentToRenderFromSidebar] = useState("1");
  const [toggleSidebarComponent, setToggleSidebarComponent] = useState(true);

  const editorRef = useRef(null);
  const doc = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    if (files) setFileList(files);
  }, [files]);

  const chooseFile = (fileName) => {
    let file = fileList.find((f) => f.filename === fileName);

    if (file.filename === currentFile.filename) {
      return;
    }
    else {
      joinFile(currentFile.filename, fileName);
      setCurrentFile(file);

      let parsedCode = JSON.parse(file.text);
      doc.current = automerge.load(parsedCode);
      setContent(doc.current.content.toString());

      setLoadDoc(true);
    }
  };

  const sidebarComponentSwitch = (current) => {
    switch (current) {
      case "1":
        return <FilesDrawer fileList={fileList} chooseFile={chooseFile} />;
      case "2":
        return <RoomInfoDrawer />;
      default:
        return "Not configured yet";
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
          <Sidebar closeSidebarComponent={() => setToggleSidebarComponent(!toggleSidebarComponent)} componentToRender={setComponentToRenderFromSidebar} />

          {toggleSidebarComponent ?
            <div id="drawer-container">
              {sidebarComponentSwitch(componentToRenderFromSidebar)}
            </div>
            :
            null
          }

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
