import React from 'react';
import './style.css';

//Antd
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const UserLine = ({username, img}) =>{
    return(
        <div className="UserLine">
            <div className="active-sign"></div>
            <Avatar size={32} className="avatar" icon={img} />
            <h6>{username}</h6>
        </div>
    )
}

export default UserLine;