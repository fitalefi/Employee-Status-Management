import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_ALL_EMPLOYEES_STATUSES,
  FEATCH_STATUSES_TO_DISPALY,
  UPDATE_STATUS
} from './types';

// Get current users profile

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllEmployeesStatus = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_ALL_EMPLOYEES_STATUSES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = values => async dispatch => {
  const res = await axios.post('/api/users/updateStatus', values);

  dispatch({
    type: UPDATE_STATUS,
    payload: res.data
  });
};

export const fetchStatusesToDisplay = () => async dispatch => {
  const res = await axios.get('/api/users/statues_to_display');

  dispatch({ type: FEATCH_STATUSES_TO_DISPALY, payload: res.data });
};
