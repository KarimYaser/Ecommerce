"use server";

import { loginFormValues, loginSchema } from "../schemas/login.schema";
import axios, { AxiosError } from "axios";

/**
 * Server action for handling user login/signin
 *
 * This function validates the login form data using Zod schema validation,
 * then sends a POST request to the ecommerce API to authenticate the user.
 *
 * @param values - The login form values containing email and password
 * @returns An object indicating success/failure status with message and optional data/errors
 */
export default async function loginAction(values: loginFormValues) {
  // Validate form data against the login schema
  const validationResult = loginSchema.safeParse(values);

  /**
   * Handle Validation Errors
   * If validation fails, extract field-specific error messages and return them
   */
  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    // Iterate through validation errors and map them to their respective fields
    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        const message = issue.message;

        // Only keep the first error message for each key
        if (!errors[key]) {
          errors[key] = message;
        }
      });

      return {
        success: false,
        message: "Validation errors",
        errors,
      };
    }
  }

  /**
   * API Call to Authenticate User
   * Send POST request to the ecommerce API signin endpoint
   */
  try {
    /**
     * Prepare Request Body
     * Remove the 'rememberMe' field as it's not required by the API
     * (remember me is handled on the client side)
     */
    const { rememberMe, ...requestedBody } = values;
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: requestedBody,
    };
    const { data } = await axios.request(options);

    /**
     * Handle Successful Login
     * Return success response with user data and token
     */
    if (data.message === "success") {
      return {
        success: true,
        message: "Login successful",
        data,
      };
    }

    /**
     * Handle API-level Errors
     * Return failure response with error message from API
     */
    return {
      success: false,
      message: data.message || "Login failed",
    };
  } catch (error) {
    /**
     * Handle API Error Responses
     * Axios throws an error for non-2xx status codes (400, 401, etc.)
     * Extract the actual error message from the API response
     */
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;

      // Check for specific error types
      if (errorMessage?.toLowerCase().includes("incorrect email or password")) {
        return {
          success: false,
          message: "Incorrect email or password",
          errors: {
            email: "Please check your credentials",
            password: "Please check your credentials",
          },
        };
      }

      // Return the API error message if available
      if (errorMessage) {
        return {
          success: false,
          message: errorMessage,
        };
      }
    }

    /**
     * Handle Network/Server Errors
     * Return generic error message for unexpected errors (network issues, etc.)
     */
    return {
      success: false,
      message: "Login failed, please try again later",
    };
  }
}
