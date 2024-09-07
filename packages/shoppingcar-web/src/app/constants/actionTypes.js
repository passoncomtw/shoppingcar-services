import constants from 'flux-constants';

const syncActionTypes = [
];

export const basicAsyncActionTypes = [
  'SIGN_IN',
  'CREATE_TODO',
  'UPDATE_TODO',
  'GET_TODO',
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