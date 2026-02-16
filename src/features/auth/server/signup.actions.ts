"use server";

import { signupFormValues, signupSchema } from "../schemas/signup.schema";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";

/**
 * Server action for handling user registration/signup
 *
 * This function validates the signup form data using Zod schema validation,
 * then sends a POST request to the ecommerce API to register the user.
 *
 * @param values - The signup form values containing user information
 * @returns An object indicating success/failure status with message and optional data/errors
 */
export default async function signupAction(values: signupFormValues) {
  // Validate form data against the signup schema
  const validationResult = signupSchema.safeParse(values);

  /**
   * Handle Validation Errors
   * If validation fails, extract field-specific error messages and return them
   */
  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    // Iterate through validation errors and map them to their respective fields
    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;

        // Only keep the first error message for each field
        if (!errors[field]) {
          errors[field] = message;
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
   * Prepare Request Body
   * Remove the 'terms' field as it's not required by the API
   * (terms acceptance is handled on the client side)
   */
  const { terms, ...requestedBody } = values;

  /**
   * API Call to Register User
   * Send POST request to the ecommerce API signup endpoint
   */
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: requestedBody,
    };
    const { data } = await axios.request(options);

    /**
     * Handle Successful Registration
     * Return success response with user data
     */
    if (data.message === "success") {
      return {
        success: true,
        message: "User registered successfully",
        data,
      };
    }

    /**
     * Handle API-level Errors
     * Return failure response with error message from API
     */
    return {
      success: false,
      message: data.message || "Registration failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      // console.log(errorMessage);
      if (errorMessage === "Account Already Exists") {
        // toast.error(errorMessage);
        return {
          success: false,
          message: "account exists",
          errors: {
            email: "an account with this email already exists",
          },
        };
      }
    }
    return {
      success: false,
      message: "Registration failed, try again later",
    };
  }
}
