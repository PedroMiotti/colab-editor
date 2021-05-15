import React, { useState } from "react";
import "./style.css";

// Context
import { useRoomContext } from "../../context/room/room.context";

// Icons
import {
  CoffeeOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Sidebar = ({ openSidebar, closeSidebar, componentToRender }) => {
  const {
    files,
    createFile,
    joinFile,
  } = useRoomContext();

  // TODO -> Fix the drawer toggle
  // TODO -> Fix the :select icon
  const [fileList, setFileList] = useState(files);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenFiles, setIsOpenFiles] = useState(true);

  return (
    <div id="sidebar-container">
      <div className="sidebar-top">
        <div
          className={isOpenFiles ? "sidebar-item-toogle" : "sidebar-item"}
          onClick={() => componentToRender("1")}
        >
          <FileOutlined />
        </div>

        <div
          className={isOpenChat ? "sidebar-item-toogle" : "sidebar-item"}
          onClick={() => componentToRender("2")}
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
  );
};
export default Sidebar;
