import React, { useState } from 'react';

// Monaco
import Editor from "@monaco-editor/react";

const MonacoEditor = ({languageProp, themeProp, valueProp, onChangeProp}) => {

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setlanguage] = useState(languageProp);
  const [theme, setTheme] = useState(themeProp);

  function handleEditorDidMount(){
    setIsEditorReady(true);
  }

  return(
    <>

      <Editor
        theme={themeProp}
        language={languageProp}
        value={valueProp}
        editorDidMount={handleEditorDidMount}
        loading={"Loading..."}
        onChange={onChangeProp}
      />
    </>
  )
}
export default MonacoEditor;
