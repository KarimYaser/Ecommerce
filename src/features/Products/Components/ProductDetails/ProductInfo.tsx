"use client";

import { Product } from "../../Types/products.types";
import StarRating from "./StarRating";
import ProductFeatures from "./ProductFeatures";
import {
  faCartShopping,
  faBolt,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  getLoggedUserWishlist,
} from "@/features/wishlist/server/wishlist.action";
import { setWishlist } from "@/features/wishlist/store/wishlist.slice";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();

  const handleAddToCart = async (productId: string, qty: number = quantity) => {
    try {
      const response = await addProductToCart({
        productId,
        quantity: qty,
      });

      if (response) {
        // console.log(response);
        if (response.status === "success") {
          toast.success(response.message);
          const cartResponse = await getLoggedUserCart();
          dispatch(setCartInfo(cartResponse));
        }
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
      // console.error(error);
    }
  };
  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishlist(productId);

      if (response) {
        // console.log(response);
        if (response.status === "success") {
          toast.success("Added to wishlist");
          const wishlistResponse = await getLoggedUserWishlist();
          if (wishlistResponse?.data) {
            dispatch(setWishlist(wishlistResponse.data));
          }
        }
      }
      // console.error(error);
    } catch (_error) {
      toast.error("Failed to add product to wishlist.");
      // console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>{product.category.name}</span>
        <span>/</span>
        <span>{product.brand.name}</span>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      {/* Rating */}
      <StarRating
        rating={product.ratingsAverage}
        reviewCount={product.ratingsQuantity}
      />

      {/* Price */}
      <div className="flex items-baseline gap-3">
        {product.priceAfterDiscount ? (
          <>
            <span className="text-3xl font-bold text-gray-900">
              {product.priceAfterDiscount} EGP
            </span>
            <span className="text-xl text-gray-500 line-through">
              {product.price} EGP
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">
            {product.price} EGP
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full w-fit">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-sm font-medium">In Stock</span>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Description: </span>
          <span>{product.description}</span>
        </div>
        {product.subcategory && product.subcategory.length > 0 && (
          <div>
            <span className="font-medium">Category: </span>
            <span>{product.subcategory[0].name}</span>
          </div>
        )}
        <div>
          <span className="font-medium">Brand: </span>
          <span>{product.brand.name}</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decrement}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              disabled={quantity >= product.quantity}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {product.quantity} available
          </span>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
        <span className="text-lg font-medium text-gray-700">Total Price:</span>
        <span className="text-2xl font-bold text-green-600">
          {(product.priceAfterDiscount || product.price) * quantity}.00 EGP
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAddToCart(product._id, quantity)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
            <FontAwesomeIcon icon={faBolt} className="w-5 h-5" />
            Buy Now
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleAddToWishlist(product._id)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:*:text-red-500 text-gray-700 font-medium rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
            Add to Wishlist
          </button>
          <button className="px-4 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
            <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
