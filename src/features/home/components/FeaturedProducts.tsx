"use client";

import { getAllProducts } from "@/features/Products/Server/products.action";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import Image from "next/image";
import {
  faHeart,
  faArrowsRotate,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Product } from "@/features/Products/Types/products.types";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { setWishlist } from "@/features/wishlist/store/wishlist.slice";
import { useAppDispatch } from "@/store/store";
import {
  addToWishlist,
  getLoggedUserWishlist,
} from "@/features/wishlist/server/wishlist.action";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [_loading, _setLoading] = useState(true);
  const dispatch = useAppDispatch();

  // get all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
      // setLoading(false);
    };
    fetchProducts();
  }, []);
  // add product to cart
  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addProductToCart({
        productId,
        quantity: 1,
      });

      if (response) {
        // console.log(response);
        if (response.status === "success") {
          toast.success(response.message);
          const cartResponse = await getLoggedUserCart();
          dispatch(setCartInfo(cartResponse));
        }
      }
      // console.error(error);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add product to cart.";
      if (errorMessage.includes("logged in")) {
        toast.error("You must log in");
      } else {
        toast.error(errorMessage || "Failed to add product to cart.");
      }
      // console.error(error);
    }
  };
  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishlist(productId);

      if (response) {
        // console.log(response);
        if (response.status === "success") {
          toast.success( "Added to wishlist");
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

  // Helper function to render star ratings with partial stars support
  const renderStars = (rating: number, count: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars; // Get the decimal part (e.g., 0.2, 0.7, etc.)

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <div key={i} className="flex items-center justify-center w-3 h-3">
            <FontAwesomeIcon
              icon={faStarSolid}
              className="text-yellow-400 text-xs"
            />
          </div>,
        );
      } else if (i === fullStars && partialStar > 0) {
        // Partial star - use CSS clipping to show the exact percentage
        stars.push(
          <div
            key={i}
            className="relative flex items-center justify-center w-3 h-3"
          >
            {/* Empty star background */}
            <FontAwesomeIcon
              icon={faStarRegular}
              className="text-gray-300 text-xs"
            />
            {/* Filled star overlay with width clipping */}
            <div
              className="absolute top-0 left-0 overflow-hidden h-full flex items-center"
              style={{ width: `${partialStar * 100}%` }}
            >
              <FontAwesomeIcon
                icon={faStarSolid}
                className="text-yellow-400 text-xs"
              />
            </div>
          </div>,
        );
      } else {
        // Empty star
        stars.push(
          <div key={i} className="flex items-center justify-center w-3 h-3">
            <FontAwesomeIcon
              icon={faStarRegular}
              className="text-gray-300 text-xs"
            />
          </div>,
        );
      }
    }

    return (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5 items-center">{stars}</div>
        <span className="text-xs text-gray-500">({count})</span>
      </div>
    );
  };

  // Calculate discount percentage
  const getDiscountPercentage = (
    price: number,
    priceAfterDiscount?: number,
  ) => {
    if (!priceAfterDiscount) return null;
    return Math.round(((price - priceAfterDiscount) / price) * 100);
  };

  return (
    <section className="py-12 bg-gray-100/50">
      <div className="container">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          <span className="border-l-4 border-primary-600 pl-3">Featured</span>{" "}
          <span className="text-primary-600">Products</span>
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => {
            const discountPercentage = getDiscountPercentage(
              product.price,
              product.priceAfterDiscount,
            );

            return (
              /* card */
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow relative group"
              >
                {/* Discount Badge */}
                {discountPercentage && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded z-10">
                    - {discountPercentage}%
                  </div>
                )}
                {/* Action Icons */}
                <div className="absolute top-10 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button className="bg-white p-2 rounded-full shadow-xl hover:bg-gray-100  transition-colors transform">
                    <FontAwesomeIcon
                      onClick={() => handleAddToWishlist(product.id)}
                      icon={faHeart}
                      className="text-gray-700 text-lg hover:text-red-500 transition-colors transform duration-300 ease-in-out"
                    />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-xl hover:bg-gray-100 transition-colors transform duration-300 ease-in-out">
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      className="text-gray-700 text-lg"
                    />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-xl hover:bg-gray-100 transition-colors transform duration-300 ease-in-out">
                    <Link href={`/products/${product.id}`}>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-gray-700 text-lg"
                      />
                    </Link>
                  </button>
                </div>
                {/* Product Image */}
                <Link href={`/products/${product.id}`} className="block ">
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      height={400}
                      width={400}
                      className="object-contain mx-auto"
                    />
                  </div>
                </Link>
                {/* Product Info */}
                <div className="p-4">
                  {/* Category */}
                  <p className="text-xs text-gray-500 mb-1">
                    {product.category.name}
                  </p>

                  {/* Title */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mb-2">
                    {renderStars(
                      product.ratingsAverage,
                      product.ratingsQuantity,
                    )}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.priceAfterDiscount ? (
                        <div className="flex gap-3 items-center">
                          <span className="text-sm font-bold text-primary-600">
                            {product.priceAfterDiscount} EGP
                          </span>
                          <span
                            className="text-xs text-gray-500"
                            style={{ textDecoration: "line-through" }}
                          >
                            {product.price} EGP
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-primary-600">
                          {product.price} EGP
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-primary-600 hover:bg-primary-700 p-2 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
