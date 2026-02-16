import {
  faTruck,
  faShieldAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import loginHeroImg from "../../../../assets/images/2e5810ff3e-e750761ebcd4ae5907db.png";

export default function LoginHero() {
  return (
    <div className="py-12 px-4 flex flex-col justify-center items-center gap-3">
      {/* Shopping Cart Image */}
      {/* cart image */}
      <Image
        className="object-contain w-xl h-xl"
        src={loginHeroImg}
        alt="Login"
        width={200}
        height={200}
      />

      {/* Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h1>
        <p className="text-gray-600">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
      </div>

      {/* Features */}
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTruck} className="text-green-600 text-lg" />
          <span className="text-gray-700 font-medium">Free Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="text-green-600 text-lg"
          />
          <span className="text-gray-700 font-medium">Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faHeadset}
            className="text-green-600 text-lg"
          />
          <span className="text-gray-700 font-medium">24/7 Support</span>
        </div>
      </div>
    </div>
  );
}
