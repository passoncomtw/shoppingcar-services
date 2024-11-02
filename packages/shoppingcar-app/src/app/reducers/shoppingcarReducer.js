import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { shoppingcarState } from './initialState';

export default function reducer(shoppingcar = cloneDeep(shoppingcarState), { type, payload }) {
  switch (type) {
    case types.GET_SHOPPINGCAR_SUCCESS:
      return {
        ...shoppingcar,
        item: payload.item,
      };
    case types.GET_SHOPPINGCAR:
    case types.GET_SHOPPINGCAR_ERROR:
    default:
      return shoppingcar;
  }
}
