import React from "react";
import "./styles.css";
import "../../assets/style/backgroundEffect.css";

// Ant Design
import { Button } from 'antd';

// Utils
import history from '../../utils/history'

const PaginaNome = () => {

    const [ nomeInput, setNomeInput ] = React.useState('');

    const handleInput = (e) => {
        setNomeInput(e.target.value);
    };
    
    const saveUsername = () => {
        localStorage.setItem("username", nomeInput);
        history.push("/menu");
    }

    return(
        <div id="namePage">
            <div className="backgroundEffect">
                <div className="noise"></div>

                <div className="overlay"></div>

                <div className="terminal terminal_namePage">
                    <div className="logo">
                        <h1 className="output_errorPage"><span className="errorcode_errorPage">ALL.CO</span></h1>
                    </div>

                    <div className="caixaNome">
                        <h1>Insira seu nome</h1>

                        <input onChange={handleInput} type="text" spellcheck="false" maxLength="20" aria-required></input>

                        <div id="cnfBtn">
                            <Button onClick={saveUsername} type="link">Confirmar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaNome;