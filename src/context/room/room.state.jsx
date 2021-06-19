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
  REALTIME_CODE,
} from "../types.js";

import React, { useReducer, useContext } from "react";

import { SocketContext } from "../socket.js";

import { instance as axios } from "../../api";

import RoomContext from "./room.context";
import roomReducer, { initialState as initialValues } from "./room.reducer";

// Components
import { customNotification } from '../../components/Notification';

import history from "../../helpers/history";

const RoomState = ({ children }) => {
  const initialState = {
    ...initialValues,
  };

  const [socket] = useContext(SocketContext);

  const baseUrl = "/api/v1/room";

  const username = localStorage.getItem('username');

  const [state, dispatch] = useReducer(roomReducer, initialState);

  React.useEffect(() => {
    if (socket) {
      socket.on("update:room", (data) => {
        const newUserUsername = data.room.users[data.room.users.length - 1].username;
        if(!(data.room.users[data.room.users.length - 1].username === username)){
          customNotification("info", "topRight", `${newUserUsername} se juntou a sala ! 🔥 `, "copyNotification", 1.5 );
        }

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

      socket.on("user-left:room", (data) => {
        if(data)
          customNotification("info", "topRight", `${data.userLeft.username} saiu da sala ! ☹️ `, "copyNotification", 1.5 );

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
      
      socket.on('user-joined:file', (data) => {
        dispatch({
          type: UPDATE_FILE_CODE,
          payload: {
            code: data
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
        const { changes, startIdx, changeLength } = data;
        dispatch({
          type: REALTIME_CODE,
          payload: {
            changes,
            startIdx,
            changeLength
          },
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("update:room");
        socket.off("user-left:room");
        socket.off("update:user");
        socket.off("update:files");
        socket.off("realtime:code");
        socket.off("user-joined:file");

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

  const updateFileCode = (filename, changes, startIdx, changeLength) => {
    socket.emit("update:code", {filename, changes, startIdx, changeLength});
  }

  const leaveRoom = () => {
    socket.emit("user-left:room");

    dispatch({ type: LEAVE_ROOM });

    history.push("/");
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
        codeChange: state.codeChange,
        roomLoaded: state.roomLoaded,
        loading: state.loading,
        createRoom,
        checkForExistingRoomAndUsername,
        joinRoom,
        createFile,
        joinFile,
        updateFileCode,
        leaveRoom
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomState;
