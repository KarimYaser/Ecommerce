import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import miniLogo from "../../assets/images/mini-logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t  border-gray-200 mt-12 text-gray-700 py-5 ">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 xl:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 xl:col-span-2">
            <div className="flex items-center mb-4">
              <Link href="/">
                <Image src={logo} alt="Logo" width={150} height={50} />
              </Link>
            </div>
            <p className="mb-4">
              FreshCart is a versatile e-commerce platform offering a wide range
              of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>
            <ul className="flex space-x-4 mb-4 *:hover:text-primary-600 *:text-xl">
              <li>
                <a href="#" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Pinterest">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-semibold mb-3 text-xl font-bold">Categories</h2>
            <ul className="space-y-2 *:hover:text-primary-600">
              <li>
                <Link href="#">Men's Fashion</Link>
              </li>
              <li>
                <Link href="#">Women's Fashion</Link>
              </li>
              <li>
                <Link href="#">Baby & Toys</Link>
              </li>
              <li>
                <Link href="#">Beauty & Health</Link>
              </li>
              <li>
                <Link href="#">Electronics</Link>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h2 className="font-semibold mb-3 text-xl font-bold">Quick Links</h2>
            <ul className="space-y-2 *:hover:text-primary-600">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/shipping-policy">Shipping Policy</Link>
              </li>
            </ul>
          </div>
          {/* Customer Service */}
          <div>
            <h2 className="font-semibold mb-3 text-xl font-bold">Customer Service</h2>
            <ul className="space-y-2 *:hover:text-primary-600">
              <li>
                <Link href="#">My Account</Link>
              </li>
              <li>
                <Link href="#">My Orders</Link>
              </li>
              <li>
                <Link href="#">Wishlist</Link>
              </li>
              <li>
                <Link href="#">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="#">Help Center</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="container flex justify-between items-center  text-center text-gray-500">
          <p className="text-lg">© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <Image src={miniLogo} alt="Logo" className="size-8" />
        </div>
        </div>
      </footer>
    </>
  );
}
