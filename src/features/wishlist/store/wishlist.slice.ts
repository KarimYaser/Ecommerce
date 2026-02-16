import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Products/Types/products.types";
// import { WishlistResponse } from "../types/wishlist.types";

export interface WishlistState {
  count: number;
  data: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  count: 0,
  data: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      state.count = action.payload.length;
    },
    removeProductFromWishlistState: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.count = state.data.length;
    },
  },
});

export const { setWishlist, removeProductFromWishlistState } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
