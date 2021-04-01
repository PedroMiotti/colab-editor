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
} from '../types.js';

import React, { useReducer, useContext } from 'react';

import { SocketContext } from '../socket.js';

import RoomContext from './room.context';
import roomReducer, { initialState as initialValues } from './room.reducer';

const RoomState = ({ children }) => {
  
  const initialState = {
    ...initialValues,
  }

  const [socket] = useContext(SocketContext);

  const [ state, dispatch ] = useReducer(roomReducer, initialState);

  const createRoom = (values) => {
    try{

      socket.emit('create:room', values)

      // socket.on('update:room', (room) => {
      //   dispatch({
      //     type: CREATE_ROOM,
      //     payload: room,
      //   })
      //   // history.push(`/room/${room._id}`);
      // });
    }
    catch(e){
      console.log(e);
    }
}

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
                createRoom,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export default RoomState;
