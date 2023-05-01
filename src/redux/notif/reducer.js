import { SET_NOTIF, CLEAR_NOTIF } from './contants';

let initialState = {
  status: false,
  typeNotif: '',
  message: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_NOTIF : 
      return {
        ...state,
        status: true,
        typeNotif: action.typeNotif,
        message: action.message,
      }

    case CLEAR_NOTIF:
      return { state: initialState };
    
    default :
      return state;
  };
};
