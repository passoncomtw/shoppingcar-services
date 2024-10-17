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

const userState = {
  items: [],
  totalAmount: 0,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: ""
  }
};

const productState = {
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
  user: userState,
  product: productState,
  merchant: merchantState,
};

export default initialState;
