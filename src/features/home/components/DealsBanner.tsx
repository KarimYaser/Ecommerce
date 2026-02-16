import { faArrowRight, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function DealsBanner() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deal of the Day - Green Card */}
          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -right-20 top-20 w-60 h-60 bg-white/10 rounded-full"></div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faTag} className="text-sm" />
                <span className="text-sm font-semibold">Deal of the Day</span>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold mb-2">Fresh Organic Fruits</h3>

              {/* Subtitle */}
              <p className="text-green-50 mb-6">
                Get up to 40% off on selected organic fruits
              </p>

              {/* Discount Code */}
              <div className="mb-6">
                <span className="text-4xl font-bold">40% OFF</span>
                <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded">
                  Use code: <span className="font-bold">ORGANIC40</span>
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>
          </div>

          {/* New Arrivals - Orange/Red Card */}
          <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -right-20 top-20 w-60 h-60 bg-white/10 rounded-full"></div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faTag} className="text-sm" />
                <span className="text-sm font-semibold">New Arrivals</span>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold mb-2">Exotic Vegetables</h3>

              {/* Subtitle */}
              <p className="text-orange-50 mb-6">
                Discover our latest collection of premium vegetables
              </p>

              {/* Discount Code */}
              <div className="mb-6">
                <span className="text-4xl font-bold">25% OFF</span>
                <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded">
                  Use code: <span className="font-bold">FRESH25</span>
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Now
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
