import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { productState } from './initialState';

export default function reducer(merchant = cloneDeep(productState), { type, payload }) {
  switch (type) {
    case types.GET_MERCHANT_PRODUCTS_SUCCESS:
      return {
        // items: merchant.items.concat(payload.items),
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_MERCHANT_PRODUCTS:
    case types.GET_MERCHANT_PRODUCTS_ERROR:
    default:
      return merchant;
  }
}
