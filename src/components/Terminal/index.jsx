import React from 'react';

import { XTerm } from "xterm-for-react";


const Terminal = ({terminalRef}) => {


  return(
    <>
      <XTerm ref={terminalRef} />
    </>
  )

}


export default Terminal;
