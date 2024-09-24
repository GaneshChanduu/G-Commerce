export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: {
    product: Product;
    quantity: number;
  };
}

export interface UpdateCartQuantityAction {
  type: typeof UPDATE_CART_QUANTITY;
  payload: {
    productId: string;
    quantity: number;
  };
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: {
    productId: string;
  };
}

export type CartActionTypes =
  | AddToCartAction
  | UpdateCartQuantityAction
  | RemoveFromCartAction;
