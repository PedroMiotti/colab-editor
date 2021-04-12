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

const action = {
  payload: '',
  type: '',
}

export const initialState = {
  _id: '',
  currentUser: '',
  activeUsers: [],
  roomCode: 'print("hello")',
  roomInput: '',
  roomLanguage: 'javascript',
  roomOutput: {
    stderr: null,
    stdout: null
  },
  roomMessages: [],
  roomLoaded: null,
  loading: false,


  createRoom: () => null,
  joinRoom: () => null,

  updateRoomCode: () => null,
  updateRoomInput: () => null,
  updateRoomLanguage: () => null,
  updateRoomOutput: () => null,
  updateMessages: () => null,

  setRoomUser: () => null,

  leaveRoom: () => null,
}


//reducer
export default function roomReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ROOM:
        case JOIN_ROOM:
            return {
                ...state,
                _id: payload._id,
                currentUser: payload.currentUser,
                activeUsers: payload.activeUsers,
                roomLoaded: true,
            };

        case UPDATE_ROOM_CODE:
            return {
                ...state,
                roomCode: payload,
            };

        case UPDATE_ROOM_LANGUAGE:
            return {
                ...state,
                roomLanguage: payload,
                // roomCode: getTemplate(payload),
            };

        case UPDATE_ROOM_INPUT:
            return {
                ...state,
                roomInput: payload,
            };

        case UPDATE_ROOM_OUTPUT:
            return {
                ...state,
                roomOutput: payload,
                loading: false,
            };

        case UPDATE_ROOM_MESSAGES:
            return {
                ...state,
                roomMessages: [...state.roomMessages, payload],
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case LEAVE_ROOM:
            return {
                ...state,
                _id: '',
                currentUser: '',
                activeUsers: [],
                roomCode: '',
                roomInput: '',
                roomLanguage: 'javascript',
                roomOutput: {
                    stderr: null,
                    stdout: null,
                },
                roomMessages: [],
                roomLoaded: null,
                loading: false,
            };

        default:
            return state;
    }
}
