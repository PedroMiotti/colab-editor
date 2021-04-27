import { MoreOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
import "./style.css";



const FileBox = (props) =>{
    
    const maxLength = 12;

    return(
        <div id="file-box">
            
            {
            (props.name ? (<input id="file-box-input" disabled={true} maxLength={maxLength} value={props.name} />) : (<input id="file-box-input" autoFocus maxLength={maxLength} placeholder="file_name" onKeyDown={props.event} onBlur={props.toogle}/>))
            } 

            <MoreOutlined className="more-ico" />
            
            

        </div>
    )
}

export default FileBox;