import React, { createContext, useContext } from 'react';
import { initialState } from './room.reducer';

const DEFAULT_VALUE = {
  ...initialState,
}

const RoomContext = createContext(DEFAULT_VALUE);

export default RoomContext;

export const useRoomContext = () => {
  return useContext(RoomContext);
}
