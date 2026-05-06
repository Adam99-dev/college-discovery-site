import React from "react";

const CollegesPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <div className="w-64 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-80 h-5 bg-gray-200 rounded mt-2 animate-pulse"></div>
          </div>
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>


        <div className="mb-6 hidden"></div>


        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-12 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
            >

              <div className="aspect-video bg-gray-200"></div>
              

              <div className="p-5 space-y-4">

                <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                
                {/* Location */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                </div>
                

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="w-20 h-5 bg-gray-200 rounded"></div>
                </div>
                

                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <div>
                    <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="flex justify-center items-center gap-4 mt-10">
          <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CollegesPageSkeleton;