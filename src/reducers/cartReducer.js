import { loadState, saveState } from "../utils/localStorage";
import {
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
} from "./actionTypes";

const initialState = loadState() || {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  let updatedState;

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

        updatedState = {
          ...state,
          items: updatedItems,
        };
      } else {
        updatedState = {
          ...state,
          items: [
            ...state.items,
            { ...action.payload.product, quantity: action.payload.quantity },
          ],
        };
      }
      break;

    case UPDATE_CART_QUANTITY:
      updatedState = {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      break;

    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.productId
      );
      updatedState = {
        ...state,
        items: filteredItems,
      };
      break;

    default:
      return state;
  }

  saveState(updatedState);
  return updatedState;
};

export default cartReducer;
