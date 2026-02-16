/**
 * Subcategory type - represents a subcategory of a product
 */
export type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

/**
 * Category type - represents the category of a product
 */
export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

/**
 * Brand type - represents the brand of a product
 */
export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

/**
 * Product type - represents a single product
 */
export type Product = {
  sold: number | null;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  availableColors?: string[];
};

/**
 * Metadata type - pagination information for the response
 */
export type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
};

/**
 * ProductsResponse type - the complete API response for getAllProducts
 */
export type ProductsResponse = {
  results: number;
  metadata: Metadata;
  data: Product[];
};

export interface singleProductResponse {
  data: Product;
}
