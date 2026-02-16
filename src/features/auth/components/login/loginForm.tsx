"use client";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEye,
  faEyeSlash,
  faLock,
  faEnvelope,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, loginFormValues } from "../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import loginAction from "../../server/login.actions";
import { setToken } from "../../server/auth.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAuthInfo } from "../../store/auth.slice";
import { AppState } from "@/store/store";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<loginFormValues> = async (data) => {
    const response = await loginAction(data);
    if (response.success) {
      /* set token in cookie */
      await setToken(response.data.token, data.rememberMe);
      /* set token in redux */
      dispatch(
        setAuthInfo({ isAuthenticated: true, userInfo: response.data.user }),
      );
      toast.success("Logged in successfully");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      if (response?.errors) {
        Object.keys(response.errors).forEach((key) => {
          setError(key as keyof loginFormValues, {
            message: response.errors[key],
          });
        });
      }
    }
  };

  return (
    <div className="max-w-full px-4 py-12">
      <div className="bg-white rounded-lg p-12 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">
            <span className="text-green-600">Fresh</span>
            <span className="text-gray-800">Cart</span>
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FontAwesomeIcon icon={faGoogle} className="text-red-500 text-lg" />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-blue-600 text-lg"
            />
            <span className="text-gray-700 font-medium">
              Continue with Facebook
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm uppercase">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form Fields */}
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
                placeholder="Enter your email"
                className="form-control w-full pl-10"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium text-sm"
              >
                Password
              </label>
              <Link
                href="/forget-password"
                className="text-green-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="form-control w-full pl-10 pr-10"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 border border-gray-300 rounded focus:ring-green-500"
              {...register("rememberMe")}
            />
            <label htmlFor="rememberMe" className="text-gray-700 text-sm">
              Keep me signed in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            New to FreshCart?{" "}
            <Link
              href="/signup"
              className="text-green-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer Info */}
        <div className="flex justify-center items-center gap-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLock} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <span>50K+ Users</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <FontAwesomeIcon icon={faStar} className="text-gray-400" /> 4.9
            </span>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
