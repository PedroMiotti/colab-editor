import React, { useState } from "react";
import "./style.css";

// Icons
import { UserOutlined } from "@ant-design/icons";

// Components
import Separator from "./components/Separator";

// TODO -> Rename the separator

const RoomInfoDrawer = ({ fileList }) => {
  return (
    <>
      <div className="user-list">
        <div className="user-list-header">
          <div className="line">
            <div className="line-title">
              <h6>Online</h6>
            </div>
          </div>
        </div>
        <div className="user-list-content">
          <Separator
            username="FShinoda"
            img={<UserOutlined />}
            imgName="raposa"
          />
          <Separator
            username="Pedron"
            img={<UserOutlined />}
            imgName="rinoceronte"
          />
          <Separator
            username="Jotaki"
            img={<UserOutlined />}
            imgName="dragão ma"
          />
        </div>
      </div>
    </>
  );
};
export default RoomInfoDrawer;
