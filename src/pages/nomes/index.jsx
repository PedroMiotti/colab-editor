import React from 'react';
import './styles.css';

const PaginaNome = () => {
    return(
        <div id="paginaNome">
            <div id="logo">
                <h1>COLAB EDITOR</h1>
            </div>

            <div id="caixaNome">
                <h1>Insira seu nome</h1>

                <input type="text" spellcheck="false" maxLength="20" aria-required></input>

                <a>Confirmar</a>
            </div>
        </div>
    );
};

export default PaginaNome;