import React, { useState } from "react";
import "./style.css";

// Icons
import { PlusOutlined } from "@ant-design/icons";

// Helpers
import { validateFileName, getLanguageId, selectLanguage } from "../../../../helpers/filenameUtils";

// Components
import FileBox from "./components/fileBox/index.jsx";
import { customNotification } from '../../../Notification';

// Context
import { useRoomContext } from "../../../../context/room/room.context";

const FilesDrawer = ({ fileList, chooseFile }) => {

  const [isAddingFile, setIsAddingFile] = useState(false);

  const { createFile } = useRoomContext();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let file_name = event.target.value;
      let validatedFilename = validateFileName(file_name);

      if (!file_name) return;
      if (!validatedFilename){
        customNotification("error", "bottomRight", "Nome de arquivo invalido", "copyNotification", 1.5);
        return;
      }

      // TODO -> Prevent a user from creating a file that already exists

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
        {fileList?.map((files) => (
            <FileBox
              key={files._id}
              name={files.filename}
              logoSrc={selectLanguage(getLanguageId(files.filename)).src}
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
