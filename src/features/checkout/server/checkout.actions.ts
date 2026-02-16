"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

type shippingAddress = {
  city: string;
  phone: string;
  details: string;
};

export async function createCashOrder({
  cartId,
  shippingAddress,
}: {
  cartId: string;
  shippingAddress: shippingAddress;
}): Promise<any> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("You must be logged in to add a product to your wishlist");
  }

  {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          shippingAddress,
        },
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export async function createOnlineOrder({
  cartId,
  shippingAddress,
  url,
}: {
  cartId: string;
  shippingAddress: shippingAddress;
  url: string;
}): Promise<{
  status: string;
  session: {
    url: string;
  };
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("You must be logged in to add a product to your wishlist");
  }

  {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          shippingAddress,
        },
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
