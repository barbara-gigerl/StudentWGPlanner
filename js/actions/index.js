import { CALL_API } from '../store/api';

export const WG_CREATE = 'WG_CREATE';
export const WG_SUCCESS = 'WG_SUCCESS';
export const WG_FAILURE = 'WG_FAILURE';

export function createWG(name) {
  return {
    [CALL_API]: {
      types: [ WG_CREATE, WG_SUCCESS, WG_FAILURE ],
      endpoint: 'classes/wgs',
      data: { name, users: [] }
    }
  };
};
