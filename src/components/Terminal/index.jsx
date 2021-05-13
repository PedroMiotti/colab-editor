import React from 'react';

import { XTerm } from "xterm-for-react";


const Terminal = ({terminalRef}) => {
  
  return(
    <div className="Terminal-container">
      <XTerm ref={terminalRef} style={{width: "100%"}} />
    </div>
  )

}


export default Terminal;
