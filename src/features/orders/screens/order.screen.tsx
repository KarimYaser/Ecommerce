"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "../server/orders.actions";
import { Order } from "../types/orders.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faTruck,
  faCheckCircle,
  faMoneyBillWave,
  faCreditCard,
  faCalendarAlt,
  faMapMarkerAlt,
  faChevronDown,
  faChevronUp,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function OrderScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  function toggleOrder(orderId: string) {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        const sortedOrders = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to load orders");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-100 p-8 rounded-2xl inline-block mb-6">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-6xl text-gray-400"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t placed any orders yet.
        </p>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            Track and manage your {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/"
          className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition"
        >
          <span className="w-2 h-2 bg-green-600 rounded-full inline-block animate-pulse"></span>
          Continue Shopping
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const isExpanded = expandedOrders.has(order._id);

          return (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Summary Row */}
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-4">
                  {/* Product Image Stack */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-200">
                      {order.cartItems[0] && (
                        <Image
                          src={order.cartItems[0].product.imageCover}
                          alt={order.cartItems[0].product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    {order.cartItems.length > 1 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                        +{order.cartItems.length - 1}
                      </span>
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : order.isPaid
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={
                            order.isDelivered
                              ? faCheckCircle
                              : order.isPaid
                                ? faTruck
                                : faBoxOpen
                          }
                          className="text-[10px]"
                        />
                        {order.isDelivered
                          ? "Delivered"
                          : order.isPaid
                            ? "On the way"
                            : "Processing"}
                      </span>
                    </div>

                    {/* Order Number */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      # {order.id}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="text-gray-400 text-xs"
                        />
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faBoxOpen}
                          className="text-gray-400 text-xs"
                        />
                        {order.cartItems.length} item
                        {order.cartItems.length !== 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-gray-400 text-xs"
                        />
                        {order.shippingAddress.city}
                      </span>
                    </div>
                  </div>

                  {/* Payment Icon */}
                  <div className="hidden sm:flex shrink-0 bg-gray-50 p-2.5 rounded-lg">
                    <FontAwesomeIcon
                      icon={
                        order.paymentMethodType === "card"
                          ? faCreditCard
                          : faMoneyBillWave
                      }
                      className={
                        order.paymentMethodType === "card"
                          ? "text-purple-500 text-lg"
                          : "text-green-500 text-lg"
                      }
                    />
                  </div>
                </div>

                {/* Price + Toggle Row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">
                    {order.totalOrderPrice}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </span>

                  <button
                    onClick={() => toggleOrder(order._id)}
                    className={`${isExpanded? "bg-primary-500 hover:bg-primary-600 text-white":"bg-gray-100 hover:bg-gray-200 text-gray-700"}   px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer`}
                  >
                    {isExpanded ? "Hide" : "Details"}
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronUp : faChevronDown}
                      className="text-xs"
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Order Items */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {/* Section Header */}
                  <div className="px-5 md:px-6 pt-4 pb-2 flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCube}
                        className="text-green-600 text-[10px]"
                      />
                    </span>
                    <h4 className="text-sm font-semibold text-gray-700">
                      Order Items
                    </h4>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-gray-100">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="px-5 md:px-6 py-4 flex items-center gap-4"
                      >
                        {/* Product Image */}
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-50 overflow-hidden relative shrink-0 border border-gray-200">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-gray-900 truncate">
                            {item.product.title}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {item.count} &times; {item.price} EGP
                          </p>
                        </div>

                        {/* Item Total */}
                        <div className="text-right shrink-0">
                          <span className="text-lg font-bold text-gray-900">
                            {item.count * item.price}
                          </span>
                          <span className="text-xs text-gray-400 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary Footer */}
                  <div className="bg-gray-50 px-5 md:px-6 py-4 mt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                        <span>
                          Shipping:{" "}
                          <span className="font-medium text-gray-700">
                            {order.shippingPrice} EGP
                          </span>
                        </span>
                        <span>
                          Tax:{" "}
                          <span className="font-medium text-gray-700">
                            {order.taxPrice} EGP
                          </span>
                        </span>
                        <span>
                          Payment:{" "}
                          <span className="font-medium text-gray-700 capitalize">
                            {order.paymentMethodType}
                          </span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                          Total
                        </span>
                        <span className="block text-xl font-bold text-gray-900">
                          {order.totalOrderPrice} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
