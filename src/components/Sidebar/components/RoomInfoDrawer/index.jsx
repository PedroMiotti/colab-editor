import React from "react";
import "./style.css";

// Icons
import { UserOutlined } from "@ant-design/icons";

// Components
import Userbox from "./components/Userbox";

// Context 
import { useRoomContext } from '../../../../context/room/room.context';

const RoomInfoDrawer = () => {

  const { activeUsers } = useRoomContext();

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
          {activeUsers.map((user) => (
            <Userbox
              username={user.username}
              img={<UserOutlined />}
              imgName="raposa"
              key={user._id}
            />  
          ))}
        </div>
      </div>
    </>
  );
};
export default RoomInfoDrawer;
