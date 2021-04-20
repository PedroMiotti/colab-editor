import React from "react";
import "./style.css";
import "../backgroundEffect.css";

const PaginaErro = () => {
    return(
        <div id="errorPage">
            <div className="backgroundEffect">
                <div className="noise"></div>

                <div className="overlay"></div>

                <div className="terminal terminal_errorPage">
                    <h1>Error <span className="errorcode_errorPage">404</span></h1>

                    <p className="output_errorPage">Eita! Parece que a página que você estava procurando não se encontra mais por aqui. Para onde será que ela deve ter ido?</p>

                    <p className="output_errorPage">Por favor, tente retornar para uma <br /> <a className="anchor_errorPage" href="/">página de segurança</a>.</p>

                    <p className="output_errorPage">Boa Sorte.</p>
                </div>
            </div>
        </div>
    );
}

export default PaginaErro;