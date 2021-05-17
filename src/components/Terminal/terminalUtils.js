export const pushToStdout = (terminal, message) => {
    terminal.current.pushToStdout(message);
}

export const clearTerminal = (terminal) => {
    terminal.current.clearStdout();
}