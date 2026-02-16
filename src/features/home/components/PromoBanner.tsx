import {
  faHeadset,
  faRotateLeft,
  faShieldHalved,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Free Shipping */}
          <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shrink-0">
              <FontAwesomeIcon icon={faTruckFast} className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>

          {/* Card 2: Secure Payment */}
          <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full shrink-0">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% secure transactions</p>
            </div>
          </div>

          {/* Card 3: Easy Returns */}
          <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full shrink-0">
              <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-500">14-day return policy</p>
            </div>
          </div>

          {/* Card 4: 24/7 Support */}
          <div className="flex items-center gap-4 bg-gray-50/50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full shrink-0">
              <FontAwesomeIcon icon={faHeadset} className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-500">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
