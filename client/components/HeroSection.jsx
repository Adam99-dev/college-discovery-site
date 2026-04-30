import React from "react";

const HeroPrediction = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Illustration */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-lg">
              {/* Main Illustration */}
              <div className="relative">
                <img
                  src="/hero.avif"
                  alt="College prediction illustration"
                  className="w-full h-auto drop-shadow-2xl hidden lg:block"
                />

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 text-4xl sm:text-5xl lg:text-6xl opacity-20 hidden sm:block">
                  ☁️
                </div>
                <div className="absolute -bottom-8 -right-8 text-4xl sm:text-5xl lg:text-5xl opacity-20 hidden sm:block">
                  🌟
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Predict Your{" "}
                <span className="text-orange-600 block sm:inline">
                  College Future
                </span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Get accurate college admission chances and rank predictions
                using years of historical data and advanced analytics.
              </p>
            </div>
            {/* Rank Predictors */}
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl">
                  📊
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Rank Predictors
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["JEE Main Rank Predictor"].map((rank, i) => (
                  <button
                    key={i}
                    className="group px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-md active:scale-98 sm:active:scale-100"
                  >
                    <span className="text-gray-700 group-hover:text-red-700 transition-colors">
                      {rank}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <button className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-orange-200 transition-all duration-300 hover:scale-105 active:scale-98 flex items-center justify-center gap-3">
                Start Free Prediction
                <span className="text-xl sm:text-2xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPrediction;
