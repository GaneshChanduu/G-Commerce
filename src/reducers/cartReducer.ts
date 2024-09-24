import {
  CartActionTypes,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
} from "./actionTypes";

export interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.items.findIndex(
        (item) => item.id === action.payload.product.id
      );

      if (existingProductIndex >= 0) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload.product, quantity: action.payload.quantity },
          ],
        };
      }
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.productId
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
