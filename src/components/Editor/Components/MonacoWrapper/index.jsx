import React, { useRef, useEffect } from "react";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import PropTypes from "prop-types";

// Custom modification of 'react-monaco-editor' package

const noop = () => {};


const MonacoWrapper = props => {
    const containerRef = useRef(null);
    const editorRef = useRef(null);
    const preventTriggerChange = useRef(false);

    useEffect(() => {
        // Initialize monaco instance
        const value = props.value != null ? props.value : props.defaultValue;
        const { language, theme, options, overrideServices } = props;
        if (containerRef.current) {
            // Before initializing monaco editor
            const parentOptions = props.editorWillMount(monaco);
            Object.assign(options, parentOptions);
            const editor = monaco.editor.create(
                containerRef.current,
                {
                    value,
                    language,
                    ...options,
                    ...(theme ? { theme } : {})
                },
                overrideServices
            );
            editorRef.current = editor;

            props.editorDidMount(editor, monaco);
            // Subscribe to editor changes

            return () => {
                if (editor) {
                    editor.dispose();
                    const model = editor.getModel();
                    if (model) {
                        model.dispose();
                    }
                }
            };
        }
    }, []);

    // Respond to value changes
    useEffect(() => {
        const value = props.value;
        const editor = editorRef.current;
        const model = editor.getModel();

        if (value != null && value !== model.getValue()) {
            preventTriggerChange.current = true;
            editor.pushUndoStop();
            model.pushEditOperations(
                [],
                [
                    {
                        range: model.getFullModelRange(),
                        text: value
                    }
                ]
            );
            editor.pushUndoStop();
            preventTriggerChange.current = false;
        }

        const subscription = editorRef.current.onDidChangeModelContent(
            event => {
                if (!preventTriggerChange.current) {
                    props.onChange(editor.getValue(), event);
                }
            }
        );

        return () => {
            if (subscription) {
                subscription.dispose();
            }
        };
    }, [props.value]);

    return (
        <div
            ref={containerRef}
            style={props.style}
            className="react-monaco-editor"
        ></div>
    );
};

MonacoWrapper.defaultProps = {
    value: null,
    style: {},
    defaultValue: "",
    language: "javascript",
    theme: null,
    options: {},
    overrideServices: {},
    editorDidMount: noop,
    editorWillMount: noop,
    onChange: noop
};
MonacoWrapper.propTypes = {
    value: PropTypes.string,
    style: PropTypes.object,
    defaultValue: PropTypes.string,
    language: PropTypes.string,
    theme: PropTypes.string,
    options: PropTypes.object,
    overrideServices: PropTypes.object,
    editorDidMount: PropTypes.func,
    editorWillMount: PropTypes.func,
    onChange: PropTypes.func
};

export default MonacoWrapper;
