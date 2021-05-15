import React, { useState } from "react";
import "./style.css";

// Icons
import { PlusOutlined } from "@ant-design/icons";

// Components
import FileBox from "./components/fileBox/index.jsx";

// Context
import { useRoomContext } from "../../../../context/room/room.context";

const FilesDrawer = ({ fileList, chooseFile }) => {
  const [isAddingFile, setIsAddingFile] = useState(false);

  const { createFile } = useRoomContext();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let file_name = event.target.value;

      if (!file_name) return;

      createFile(file_name);
      setIsAddingFile(!isAddingFile);
    }
  };

  return (
    <>
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
    </>
  );
};
export default FilesDrawer;
