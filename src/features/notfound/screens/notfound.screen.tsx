"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSadTear } from "@fortawesome/free-solid-svg-icons";

export default function NotFoundScreen() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8">
          <FontAwesomeIcon
            icon={faSadTear}
            className="text-9xl text-green-600 opacity-80"
          />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 transform hover:-translate-y-1"
        >
          <FontAwesomeIcon icon={faHome} />
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
