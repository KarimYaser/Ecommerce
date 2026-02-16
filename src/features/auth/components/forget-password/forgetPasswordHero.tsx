import { faEnvelope, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ForgetPasswordHero() {
  return (
    <>
      <div className="py-12 px-4 flex flex-col justify-center items-center gap-6">
          {/* Illustration */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="bg-green-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background circles */}
              <div className="absolute top-4 left-6 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute bottom-8 right-4 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute top-1/2 right-8 w-10 h-10 bg-green-100 rounded-full opacity-40"></div>

              {/* Icons */}
              <div className="flex items-center justify-center gap-6 py-12 relative z-10">
                <div className="bg-white rounded-xl p-4 shadow-md transform -rotate-6 hover:rotate-0 transition-transform">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-500 text-2xl"
                  />
                </div>
                <div className="bg-green-500 rounded-xl p-5 shadow-lg transform scale-110">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-white text-3xl"
                  />
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md transform rotate-6 hover:rotate-0 transition-transform">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-green-500 text-2xl"
                  />
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-300 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Reset Your Password
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Don&apos;t worry, it happens to the best of us. We&apos;ll help
              you get back into your account in no time.
            </p>
          </div>

          {/* Features Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-green-600 text-sm"
              />
              <span className="text-gray-700 font-medium text-sm">
                Email Verification
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-green-600 text-sm"
              />
              <span className="text-gray-700 font-medium text-sm">
                Secure Reset
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLock}
                className="text-green-600 text-sm"
              />
              <span className="text-gray-700 font-medium text-sm">
                Encrypted
              </span>
            </div>
          </div>
        </div>
    </>
  )
}
