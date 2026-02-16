import { Product } from "../../Products/Types/products.types";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}
