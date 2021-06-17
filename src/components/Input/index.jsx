import React from 'react';
import './style.css';

const InputContainer = ({stdinRef, change}) => {
    return(
        <div className="Input-container" >
            <textarea ref={stdinRef} onChange={change} style={{width: "100%", height: "100%"}} placeholder="Inputs - Coloque cada input em uma linha " />
        </div>
    )
}


export default InputContainer;