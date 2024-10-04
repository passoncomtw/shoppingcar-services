import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { merchantState } from './initialState';

export default function reducer(merchant = cloneDeep(merchantState), { type, payload }) {
  switch (type) {
    case types.GET_MERCHANTS_SUCCESS:
      return {
        items: merchant.items.concat(payload.items),
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_MERCHANTS:
        case types.GET_MERCHANTS_ERROR:
    default:
      return merchant;
  }
}
