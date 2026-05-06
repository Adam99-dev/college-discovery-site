import React from "react";

const CollegeDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 animate-pulse">

      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-20 h-10 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid lg:grid-cols-5 gap-6 mb-12">

          <div className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-200">

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-24 h-7 bg-gray-300 rounded-full"></div>
                  <div className="w-20 h-7 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-3/4 h-10 bg-gray-300 rounded-lg mb-3"></div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-5 bg-gray-300 rounded"></div>
                  <div className="w-24 h-5 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden aspect-square bg-gray-200 shadow-md"
              ></div>
            ))}
          </div>
        </div>


        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "courses", "placements", "admissions", "reviews"].map((tab) => (
              <div key={tab} className="px-4 py-3">
                <div className="w-20 h-5 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                      <div className="w-12 h-7 bg-gray-200 rounded mb-1"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-40 h-7 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-11/12 h-4 bg-gray-200 rounded"></div>
                <div className="w-10/12 h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-9/12 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>


            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-56 h-7 bg-gray-200 rounded mb-6"></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-200 rounded"></div>
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-16 h-5 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-200 rounded"></div>
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-20 h-5 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-20 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="w-32 h-9 bg-gray-200 rounded mx-auto mt-2"></div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
                <div className="w-full h-12 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="w-32 h-5 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="block p-3 rounded-xl">
                    <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="w-56 h-8 bg-gray-200 rounded"></div>
            <div className="w-24 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  <div className="flex justify-between">
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailsSkeleton;