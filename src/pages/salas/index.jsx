import React from 'react';
import './index.css';

const PaginaSalas = () => {
    return(
        <div id="paginaSalasContainer">
            <div id="boasVindas">
                <h1>Olá, <strong>FShinoda</strong>!</h1>
            </div>

            <div id="caixas">
                <div id="criarSala">
                    <h2>Criar Sala</h2>

                    <h1>&#43;</h1>
                </div>

                <div id="entrarSala">
                    <h2>Entrar em uma sala</h2>

                    <input type="text" spellcheck="false" />

                    <h1>Entrar</h1>
                </div>
            </div>
        </div>
    );
}

export default PaginaSalas;