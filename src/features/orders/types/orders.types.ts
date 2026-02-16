import { Product } from "@/features/Products/Types/products.types";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  paidAt?: string;
}
