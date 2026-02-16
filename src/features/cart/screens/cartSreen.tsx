"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faPlus,
  faMinus,
  faTrash,
  faUser,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { removeProduct, setCartInfo, clearCart } from "../store/cart.slice";
import {
  removeProductFromCart,
  updateProductQuantity,
  clearCart as clearCartAction,
} from "../server/cart.actions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
// import "sweetalert2/dist/sweetalert2.min.css";

export default function CartScreen() {
  const cart = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleRemoveProductFromCart = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });
    if (result.isConfirmed) {
      const response = await removeProductFromCart({ productId });
      dispatch(setCartInfo(response));
      //   console.log(response);
      Swal.fire("Deleted!", "Your product has been removed.", "success");
    }
  };

  const handleUpdateProduct = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      // handleRemoveProductFromCart(productId);
      return;
    }
    // dispatch(updateProductQuantity({ productId, quantity }));
    try {
      const response = await updateProductQuantity({ productId, quantity });
      dispatch(setCartInfo(response));
      toast.success("Your product has been updated.");
    } catch (error) {
      toast.error("Your product has not been updated.");
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    });
    if (result.isConfirmed) {
      const response = await clearCartAction();
      dispatch(clearCart());
      Swal.fire("Deleted!", "Your cart has been cleared.", "success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Shopping Cart</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-600 text-white p-3 rounded-lg">
          <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">
            You have{" "}
            <span className="text-green-600 font-semibold">
              {cart.numOfCartItems} items
            </span>{" "}
            in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-6xl text-gray-300 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-4">
                Add some products to get started!
              </p>
              <Link
                href="/"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {cart.products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-6 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-green-600 mb-2">
                      {item.product.category.name}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      {item.price} EGP
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleUpdateProduct(item.product._id, item.count - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="text-gray-600 text-sm"
                        />
                      </button>
                      <span className="px-3 text-sm font-semibold">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateProduct(item.product._id, item.count + 1)
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs mt-2 text-gray-500">Total</p>
                      <p className="text-lg font-bold text-gray-900">
                        {item.price * item.count}{" "}
                        <span className="text-sm">EGP</span>
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveProductFromCart(item.product._id)
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/"
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Clear all items
                </button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">
                  Subtotal ({cart.numOfCartItems} items)
                </span>
                <span className="font-semibold">{cart.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Shipping</span>
                <span className="text-green-400 text-xs">FREE</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Estimated Total</span>
                <span className="text-green-400">
                  {cart.totalCartPrice} EGP
                </span>
              </div>
            </div>

            {isAuthenticated ? (
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Link href="/checkout">
                  <FontAwesomeIcon icon={faUser} />
                  Proceed to Checkout
                </Link>
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <FontAwesomeIcon icon={faUser} />
                  Login to Checkout
                </Link>
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-green-400 hover:text-green-300"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700 space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-400 mt-0.5"
                />
                <span>Your cart items will be saved</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-400 mt-0.5"
                />
                <span>Track your orders easily</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-400 mt-0.5"
                />
                <span>Access exclusive member deals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
