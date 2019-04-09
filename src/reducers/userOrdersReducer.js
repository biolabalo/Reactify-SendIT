/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const initialState = {
  userOrders: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'USER_ORDERS_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'USER_ORDERS':
      return {
        ...state,
        userOrders: action.payload,
        loading: false,
      };
    case 'CHANGE_ORDER_STATUS':
      return {
        ...state,
        userOrders: state.userOrders.map(order => (order.id === action.payload.id ? (order = action.payload) : order)),
      };
    default:
      return state;
  }
}
