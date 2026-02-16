"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLeaf,
  faTruck,
  faTag,
  faArrowRight,
  faStar,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Newsletter Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-6 h-6 text-white"
                />
              </div>
              <div>
                <p className="text-primary-600 font-semibold text-sm tracking-wide uppercase">
                  Newsletter
                </p>
                <p className="text-gray-500 text-sm">50,000+ subscribers</p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get the Freshest Updates{" "}
              <span className="text-primary-500">Delivered Free</span>
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 mb-8">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-primary-50 px-4 py-2.5 rounded-full border border-primary-100">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="w-3.5 h-3.5 text-primary-600"
                  />
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  Fresh Picks Weekly
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary-50 px-4 py-2.5 rounded-full border border-primary-100">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="w-3.5 h-3.5 text-primary-600"
                  />
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  Free Delivery Codes
                </span>
              </div>
              <div className="flex items-center gap-2 bg-primary-50 px-4 py-2.5 rounded-full border border-primary-100">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="w-3.5 h-3.5 text-primary-600"
                  />
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  Members-Only Deals
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-gray-700 placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5"
              >
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
              </button>
            </form>

            {/* Privacy Note */}
            <p className="text-gray-500 text-sm mt-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* Mobile App Section */}
          <div className="bg-gray-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950" />

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 px-4 py-1.5 rounded-full mb-6">
                <FontAwesomeIcon
                  icon={faMobileScreen}
                  className="w-4 h-4 text-primary-400"
                />
                <span className="text-primary-400 text-sm font-semibold uppercase tracking-wide">
                  Mobile App
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Shop Faster on Our App
              </h2>

              {/* Subtitle */}
              <p className="text-gray-400 mb-8">
                Get app-exclusive deals & 15% off your first order.
              </p>

              {/* Download Buttons */}
              <div className="space-y-3 mb-8">
                {/* App Store Button */}
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-5 py-3.5 flex items-center gap-4 transition-all duration-200 group">
                  <FontAwesomeIcon
                    className="text-2xl text-white"
                    icon={faApple}
                  />
                  <div className="text-left">
                    <p className="text-gray-400 text-xs uppercase tracking-wide">
                      Download on
                    </p>
                    <p className="text-white font-semibold text-lg leading-tight">
                      App Store
                    </p>
                  </div>
                </button>

                {/* Google Play Button */}
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-5 py-3.5 flex items-center gap-4 transition-all duration-200 group">
                  <FontAwesomeIcon
                    className="text-2xl text-white"
                    icon={faGooglePlay}
                  />
                  <div className="text-left">
                    <p className="text-gray-400 text-xs uppercase tracking-wide">
                      Get it on
                    </p>
                    <p className="text-white font-semibold text-lg leading-tight">
                      Google Play
                    </p>
                  </div>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-semibold">4.9</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-400 text-sm">100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
