import React from "react";
import { Link } from "react-router-dom";

export default function CollegeDataPlatform() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 md:px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Compare Colleges Amongst India
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We simplify information for you on over{" "}
            <span className="font-semibold text-gray-800">40,250 Colleges</span>
            <span className="font-semibold text-gray-800">
              3,51,875 Courses
            </span>{" "}
            across domains and regions all over India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Side - Content */}
          <div className="lg:col-span-5 space-y-10">
            {/* Rankings Section */}
            <div className="bg-transparent rounded-3xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl">
                  🏆
                </div>
                <h2 className="text-3xl font-semibold text-gray-800">
                  Rankings
                </h2>
              </div>

              <p className="text-gray-600 mb-8 text-[15px] leading-relaxed">
                1500 Colleges Ranked based on transparent, accurate,
                government-approved, student-friendly data
              </p>

              <div className="flex flex-wrap gap-3">
                {["Top Engineering Colleges in India"].map((item, index) => (
                  <Link
                    key={index}
                    to="/colleges"
                    className="inline-block px-6 py-3.5 bg-white border border-gray-200 hover:border-orange-400 hover:bg-orange-50 rounded-2xl text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-md active:scale-95"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Illustration Area */}
          <div className="hidden lg:block lg:col-span-7 flex items-center justify-center relative min-h-[620px]">
            <div className="relative w-full max-w-[560px]">
              {/* Main Illustration Container */}
              <div className="rounded-[2.75rem] overflow-hidden h-[580px] relative">
                {/* Placeholder for your actual image/illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <img
                      className=""
                      src="./college.avif"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
