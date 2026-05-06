

const CollegeListPopup = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="p-4 border border-gray-100 rounded-2xl animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
            <div className="w-[120px] h-10 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeListPopup;
