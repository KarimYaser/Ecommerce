"use server";

import { cookies } from "next/headers";
import { AuthState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

type User = {
  name: string;
  id: string;
  role: string;
  email?: string;
};

export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true /* no one can access it from the client side */,
    // secure:true,
    sameSite: "strict",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 1 * 24 * 60 * 60,
  });
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return token;
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyToken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    if (data.message === "verified") {
      const { name, _id, role, email } = data.decoded;
      return {
        isAuthenticated: true,
        userInfo: {
          name,
          _id,
          role,
          email,
        },
      };
    } else {
      return {
        isAuthenticated: false,
        userInfo: null,
      };
    }
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}
