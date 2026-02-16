"use server";

import {
  forgetPasswordFormValues,
  forgetPasswordSchema,
} from "../schemas/forgetPassword.schema";
import axios, { AxiosError } from "axios";

/**
 * Server action for handling forgot password requests
 *
 * This function validates the email form data using Zod schema validation,
 * then sends a POST request to the ecommerce API to send a password reset code.
 *
 * @param values - The form values containing the user's email
 * @returns An object indicating success/failure status with message and optional errors
 */
export default async function forgetPasswordAction(
  values: forgetPasswordFormValues,
) {
  // Validate form data against the forget password schema
  const validationResult = forgetPasswordSchema.safeParse(values);

  /**
   * Handle Validation Errors
   * If validation fails, extract field-specific error messages and return them
   */
  if (!validationResult.success) {
    const errors: Record<string, string> = {};

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
   * API Call to Send Reset Code
   * Send POST request to the ecommerce API forgotPasswords endpoint
   */
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);

    /**
     * Handle Successful Request
     * Return success response with status info
     */
    if (data.statusMsg === "success") {
      return {
        success: true,
        message: data.message || "Reset code sent to your email",
      };
    }

    /**
     * Handle API-level Errors
     * Return failure response with error message from API
     */
    return {
      success: false,
      message: data.message || "Failed to send reset code",
    };
  } catch (error) {
    /**
     * Handle API Error Responses
     * Axios throws an error for non-2xx status codes (400, 404, etc.)
     * Extract the actual error message from the API response
     */
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;

      // Check if the email doesn't exist
      if (
        errorMessage
          ?.toLowerCase()
          .includes("no user registered with this email")
      ) {
        return {
          success: false,
          message: "No account found with this email",
          errors: {
            email: "No account found with this email address",
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
      message: "Failed to send reset code, please try again later",
    };
  }
}
