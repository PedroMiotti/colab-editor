import React from "react";
import "./style.css";

const PaginaErro = () => {
    return(
        <div id="PaginaErro">
            <div className="noise_errorPage"></div>

            <div className="overlay_errorPage"></div>

            <div className="terminal_errorPage">
                <h1>Error <span className="errorcode_errorPage">404</span></h1>

                <p className="output_errorPage">Eita! Parece que a página que você estava procurando não se encontra mais por aqui. Para onde será que ela deve ter ido?</p>

                {/* <p className="output">Please try to <a id="a_errorPage" href="#1">go back</a> or <a id="a_errorPage" href="#2">return to the homepage</a>.</p> */}

                <p className="output_errorPage">Por favor, tente retornar para a <a id="a_errorPage" href="/">página principal</a>.</p>

                <p className="output_errorPage">Boa Sorte.</p>
            </div>
        </div>
    );
}

export default PaginaErro;