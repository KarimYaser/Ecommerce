"use server";

import axios from "axios";
import {
  ProductsResponse,
  singleProductResponse,
} from "../Types/products.types";

export async function getAllProducts(): Promise<ProductsResponse> {
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
      headers: {},
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getProductById(
  id: string,
): Promise<singleProductResponse> {
  try {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
      headers: {},
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
