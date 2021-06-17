import React, { useRef } from 'react';

import Terminal from 'react-console-emulator'

import WelcomeBanner from './components/WelcomeBanner'

const CustomTerminal = ({ terminalRef }) => {
  return(
    <div className="Terminal-container" >
      <Terminal noEchoBack style={{ width: "100%", height: "100%"}} ref={terminalRef}  welcomeMessage={<WelcomeBanner />} promptLabel={<b>root@tech:~$</b>} />
    </div>
  )

}


export default CustomTerminal;
