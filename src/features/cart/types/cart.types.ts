import { Product } from "../../Products/Types/products.types";

export interface CartItem {
  count: number;
  price: number;
  product: Product;
  _id: string;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}
