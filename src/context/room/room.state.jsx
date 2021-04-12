import {
  CREATE_ROOM,
  JOIN_ROOM,
  SET_CURRENT_USER,
  SET_LOADING,
  UPDATE_ROOM_CODE,
  UPDATE_ROOM_INPUT,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_MESSAGES,
  UPDATE_ROOM_OUTPUT,
  LEAVE_ROOM,
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

  const createOrJoinRoom = (namespaceId, username) => {
    socket.emit("create:room", username);

    socket.on("update:room", (data) => {
      dispatch({
        type: CREATE_ROOM,
        payload: {
          _id: namespaceId,
          currentUser: username,
          activeUsers: data.activeUsers,
        },
      });
    });
    history.push(`editor/${namespaceId}`);

  };

  const joinRoom = (namespaceId, username) => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + `/join/${namespaceId}/${username}`)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((e) => {
          reject(e.response.data);
        });
    });
  };

  return (
    <RoomContext.Provider
      value={{
        _id: state._id,
        roomName: state.roomName,
        currentUser: state.currentUser,
        activeUsers: state.activeUsers,
        roomCode: state.roomCode,
        roomLanguage: state.roomLanguage,
        roomInput: state.roomInput,
        roomOutput: state.roomOutput,
        roomLoaded: state.roomLoaded,
        roomMessages: state.roomMessages,
        loading: state.loading,
        createOrJoinRoom,
        joinRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomState;
