import React from 'react';
import './style.css';

//Antd
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';

const Separator = ({username, img, imgName}) =>{
    return(
        <div className="UserLine">
            <div className="active-sign"></div>
            <Tooltip title={imgName} placement="top" color={"#000"}>
                <Avatar size={32} className="avatar" icon={img} />
            </Tooltip>

            <h6>{username}</h6>
        </div>
    )
}

export default Separator;