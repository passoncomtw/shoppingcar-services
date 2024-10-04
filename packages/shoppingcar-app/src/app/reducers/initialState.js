export const authState = {
  isAuth: false,
  user: {},
};

export const merchantState = {
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: ""
  },
};
