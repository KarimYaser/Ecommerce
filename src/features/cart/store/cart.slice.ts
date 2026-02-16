import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../types/cart.types";

export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInfo: (state, action: PayloadAction<CartResponse>) => {
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.data._id;
      state.products = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    },
    removeProduct: (
      state,
      action: PayloadAction<{ id: string; price: number }>,
    ) => {
      const productId = action.payload.id;
      const removedProduct = state.products.find(
        (item) => item.product._id === productId,
      );
      if (removedProduct) {
        state.products = state.products.filter(
          (item) => item.product._id !== productId,
        );
        state.numOfCartItems -= state.products.length;
        state.totalCartPrice -= removedProduct.price * removedProduct.count;
      }
    },
    clearCart: (state) => {
      state.numOfCartItems = 0;
      state.cartId = null;
      state.products = [];
      state.totalCartPrice = 0;
    },
  },
});

export const { setCartInfo, removeProduct, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
