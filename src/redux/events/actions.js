import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';
import { getData } from '../../utils/fetch';
import {
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
  ERROR_FETCHING_EVENTS,
  SET_KEYWORD,
  SET_TALENT,
  SET_CATEGORY,
} from './constants';

let debounceFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS,
  };
};

export const successFetchingEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS,
    events,
  };
};

export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS,
  };
};

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvents());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().events.keyword,
        talent: getState().events?.talent?.value || '',
        category: getState().events?.category?.value || '',
      };

      let res = await debounceFetchEvents('/cms/events', params);

      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name || '';
        res.talentName = res?.talent?.name ?? '-';
      });

      dispatch(
        successFetchingEvents({
          events: res.data.data,
        })
      );
    } catch (err) {
      dispatch(errorFetchingEvents());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  }
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  }
};

export const setTalent = (talent) => {
  return {
    type: SET_TALENT,
    talent,
  }
};
