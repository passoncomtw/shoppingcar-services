import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { merchantState } from './initialState';

export default function reducer(merchant = cloneDeep(merchantState), { type, payload }) {
  switch (type) {
    case types.SIGNOUT:
      return cloneDeep(merchantState);
    case types.GET_MERCHANTS_SUCCESS:
      return {
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_MERCHANTS:
    case types.GET_MERCHANTS_ERROR:
    default:
      return merchant;
  }
}
