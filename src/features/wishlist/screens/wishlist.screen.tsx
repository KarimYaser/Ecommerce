"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  removeFromWishlist,
  getLoggedUserWishlist,
} from "../server/wishlist.action";
import {
  setWishlist,
  removeProductFromWishlistState,
} from "../store/wishlist.slice";
import { addProductToCart } from "@/features/cart/server/cart.actions";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function WishlistScreen() {
  const wishlist = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getLoggedUserWishlist();
        if (response?.data) {
          dispatch(setWishlist(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };
    fetchWishlist();
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await removeFromWishlist(productId);
        dispatch(removeProductFromWishlistState(productId));
        Swal.fire("Deleted!", "Product removed from wishlist.", "success");
      } catch (_error) {
        toast.error("Failed to remove product.");
      }
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addProductToCart({ productId, quantity: 1 });
      dispatch(setCartInfo(response));
      toast.success("Product added to cart");
      // Optional: Remove from wishlist after adding to cart
      // handleRemoveFromWishlist(productId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add product to cart";
      if (errorMessage.includes("logged in")) {
        toast.error("You must log in");
      } else {
        toast.error(errorMessage || "Failed to add product to cart");
      }
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
        <span className="text-gray-900">Wishlist</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 text-red-600 p-3 rounded-lg">
          <FontAwesomeIcon icon={faHeart} className="text-2xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">
            You have{" "}
            <span className="text-red-600 font-semibold">
              {wishlist.count} items
            </span>{" "}
            in your wishlist
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {wishlist.data.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-6xl text-gray-300 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-4">
              Explore products and save your favorites!
            </p>
            <Link
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {wishlist.data.map((product) => (
              <div
                key={product._id || product.id}
                className="p-6 border-b border-gray-100 last:border-b-0 flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Product Details */}
                <div className="grow text-center md:text-left">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category?.name}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {product.price} EGP
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleAddToCart(product._id || product.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      handleRemoveFromWishlist(product._id || product.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-lg hover:border-red-500"
                    title="Remove from wishlist"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
