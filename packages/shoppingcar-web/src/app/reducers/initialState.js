const authState = {
  isAuth: false,
  user: {},
};

const merchantState = {
  merchantItems: [],
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: ""
  }
};

const initialState = {
  auth: authState,
  merchant: merchantState,
};

export default initialState;
