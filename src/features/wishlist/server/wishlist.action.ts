"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { WishlistResponse } from "../types/wishlist.types";

export async function addToWishlist(
  productId: string,
): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("You must be logged in to add a product to your wishlist");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        productId: productId,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("You must be logged in to get your wishlist");
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: {
        token: token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromWishlist(
  productId: string,
): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error(
      "You must be logged in to remove a product from your wishlist",
    );
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token: token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
