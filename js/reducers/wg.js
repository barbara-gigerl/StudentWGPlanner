import {
  WG_CREATE,
  WG_SUCCESS,
  WG_FAILURE
} from '../actions';

export default (state = { }, action) => {
  switch (action.type) {
    case WG_CREATE:
      return { isFetching: true };
    case WG_SUCCESS:
      return { isFetching: false, data: action.response };
    case WG_FAILURE:
      return { isFetching: false, error: true };
  }
  return state;
}
