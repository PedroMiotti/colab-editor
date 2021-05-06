import React from 'react';

import { XTerm } from "xterm-for-react";


const Terminal = ({terminalRef}) => {
  
  return(
    <div className="Terminal-container">
      <XTerm ref={terminalRef} />
    </div>
  )

}


export default Terminal;
