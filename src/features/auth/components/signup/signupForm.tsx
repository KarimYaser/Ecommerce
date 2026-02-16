"use client";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupFormValues, signupSchema } from "../../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign } from "crypto";
import signupAction from "../../server/signup.actions";
import { set } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function signupForm() {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<signupFormValues> = async (values) => {
    try {
      const response = await signupAction(values);
      // console.log(response);
      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (response?.errors) {
          /* {name: "name is required", } */

          // console.log("ERROR ");
          Object.keys(response.errors).forEach((key) => {
            // console.log(key, response.errors[key]);
            setError(key as keyof signupFormValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {}
  };

  return (
    <div className="max-w-full mx-auto px-4 py-12  ">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Start your fresh journey with us today
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
            <span className="text-gray-700 font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-blue-600 text-lg"
            />
            <span className="text-gray-700 font-medium">Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form Fields */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ali"
              className="form-control w-full"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="ali@example.com"
              className="form-control w-full"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              placeholder="create a strong password"
              className="form-control w-full"
              {...register("password")}
            />
            <div className="password-strength h-2 mt-4 bg-gray-200 rounded-lg overflow-hidden">
              <div className="progress w-1/3 h-full bg-red-500 rounded-lg"></div>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm your password"
              className="form-control w-full"
              {...register("rePassword")}
            />
          </div>
          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rePassword.message}
            </p>
          )}
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1 234 567 8900"
              className="form-control w-full"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
          {/* Terms & Conditions */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className="mt-1 w-4 h-4 border border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms" className="text-gray-700">
              I agree to the{" "}
              <Link href="/terms" className="text-primary-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary-500 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="space-x-2">
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Create My Account</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-500 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
