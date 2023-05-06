import debounce from 'debounce-promise';
import {
  START_FETCHING_LISTS_CATEGORIES,
  SUCCESS_FETCHING_LISTS_CATEGORIES,
  ERROR_FETCHING_LISTS_CATEGORIES,
  START_FETCHING_LISTS_TALENTS,
  SUCCESS_FETCHING_LISTS_TALENTS,
  ERROR_FETCHING_LISTS_TALENTS,
  START_FETCHING_LISTS_EVENTS,
  SUCCESS_FETCHING_LISTS_EVENTS,
  ERROR_FETCHING_LISTS_EVENTS,
} from './constants';
import { getData } from '../../utils/fetch';

let debouncedFetchingListsCategories = debounce(getData, 1000);
let debouncedFetchingListsTalents = debounce(getData, 1000);
let debouncedFetchingListsEvents = debounce(getData, 1000);

// categories
export const startFetchingListsCategories = () => {
  return {
    type: START_FETCHING_LISTS_CATEGORIES,
  };
};

export const errorFetchingListsCategories = () => {
  return {
    type: ERROR_FETCHING_LISTS_CATEGORIES,
  };
};

export const successFetchingListsCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_CATEGORIES,
    categories,
  };
};

export const fetchingListsCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsCategories());

    try {
      let res = await debouncedFetchingListsCategories('/cms/categories');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: {value: res._id, name: 'category'},
        });

        dispatch(
          successFetchingListsCategories({
            categories: _temp,
          })
        );
      });
    } catch (err) {
      dispatch(errorFetchingListsCategories());
    }
  };
};

// talents
export const startFetchingListsTalents = () => {
  return {
    type: START_FETCHING_LISTS_TALENTS,
  };
};

export const errorFetchingListsTalents = () => {
  return {
    type: ERROR_FETCHING_LISTS_TALENTS,
  };
};

export const successFetchingListsTalents = ({ talents }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_TALENTS,
    talents,
  };
};

export const fetchingListsTalents = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsTalents());

    try {
      let res = await debouncedFetchingListsTalents('/cms/talents');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: {value: res._id, name: 'talent'},
        });

        dispatch(
          successFetchingListsTalents({
            talents: _temp,
          })
        );
      });
    } catch (err) {
      dispatch(errorFetchingListsTalents());
    }
  };
};

// events
export const startFetchingListsEvents = () => {
  return {
    type: START_FETCHING_LISTS_EVENTS,
  };
};

export const errorFetchingListsEvents = () => {
  return {
    type: ERROR_FETCHING_LISTS_EVENTS,
  };
};

export const successFetchingListsEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_EVENTS,
    events,
  };
};

export const fetchingListsEvents = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsEvents());

    try {
      let res = await debouncedFetchingListsEvents('/cms/events');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: {value: res._id, name: 'event'},
        });

        dispatch(
          successFetchingListsEvents({
            events: _temp,
          })
        );
      });
    } catch (err) {
      dispatch(errorFetchingListsEvents());
    }
  };
};
