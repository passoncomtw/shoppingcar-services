import cloneDeep from 'lodash/cloneDeep';
import types from '../constants/actionTypes';
import { orderState } from './initialState';

export default function reducer(order = cloneDeep(orderState), { type, payload }) {
  switch (type) {
    case types.GET_ORDERS_SUCCESS:
      return {
        items: payload.items,
        totalAmount: payload.totalCount,
        pageInfo: payload.pageInfo,
      };
    case types.GET_ORDERS:
    case types.GET_ORDERS_ERROR:
    default:
      return order;
  }
}
