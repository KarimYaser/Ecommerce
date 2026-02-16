"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  forgetPasswordSchema,
  forgetPasswordFormValues,
} from "../../schemas/forgetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import forgetPasswordAction from "../../server/forgetPassword.actions";
export default function ForgetPasswordForm() {
    const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<forgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<forgetPasswordFormValues> = async (data) => {
    const response = await forgetPasswordAction(data);
    if (response.success) {
      toast.success(response.message);
      setTimeout(() => {
        router.push("/reset-password");
      }, 2000);
    } else {
      if (response?.errors) {
        Object.keys(response.errors).forEach((key) => {
          setError(key as keyof forgetPasswordFormValues, {
            message: response.errors![key],
          });
        });
      }
      toast.error(response.message);
    }
  };
  return (
    <>
      <div className="max-w-full px-4 py-12">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-1">
                <span className="text-green-600">Fresh</span>
                <span className="text-gray-800">Cart</span>
              </h1>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600 text-sm">
                No worries, we&apos;ll send you a reset code
              </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-0 mb-8">
              {/* Step 1 - Email (Active) */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              </div>
              {/* Connector */}
              <div className="w-12 h-0.5 bg-gray-300"></div>
              {/* Step 2 - Code */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-400">
                <FontAwesomeIcon icon={faKey} className="text-sm" />
              </div>
              {/* Connector */}
              <div className="w-12 h-0.5 bg-gray-300"></div>
              {/* Step 3 - Lock */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-400">
                <FontAwesomeIcon icon={faLock} className="text-sm" />
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="form-control w-full pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Reset Code</span>
                )}
              </button>
            </form>

            {/* Back to Sign In Link */}
            <div className="text-center mt-5">
              <Link
                href="/login"
                className="text-green-600 text-sm hover:underline inline-flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                Back to Sign In
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Remember Password */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-gray-800 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
    </>
  )
}
