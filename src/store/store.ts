import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "@/features/auth/store/auth.slice";
import { cartReducer, CartState } from "@/features/cart/store/cart.slice";
import {
  wishlistReducer,
  WishlistState,
} from "@/features/wishlist/store/wishlist.slice";
import {
  ordersReducer,
  OrdersState,
} from "@/features/orders/store/orders.slice";
import { useDispatch, useSelector } from "react-redux";

export type preloadedState = {
  auth: AuthState;
  cart: CartState;
  wishlist: WishlistState;
  orders: OrdersState;
};

export default function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      orders: ordersReducer,
    },
    preloadedState,
  });
  return store;
}

type AppStore = ReturnType<typeof createStore>;
type AppState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export type { AppStore, AppState, AppDispatch };

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
