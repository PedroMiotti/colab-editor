import React, { useState } from "react";
import "./style.css";

// Icons
import {
  CoffeeOutlined,
  FileOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Sidebar = ({ closeSidebarComponent, componentToRender }) => {

  const [ currentComponentOpen, setCurrentComponentOpen ] = useState("1");

  const changeCurrentComponent = (componentId) => {
    componentToRender(componentId);
    setCurrentComponentOpen(componentId);

    if(componentId === currentComponentOpen)
      closeSidebarComponent();
  } 

  return (
    <div id="sidebar-container">
      <div className="sidebar-top">
        <div
          className={currentComponentOpen == "1" ? "sidebar-item-toggle" : "sidebar-item"}
          onClick={() => changeCurrentComponent("1")}
        >
          <FileOutlined />
        </div>

        <div
          className={currentComponentOpen == "2" ? "sidebar-item-toggle" : "sidebar-item"}
          onClick={() => changeCurrentComponent("2")}
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
