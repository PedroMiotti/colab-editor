import React, { useState } from 'react';

// Monaco
import Editor from "@monaco-editor/react";

import MonacoWrapper from './Components/MonacoWrapper'

const MonacoEditor = ({languageProp, themeProp, valueProp, onChangeProp, editorRef, style}) => {

  const [language, setlanguage] = useState(languageProp);
  const [theme, setTheme] = useState(themeProp);

  const didMount = editor => {
    editorRef.current = editor;
};

  return(
    <div>
      <MonacoWrapper
        theme={themeProp}
        language={languageProp}
        value={valueProp}
        editorDidMount={didMount}
        loading={"Loading..."}
        onChange={onChangeProp}
        />
    </div>
  )
}
export default MonacoEditor;
