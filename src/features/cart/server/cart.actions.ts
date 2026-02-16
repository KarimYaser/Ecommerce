"use server";

import { verifyToken } from "@/features/auth/server/auth.actions";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse, CartItem } from "../types/cart.types";

// ... imports

export async function addProductToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("You must be logged in to add a product to your cart");
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        productId: productId,
        quantity: quantity,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLoggedUserCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("You must be logged in to get your cart");
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
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

export async function removeProductFromCart({
  productId,
}: {
  productId: string;
}): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("You must be logged in to remove a product from your cart");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
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

export async function updateProductQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("You must be logged in to update your cart");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "PUT",
      headers: {
        token: token,
      },
      data: {
        count: quantity,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function clearCart(): Promise<CartResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    throw new Error("You must be logged in to clear your cart");
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
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
