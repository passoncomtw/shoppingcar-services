export const authState = {
  isAuth: false,
  user: {},
};

export const shoppingcarState = {
  item: {},
};

export const merchantState = {
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  },
};

export const orderState = {
  detail: {
    totalAmount: 0,
    id: null,
    orderItems: [],
  },
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  },
};

export const productState = {
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  },
};
