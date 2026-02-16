"use server";

import axios from "axios";
import { CategoryResponse } from "../types/Category.types";

export async function getAllCategories(): Promise<CategoryResponse> {
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
      headers: {},
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
