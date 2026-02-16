"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import homeSlider from "@/assets/images/home-slider.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  return (
    <section className="relative">
      <Swiper
        // slidesPerView={1.1}
        slidesPerView={1}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-[400px] lg:h-[500px]"
      >
        {/* First slide */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src={homeSlider}
              alt="Fresh Products Delivered"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 flex flex-col justify-center px-8 lg:px-20 text-white space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold max-w-lg leading-tight">
                Fresh Products Delivered to your Door
              </h2>
              <p className="text-lg text-white">
                Get <span className="font-bold">20% off</span> your first order
              </p>
              <div className="flex gap-4 text-lg pt-4">
                <Link
                  href="/shop"
                  className="bg-white border-2 border-white/80 hover:scale-105 transition-transform transition-hover  text-primary-500 px-6 py-3 rounded-lg font-semibold"
                >
                  Shop Now
                </Link>
                <Link
                  href="/deals"
                  className="bg-transparent border-2 border-white/80 text-white-900 hover:scale-105 transition-transform transition-hover px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Second slide */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src={homeSlider}
              alt="Fresh Products Delivered"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 flex flex-col justify-center px-8 lg:px-20 text-white space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold max-w-lg leading-tight">
                Premium Quality Guaranteed
              </h2>
              <p className="text-xl text-white">
                Fresh from farm to your table
              </p>
              <div className="flex gap-4 text-lg pt-4">
                <Link
                  href="/shop"
                  className="bg-white border-2 border-white/80 hover:scale-105 transition-transform transition-hover  text-blue-600 px-6 py-3 rounded-lg font-semibold"
                >
                  Shop Now
                </Link>
                <Link
                  href="/deals"
                  className="bg-transparent border-2 border-white/80 text-white-900 hover:scale-105 transition-transform transition-hover px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* third slide */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src={homeSlider}
              alt="Fresh Products Delivered"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 flex flex-col justify-center px-8 lg:px-20 text-white space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold max-w-lg leading-tight">
                Fast & Free Delivery
              </h2>
              <p className="text-lg text-white">Same day delivery available</p>
              <div className="flex gap-4 text-lg pt-4">
                <Link
                  href="/shop"
                  className="bg-white border-2 border-white/80 hover:scale-105 transition-transform transition-hover  text-blue-600 px-6 py-3 rounded-lg font-semibold"
                >
                  Order Now
                </Link>
                <Link
                  href="/deals"
                  className="bg-transparent border-2 border-white/80 text-white-900 hover:scale-105 transition-transform transition-hover px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Delivery Info
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white/100 transition-colors rounded-full p-2">
        <FontAwesomeIcon icon={faChevronLeft} className="text-primary-500" />
      </button>
      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white/100 transition-colors rounded-full p-2">
        <FontAwesomeIcon icon={faChevronRight} className="text-primary-500" />
      </button>
    </section>
  );
}
