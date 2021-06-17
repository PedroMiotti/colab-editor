import React from 'react';
import './style.css';

import CreateFileInstructions from '../../../../assets/imgs/createFileIntruction.png';
import CopyLinkInstruction from '../../../../assets/imgs/copyLinkInstruction.png';
import LogoWhite from '../../../../assets/imgs/logoWhite60.svg';
import LogoPurple from '../../../../assets/imgs/logo6F40A7.svg';


const Welcome = () => {
    return(
        <div className="welcome-page-container">
            {/*<img style={{width: "100px", marginRight: "20px", marginBottom: "20px", alignSelf: "center"}} src={LogoPurple} />*/}
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