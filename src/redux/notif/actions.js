import { SET_NOTIF, CLEAR_NOTIF } from './contants';

export function setNotif(status, typeNotif, message) {
  return {
    type: SET_NOTIF,
    status,
    typeNotif,
    message,
  }
};

export function clearNotif() {
  return {
    type: CLEAR_NOTIF,
  };
};
