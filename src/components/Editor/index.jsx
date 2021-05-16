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

  // TODO -> Fix why the language highlight isnt working
  return(
    <div>
      <MonacoWrapper
        theme={theme}
        language={language}
        value={valueProp}
        editorDidMount={didMount}
        loading={"Loading..."}
        onChange={onChangeProp}
        />
    </div>
  )
}
export default MonacoEditor;
