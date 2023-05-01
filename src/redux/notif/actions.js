import { SET_NOTIF, CLEAR_NOTIF } from './contants';

export function setNotif(status, typeNotif, message) {
  console.log('message notif');
  console.log(message);
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
