const initialState = {
  singleOrder: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SINGLE_ORDER_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SINGLE_ORDER':
      return {
        ...state,
        singleOrder: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
