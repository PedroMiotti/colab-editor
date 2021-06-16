import React from 'react';
import './style.css';

import CreateFileInstructions from '../../../../assets/imgs/createFileIntruction.png';
import CopyLinkInstruction from '../../../../assets/imgs/copyLinkInstruction.png';


const Welcome = () => {
    return(
        <div className="welcome-page-container">
            <h1>Bem-vindo !</h1>

            <p>01. Para começar crie um novo arquivo</p>
            <div className="welcome-page-img-container">
                <img src={CreateFileInstructions} />
            </div>

            <p>02. Convide um amigo copiando o link acima </p>
            <div className="welcome-page-img-container">
                <img src={CopyLinkInstruction} />
            </div>

            <p>03. CODE ! </p>
        </div>
    )
}


export default Welcome;