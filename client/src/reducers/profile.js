import {
  PROFILE_ERROR,
  GET_ALL_EMPLOYEES_STATUSES,
  FEATCH_STATUSES_TO_DISPALY
} from '../actions/types';

const initialState = {
  statusData: [],
  loading: true,
  error: {},
  allUsers: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_ALL_EMPLOYEES_STATUSES:
      return {
        ...state,
        allUsers: payload
      };

    case FEATCH_STATUSES_TO_DISPALY:
      return {
        ...state,
        statusData: payload
      };
    default:
      return state;
  }
}
