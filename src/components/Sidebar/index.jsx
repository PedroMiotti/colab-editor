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

const Sidebar = ({ openSidebar, closeSidebar }) => {
  const {
    files,
    createFile,
    joinFile,
  } = useRoomContext();



  return (
    <div id="sidebar-container">
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
  );
};
export default Sidebar;
