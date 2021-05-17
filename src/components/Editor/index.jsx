import React, { useState } from 'react';

// Monaco
import Editor from '@monaco-editor/react'
import MonacoWrapper from './Components/MonacoWrapper'

const editorOptions = {
  fontSize: 14,
  automaticLayout: true,
  scrollBeyondLastLine: false
};

const MonacoEditor = ({languageProp, themeProp, valueProp, onChangeProp, editorRef, style}) => {

  const didMount = editor => {
    editorRef.current = editor;
  };


  // TODO -> Fix why the language highlight isnt working
  return(
      <Editor
        language={languageProp}
        theme={themeProp}
        onMount={didMount}
        options={editorOptions}
        onChange={onChangeProp}
        value={valueProp}
        loading={"Carregando..."}
        />
  )
}
export default MonacoEditor;
