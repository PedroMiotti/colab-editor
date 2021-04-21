import { MoreOutlined } from '@ant-design/icons';
import React from 'react';
import "./style.css";



const FileBox = (props) =>{
    return(
        <div id="file-box">
            <a>{props.name}</a>
            <MoreOutlined className="more-ico" />

        </div>
    )
}

export default FileBox;