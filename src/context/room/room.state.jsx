import {
  UPDATE_ROOM,
  UPDATE_USER,
  SET_CURRENT_USER,
  SET_LOADING,
  UPDATE_FILE_CODE,
  UPDATE_ROOM_INPUT,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_MESSAGES,
  UPDATE_ROOM_OUTPUT,
  LEAVE_ROOM,
  CREATE_FILE,
  UPDATE_FILE_LIST,
} from "../types.js";

import React, { useReducer, useContext } from "react";

import { SocketContext } from "../socket.js";

import { instance as axios } from "../../api";

import RoomContext from "./room.context";
import roomReducer, { initialState as initialValues } from "./room.reducer";

import history from "../../utils/history";

const RoomState = ({ children }) => {
  const initialState = {
    ...initialValues,
  };

  const [socket] = useContext(SocketContext);

  const baseUrl = "/api/v1/room";

  const [state, dispatch] = useReducer(roomReducer, initialState);

  React.useEffect(() => {
    if (socket) {
      socket.on("update:room", (data) => {
        dispatch({
          type: UPDATE_ROOM,
          payload: {
            _id: data.room._id,
            namespaceId: data.room.namespaceId,
            activeUsers: data.room.users,
            files: data.room.files,
          },
        });
      });

      socket.on("update:user", (data) => {
        dispatch({
          type: UPDATE_USER,
          payload: {
            userId: data.userId,
            username: data.username,
            socketId: data.socketId,
            isHost: data.isHost,
          },
        });
      });

      socket.on("update:files", (data) => {
        dispatch({
          type: UPDATE_FILE_LIST,
          payload: {
            files: data.files
          },
        });
      });

      socket.on("realtime:code", (data) => {
        dispatch({
          type: UPDATE_FILE_CODE,
          payload: {
            code: data.value
          },
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("update:room");
        socket.off("update:user");
        socket.off("update:files");
        socket.off("realtime:code");
      }
    };
  }, [socket]);

  const createRoom = (namespaceId, username) => {
    socket.emit("create:room", username);

    history.push(`editor/${namespaceId}`);
  };

  const checkForExistingRoomAndUsername = (namespaceId, username) => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + `/join/${namespaceId}/${username}`)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e.response.data);
        });
    });
  };

  const joinRoom = (namespaceId, username) => {
    socket.emit("join:room", username);

    history.push(`editor/${namespaceId}`);
  };

  const createFile = (filename) => {
    socket.emit("create:file", filename);
  }

  const joinFile = (prevFile, currentFile) => {
    socket.emit("join:file", {prevFile, currentFile});
  }

  const updateFileCode = (filename, code) => {
    socket.emit("update:code", {filename, code});
  }

  return (
    <RoomContext.Provider
      value={{
        _id: state._id,
        roomName: state.roomName,
        currentUser: state.currentUser,
        activeUsers: state.activeUsers,
        files: state.files,
        currentFileCode: state.currentFileCode,
        roomLanguage: state.roomLanguage,
        roomInput: state.roomInput,
        roomOutput: state.roomOutput,
        roomLoaded: state.roomLoaded,
        roomMessages: state.roomMessages,
        loading: state.loading,
        createRoom,
        checkForExistingRoomAndUsername,
        joinRoom,
        createFile,
        joinFile,
        updateFileCode,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomState;
