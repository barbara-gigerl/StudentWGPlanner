import axios from 'axios';

export const API_ROOT = `http://localhost:1337/parse/`;

export const CALL_API = Symbol('CALL_API');

function callApi(endpoint, data) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const options = { headers: {
    'X-Parse-Application-Id': 'StudentWGPlanner'
  }};

  let request;

  if (data) {
    request = axios.post(fullUrl, data, options);
  } else {
    request = axios.get(fullUrl, options);
  }

  return request
    .then(res => res.data);
}

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    // Never forget to return!!!!!!
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, data } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, data).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
