import React, {useState} from "react";
import './style.css';

// Router-dom
import {useParams} from "react-router-dom";

// Assets
import Logo40x40 from '../../assets/imgs/logo40x40.png'
import LogoPurple from '../../assets/imgs/logo6F40A7.svg';
import LogoPink from '../../assets/imgs/logoF1D4D4.svg';
import LogoYellow from '../../assets/imgs/logoFFBC50.svg';
import LogoWhite from '../../assets/imgs/logoWhite60.svg';


// Components
import {customNotification} from '../Notification';

// Icons
import {
    CaretDownOutlined,
    CaretRightOutlined,
    CopyFilled,
} from "@ant-design/icons";


const Navbar = ({runCode}) => {
    const [language, setLanguage] = useState({id: "63", name: "javascript"});
    const [theme, setTheme] = useState("vs-dark");
    const [codeToSubmit, setCodeToSubmit] = useState("");
    const [stdin, setStdin] = useState("");

    const username = localStorage.getItem("username");

    // copy id to clipboard
    const {namespaceId} = useParams();
    const url = namespaceId;

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e.target.value);
        customNotification("success", "bottomRight", "Copiado para a área de transferência", "copyNotification", 1.5);
    };

    return (
        <div id="navbar-editor">
            <div className="navbar-main">
               <img src={LogoPurple}/>
                <h1>{'COLAB_'}</h1>
            </div>

            <div className="navbar-config">

                <div className="run"></div>

                <button className="run-button" onClick={runCode}>
                    <CaretRightOutlined className="play-ico"/>
                </button>
            </div>

            <div className="navbar-info">
                <h2>{username}/</h2>
                <button className="btn-copy" value={url} onClick={copyToClipboard}>
                    <CopyFilled className="copy-icon"/>
                    Link
                </button>
            </div>
        </div>
    );
};

export default Navbar;
