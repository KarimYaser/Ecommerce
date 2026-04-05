"use client";
import {
  faBabyCarriage,
  faBars,
  faBolt,
  faBoxOpen,
  faCartShopping,
  faChevronDown,
  faEllipsis,
  faMagnifyingGlass,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSuitcaseMedical,
  faUser,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/freshcart-logo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { AppState, useAppSelector } from "@/store/store";
import UseLogout from "@/features/auth/hooks/useLogout";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const cart = useAppSelector((state) => state.cart);
  const wishlist = useAppSelector((state) => state.wishlist);
  const orders = useAppSelector((state) => state.orders);
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  // console.log(isAuthenticated);

  const { logout } = UseLogout();
  const pathname = usePathname();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <>
      <header>
        <div className="container ">
          {/* top navbar */}
          <div className="hidden lg:flex justify-between py-2 items-center text-gray-700 text-sm border-gray-300/50 border-b">
            <ul className="flex gap-5 items-center *:flex *:gap-1 *:items-center">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:123456789">123-456-789</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="mt-1" />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>
            <ul className="flex gap-5 items-center">
              <li>
                <Link href="/orders">Track Order</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <select name="" id="">
                  <option value="EGP">EGP</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                </select>
              </li>
            </ul>
          </div>
          {/* main navigation */}
          <nav className=" flex justify-between items-center py-4">
            <h1>
              <Link href="/">
                <Image src={logo} alt="Logo" width={150} height={50} />
              </Link>
            </h1>
            <div className="search relative hidden lg:block">
              <input
                type="text"
                placeholder="Search for products..."
                className="form-control pr-10"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
            <ul className="hidden lg:flex gap-6 items-center ">
              <li>
                <Link
                  href="/orders"
                  className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/orders" ? "text-primary-500" : ""}`}
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
                    <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {orders.count}
                    </span>
                  </div>
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/wishlist" ? "text-primary-500" : ""}`}
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlist.count}
                    </span>
                  </div>
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/cart" ? "text-primary-500" : ""}`}
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-xl"
                    />
                    <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.numOfCartItems}
                    </span>
                  </div>
                  <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/profile" ? "text-primary-500" : ""}`}
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                  <span>Account</span>
                </Link>
              </li>
              {isAuthenticated ? (
                <li onClick={logout}>
                  <Link
                    href="/login"
                    className="flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="text-xl"
                    />
                    <span>Logout</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signup"
                      className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/signup" ? "text-primary-500" : ""}`}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                      <span>Signup</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className={`flex flex-col items-center gap-2 hover:text-primary-500 transition-colors duration-200 ${pathname === "/login" ? "text-primary-500" : ""}`}
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="text-xl"
                      />
                      <span>Login</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <button onClick={toggleMenu} className="lg:hidden">
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                className="btn bg-primary-600 block lg:hidden text-white cursor-pointer"
              />
            </button>
          </nav>
        </div>
        {/* category navigation */}
        <div className=" bg-gray-100 py-4">
          <nav className="hidden lg:block container">
            <div className=" flex items-center gap-10 ">
              <div className="relative group">
                <button className="btn text-white flex gap-3 items-center bg-primary-600 hover:bg-primary-700 transition-colors ">
                  <FontAwesomeIcon icon={faBars} />
                  <span>All Categories</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>

                <menu className="absolute z-20 top-10 min-w-60 d-none hidden group-hover:block bg-white shadow *:py-3 *:px-3 rounded-lg *:hover:bg-gray-100 *:transition-colors divide-y-2 divide-gray-300/50 ">
                  {/* Dropdown menu items can be added here */}
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faPerson}
                        className="text-primary-600 text-xl"
                      />
                      <span>Men's Fashion</span>{" "}
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faPersonDress}
                        className="text-primary-600 text-xl"
                      />
                      <span>Women's Fashion</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faBabyCarriage}
                        className="text-primary-600 text-xl"
                      />
                      <span>Baby & Toys</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faSuitcaseMedical}
                        className="text-primary-600 text-xl"
                      />
                      <span>Beauty & Health</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faBolt}
                        className="text-primary-600 text-xl"
                      />
                      <span>Electronics</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/"} className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="text-primary-600 text-xl"
                      />
                      <span>View All Categories</span>
                    </Link>
                  </li>
                </menu>
              </div>
              <ul className="flex flex-wrap items-center gap-6">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>
                  <Link href={"/"}>Recently Added</Link>
                </li>
                <li>
                  <Link href={"/"}>Featured Products</Link>
                </li>
                <li>
                  <Link href={"/"}>Offers</Link>
                </li>
                <li>
                  <Link href={"/"}>Brands</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* Off canvas */}
        {menuOpen && (
          <>
            <div
              onClick={toggleMenu}
              className="background fixed inset-0 bg-black/50 z-30"
            ></div>
            <div className="offcanvas animate-slide-in  space-y-7 fixed top-0 left-0 w-80 h-full bg-white z-40 p-6">
              <div onClick={toggleMenu}
              className="flex justify-between items-center mb-6">
                <Link href="/" className="">
                  <Image src={logo} alt="Logo" width={150} height={50} />
                </Link>
                <button className="btn rounded-full" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="form-control pr-10 w-full"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              <div className="border-t-2 border-gray-300/50 pt-5">
                <h2 className="text-xl font-bold">Main Menu</h2>
                <ul className="flex-col mt-4 gap-2 items-center *:py-3 *:px-2 *:hover:not-first:bg-gray-100 space-y-4 transition-colors *:rounded-lg duration-200">
                  <li className={pathname === "/wishlist" ? "bg-primary-200/50" : ""}>
                    <Link
                      href="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 transition-colors duration-200 ${pathname === "/wishlist" ? "text-primary-500" : ""}`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faHeart} className="text-xl" />
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {wishlist.count}
                        </span>
                      </div>
                      <span>Wishlist</span>
                    </Link>
                  </li>
                  <li className={pathname === "/orders" ? "bg-primary-200/50" : ""}>
                    <Link
                      href="/orders"
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 transition-colors duration-200 ${pathname === "/orders" ? "text-primary-500" : ""}`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-xl" />
                        <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {orders.count}
                        </span>
                      </div>
                      <span>My Orders</span>
                    </Link>
                  </li>
                  <li className={pathname === "/cart" ? "bg-primary-200/50" : ""}>
                    <Link
                      href="/cart"
                      onClick={() => setMenuOpen(false)}
                      className={`space-x-2 flex items-center gap-2 transition-colors duration-200 ${pathname === "/cart" ? "text-primary-500" : ""}`}
                    >
                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          className="text-xl"
                        />
                        <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                          {cart.numOfCartItems}
                        </span>
                      </div>
                      <span>Cart</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-gray-300/50 pt-5">
                <h2 className="text-xl font-bold">Account</h2>
                <ul className="flex-col mt-4 gap-2 items-center *:py-3 *:px-2 *:hover:bg-gray-100 space-y-4 transition-colors *:rounded-lg duration-200">
                  {isAuthenticated ? (
                    <>
                      <li className={pathname === "/profile" ? "bg-primary-200/50" : ""}>
                        <Link
                          href="/profile"
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2 transition-colors duration-200 ${pathname === "/profile" ? "text-primary-500" : ""}`}
                        >
                          <FontAwesomeIcon icon={faUser} className="text-xl" />
                          <span>Account</span>
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                      >
                        <Link
                          href="/login"
                          className="flex  items-center gap-2 hover:text-primary-500 transition-colors duration-200"
                        >
                          <FontAwesomeIcon
                            icon={faRightFromBracket}
                            className="text-xl"
                          />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className={pathname === "/login" ? "bg-primary-200/50" : ""}>
                        <Link
                          href="/login"
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2 transition-colors duration-200 ${pathname === "/login" ? "text-primary-500" : ""}`}
                        >
                          <FontAwesomeIcon
                            icon={faAddressCard}
                            className="text-xl"
                          />
                          <span>Login</span>
                        </Link>
                      </li>
                      <li className={pathname === "/signup" ? "bg-primary-200/50" : ""}>
                        <Link
                          href="/signup"
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2 transition-colors duration-200 ${pathname === "/signup" ? "text-primary-500" : ""}`}
                        >
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            className="text-xl"
                          />
                          <span>Signup</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
