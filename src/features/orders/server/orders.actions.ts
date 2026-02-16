"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { Order } from "../types/orders.types";

export async function getUserOrders(): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("You must be logged in to view your orders");
  }

  try {
    // Decode token manually to avoid external dependencies if not available
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }) 
        .join(""),
    );

    const decodedToken = JSON.parse(jsonPayload);
    const userId = decodedToken.id;

    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
