import React from 'react';

// import { XTerm } from "xterm-for-react";
import Terminal from 'react-console-emulator'

import WelcomeBanner from './components/WelcomeBanner'


const CustomTerminal = ({terminalRef}) => {
  
  return(
    <div className="Terminal-container" >
      <Terminal style={{height: '100%', width: "100%"}} ref={terminalRef}  welcomeMessage={"<WelcomeBanner />"} promptLabel={'tech@root:~$'} />
    </div>
  )

}


export default CustomTerminal;
