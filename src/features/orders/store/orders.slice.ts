import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types/orders.types";

export interface OrdersState {
  count: number;
  data: Order[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  count: 0,
  data: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.data = action.payload;
      state.count = action.payload.length;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
