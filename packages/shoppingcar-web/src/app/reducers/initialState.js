const authState = {
  isAuth: false,
  user: {},
};

const todoState = {
  items: [],
};

const initialState = {
  auth: authState,
  todo: todoState,
};

export default initialState;
