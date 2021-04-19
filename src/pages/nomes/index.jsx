import React from "react";
import "./styles.css";

// Ant Design
import { Button } from 'antd';

const PaginaNome = () => {
    return(
        <div id="paginaNome">
            <div className="noise_namePage"></div>

            <div className="overlay_namePage"></div>

            <div className="terminal_namePage">
                <div id="logo">
                    <h1 className="output_errorPage"><span className="errorcode_errorPage">COLAB EDITOR</span></h1>
                </div>

                <div id="caixaNome">
                    <h1>Insira seu nome</h1>

                    <input type="text" spellcheck="false" maxLength="20" aria-required></input>

                    <div id="cnfBtn">
                        <Button type="link">Confirmar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaNome;