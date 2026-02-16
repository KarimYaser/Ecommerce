import { faStar, faTruck, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar from "../../../../assets/images/review-author.png";
import Image from "next/image";

export default function signupHero() {
  return (
    <div className="py-12 px-4 ">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-primary-500">FreshCart</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Join thousands of happy customers who enjoy fresh groceries delivered
          right to their doorstep.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1  gap-8 mb-12">
        {/* Premium Quality */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
              <FontAwesomeIcon
                icon={faStar}
                className="text-primary-600 text-xl"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Premium quality products sourced from trusted suppliers.
            </p>
          </div>
        </div>

        {/* Fast Delivery */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-primary-600 text-xl"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Same-day delivery available in most areas
            </p>
          </div>
        </div>

        {/* Secure Shopping */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
              <FontAwesomeIcon
                icon={faShield}
                className="text-primary-600 text-xl"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Secure Shopping
            </h3>
            <p className="text-gray-600">
              Your data and payments are completely secure
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white shadow p-8 rounded-lg">
        <div className="flex items-start gap-4">
          <Image
            src={avatar}
            alt="Sarah Johnson"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              Sarah Johnson
            </h3>
            <div className="flex gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className="text-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-3 italic">
          "FreshCart has transformed my shopping experience. The quality of the
          products is outstanding, and the delivery is always on time. Highly
          recommend!"
        </p>
      </div>
    </div>
  );
}
