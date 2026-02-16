"use client";

import { useAppSelector, useAppDispatch } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCreditCard,
  faShieldAlt,
  faTruck,
  faUndo,
  faHome,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormValues } from "../schemas/checkout.schema";
import { useState, useEffect } from "react";
import createCashOrder, {
  default as createOnlineOrder,
} from "../server/checkout.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/features/cart/store/cart.slice";

import {
  createCashOrder as createCashOrderAction,
  createOnlineOrder as createOnlineOrderAction,
} from "../server/checkout.actions";

export default function CheckoutScreen() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    setIsProcessing(true);
    try {
      if (!cart.cartId) {
        toast.error("Your cart is empty");
        return;
      }

      if (paymentMethod === "cash") {
        const response = await createCashOrderAction({
          cartId: cart.cartId,
          shippingAddress: data,
        });
        if (response.status === "success") {
          toast.success("Order placed successfully!");
          dispatch(clearCart());
          router.push("/orders"); // Redirect to orders page
        }
      } else {
        const response = await createOnlineOrderAction({
          cartId: cart.cartId,
          shippingAddress: data,
          //   url: `${window.location.origin}`,
          url: `${window.location.origin}/orders`, // this is the url that the user will be redirected to after payment
        });
        if (response.status === "success" && response.session.url) {
          window.location.href = response.session.url;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart.numOfCartItems) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-green-600">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-semibold">Checkout</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 text-white p-3 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-2xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            Review your items and complete your purchase
          </p>
        </div>
        <Link
          href="/cart"
          className="ml-auto flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition"
        >
          ← Back to Cart
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faHome} />
              <h2 className="font-bold">Shipping Address</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">
              Where should we deliver your order?
            </p>

            <div className="grid gap-6">
              {/* City */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("city")}
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    className={`w-full pl-4 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.city
                        ? "border-red-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Details */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("details")}
                    placeholder="Street name, building number, floor, apartment..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.details
                        ? "border-red-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  <FontAwesomeIcon
                    icon={faHome}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                {errors.details && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.details.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="01xxxxxxxxx"
                    className={`w-full pl-4 pr-16 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    Egyptian numbers only
                  </span>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6">
              <FontAwesomeIcon icon={faMoneyBillWave} />
              <h2 className="font-bold">Payment Method</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">
              Choose how you'd like to pay
            </p>

            <div className="space-y-4">
              <label
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-green-500 bg-green-50 ring-1 ring-green-500"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <div className="bg-green-100 p-3 rounded-lg mr-4 text-green-600">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-500">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
                <div className="ml-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-green-600" : "border-gray-300"}`}
                  >
                    {paymentMethod === "cash" && (
                      <div className="w-3 h-3 bg-green-600 rounded-full" />
                    )}
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "online"
                    ? "border-green-500 bg-green-50 ring-1 ring-green-500"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <div className="bg-gray-100 p-3 rounded-lg mr-4 text-gray-600">
                  <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900">Pay Online</h3>
                  <p className="text-sm text-gray-500">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                  <div className="flex gap-2 mt-2">
                    {/* Placeholder for card icons if needed */}
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-green-600" : "border-gray-300"}`}
                  >
                    {paymentMethod === "online" && (
                      <div className="w-3 h-3 bg-green-600 rounded-full" />
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg flex items-start gap-3 text-sm text-green-800">
              <FontAwesomeIcon icon={faShieldAlt} className="mt-0.5" />
              <div>
                <span className="font-bold">Secure & Encrypted</span>
                <p>
                  Your payment info is protected with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-4">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 mb-6 w-full">
              <FontAwesomeIcon icon={faLock} />
              <h2 className="font-bold">Order Summary</h2>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {cart.numOfCartItems} Item(s)
            </p>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cart.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500 text-right">
                      {item.count} x {item.price} EGP
                    </p>
                    <p className="text-sm font-bold text-gray-900 text-right">
                      {item.count * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{cart.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faTruck} className="text-gray-400" />{" "}
                  Shipping
                </span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-green-600 pt-2 border-t border-gray-100 mt-2">
                <span>Total</span>
                <span>{cart.totalCartPrice} EGP</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-xl transition-all transform hover:-translate-y-1 mt-8 flex items-center justify-center gap-2 ${isProcessing ? "opacity-75 cursor-wait" : ""}`}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <FontAwesomeIcon icon={faLock} /> Place Order
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-green-500"
                />{" "}
                Secure
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faTruck} className="text-blue-500" />{" "}
                Fast Delivery
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUndo} className="text-orange-500" />{" "}
                Easy Returns
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
