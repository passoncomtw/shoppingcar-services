import constants from 'flux-constants';

const syncActionTypes = [
  'START_FETCHING',
  'STOP_FETCHING',
];

export const basicAsyncActionTypes = [
  'LOGIN',
  'LOGOUT',
  // 'INITIAL_APP',
];

export const asyncActionTypes = basicAsyncActionTypes.reduce((result, actionType) => {
  return [
    ...result,
    actionType,
    `${actionType}_SUCCESS`,
    `${actionType}_ERROR`
  ];
}, []);

export default constants([...asyncActionTypes, ...syncActionTypes]);