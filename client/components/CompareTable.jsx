import {
  Star,
  Award,
  IndianRupee,
  TrendingUp,
  LandPlot,
  UsersRound,
  BookOpenCheck,
  NotebookPen,
  Crown,
} from "lucide-react";
import {
  getBestRating,
  getMinFees,
  getHighestPlacementRate,
  getHighestAvgPackage,
  getHighestPackage,
  getLargestCampusArea,
  getHighestTotalStudents,
  getBestRatingCollege,
  getMinFeesCollege,
  getHighestPlacementCollege,
  getHighestAvgPackageCollege,
  getHighestPackageCollege,
  getLargestCampusCollege,
  getHighestTotalStudentsCollege,
} from "../utils/compareHelper.js";


const CompareTable = ({ colleges }) => {
  // Calculate best values for each feature
  const bestRating = getBestRating(colleges);
  const bestRatingCollege = getBestRatingCollege(colleges);
  const minFees = getMinFees(colleges);
  const minFeesCollege = getMinFeesCollege(colleges);
  const highestPlacement = getHighestPlacementRate(colleges);
  const highestPlacementCollege = getHighestPlacementCollege(colleges);
  const highestAvgPackage = getHighestAvgPackage(colleges);
  const highestAvgPackageCollege = getHighestAvgPackageCollege(colleges);
  const highestPackage = getHighestPackage(colleges);
  const highestPackageCollege = getHighestPackageCollege(colleges);
  const largestCampus = getLargestCampusArea(colleges);
  const largestCampusCollege = getLargestCampusCollege(colleges);
  const highestStudents = getHighestTotalStudents(colleges);
  const highestStudentsCollege = getHighestTotalStudentsCollege(colleges);

  const getColorScheme = (index) => {
    const scheme = index % 3;
    switch (scheme) {
      case 0:
        return {
          columnBg: "bg-orange-100",
          headerBg: "bg-orange-100",
          border: "border-orange-200",
          badgeBg: "bg-orange-500",
        };
      case 1:
        return {
          columnBg: "bg-blue-100",
          headerBg: "bg-blue-100",
          border: "border-blue-200",
          badgeBg: "bg-blue-500",
        };
      default:
        return {
          columnBg: "bg-green-100",
          headerBg: "bg-green-100",
          border: "border-green-200",
          badgeBg: "bg-green-500",
        };
      }
  };

  const getAbbr = (name) => {
    return name
      .split(" ")
      .filter((word) => word[0] === word[0]?.toUpperCase())
      .map((word) => word[0])
      .join("");
  };

  const getFullName = (name) => {
    return name?.replace(/\s*-\s*[A-Z0-9]+\s*$/, "").trim() || name;
  };

  // Check if a college is the best in a specific metric
  const isBestRating = (college) => college.id === bestRatingCollege?.id && bestRating > 0;
  const isMinFees = (college) => college.id === minFeesCollege?.id && minFees !== null;
  const isHighestPlacement = (college) => college.id === highestPlacementCollege?.id && highestPlacement > 0;
  const isHighestAvgPackage = (college) => college.id === highestAvgPackageCollege?.id && highestAvgPackage > 0;
  const isHighestPackage = (college) => college.id === highestPackageCollege?.id && highestPackage > 0;
  const isLargestCampus = (college) => college.id === largestCampusCollege?.id && largestCampus > 0;
  const isHighestStudents = (college) => college.id === highestStudentsCollege?.id && highestStudents > 0;

  // Get best badge component
  const BestBadge = ({ metric, className = "" }) => (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500 text-white text-xs font-semibold ${className}`}>
      <Crown className="w-3 h-3" />
      <span>Best {metric}</span>
    </div>
  );

  const rows = [
    {
      key: "rating",
      label: "Rating",
      icon: <Star className="w-4 h-4 text-amber-500" />,
      getBestCollege: () => bestRatingCollege,
      isBest: (college) => isBestRating(college),
      bestLabel: "Rating",
      render: (c, idx) => {
        const scheme = getColorScheme(idx);
        const isBest = isBestRating(c);
        return (
          <div className="relative">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className={`font-semibold text-sm ${isBest ? 'text-amber-700 font-bold' : 'text-gray-800'}`}>
                {c.rating || "—"}
              </span>
              {c.rating && <span className="text-gray-400 text-xs">/5</span>}
            </div>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Rating" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "feesMin",
      label: "Fees (Min - Max)",
      icon: <IndianRupee className="w-4 h-4 text-emerald-600" />,
      getBestCollege: () => minFeesCollege,
      isBest: (college) => isMinFees(college),
      bestLabel: "Value",
      render: (c, idx) => {
        const isBest = isMinFees(c);
        return (
          <div className="relative">
            <span className={`font-semibold text-sm ${isBest ? 'text-emerald-700 font-bold' : 'text-gray-800'}`}>
              ~ {c.feesMin ? `₹${(c.feesMin / 100000).toFixed(1)}L` : "—"} -{" "}
              {c.feesMax ? `₹${(c.feesMax / 100000).toFixed(1)}L` : "—"}
            </span>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Value" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "placement",
      label: "Placement Rate",
      icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
      getBestCollege: () => highestPlacementCollege,
      isBest: (college) => isHighestPlacement(college),
      bestLabel: "Placement",
      render: (c, idx) => {
        const isBest = isHighestPlacement(c);
        return (
          <div className="relative">
            <div className="flex flex-col items-center gap-1">
              <span className={`font-semibold text-sm ${isBest ? 'text-blue-700 font-bold' : 'text-gray-800'}`}>
                {c.placementPercentage ? `${c.placementPercentage}%` : "—"}
              </span>
            </div>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Placement" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "avgPackage",
      label: "Avg Package",
      icon: <Award className="w-4 h-4 text-amber-500" />,
      getBestCollege: () => highestAvgPackageCollege,
      isBest: (college) => isHighestAvgPackage(college),
      bestLabel: "Package",
      render: (c, idx) => {
        const isBest = isHighestAvgPackage(c);
        return (
          <div className="relative">
            <span className={`font-semibold text-sm ${isBest ? 'text-amber-700 font-bold' : 'text-gray-800'}`}>
              {c.averagePackage ? `₹${c.averagePackage.toLocaleString()}L` : "—"}
            </span>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Avg Package" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "highestPackage",
      label: "Highest Package",
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
      getBestCollege: () => highestPackageCollege,
      isBest: (college) => isHighestPackage(college),
      bestLabel: "Highest",
      render: (c, idx) => {
        const isBest = isHighestPackage(c);
        return (
          <div className="relative">
            <span className={`font-semibold text-sm ${isBest ? 'text-green-700 font-bold' : 'text-gray-800'}`}>
              {c.highestPackage ? `₹${c.highestPackage.toLocaleString()}L` : "—"}
            </span>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Highest Package" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "campusArea",
      label: "Campus Area",
      icon: <LandPlot className="w-4 h-4 text-amber-600" />,
      getBestCollege: () => largestCampusCollege,
      isBest: (college) => isLargestCampus(college),
      bestLabel: "Campus",
      render: (c, idx) => {
        const isBest = isLargestCampus(c);
        return (
          <div className="relative">
            <span className={`text-sm ${isBest ? 'text-amber-700 font-bold' : 'text-gray-700'}`}>
              {c.campusArea ? `${c.campusArea} Acres` : "—"}
            </span>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Largest Campus" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "totalStudents",
      label: "Total Students",
      icon: <UsersRound className="w-4 h-4 text-red-500" />,
      getBestCollege: () => highestStudentsCollege,
      isBest: (college) => isHighestStudents(college),
      bestLabel: "Strength",
      render: (c, idx) => {
        const isBest = isHighestStudents(c);
        return (
          <div className="relative">
            <span className={`text-sm ${isBest ? 'text-red-700 font-bold' : 'text-gray-700'}`}>
              {c.totalStudents?.toLocaleString() || "—"}
            </span>
            {isBest && (
              <div className="mt-1">
                <BestBadge metric="Largest" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "courses",
      label: "Courses Offered",
      icon: <NotebookPen className="w-4 h-4 text-green-800" />,
      render: (c) =>
        c.courses?.length > 0 ? (
          <div className="flex flex-wrap gap-1 justify-center">
            {c.courses.map((course, idx) => (
              <span
                key={course.id || `course-${c.id}-${idx}`}
                className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-600 text-white font-medium"
              >
                {course.name}
              </span>
            ))}
          </div>
        ) : (
          "—"
        ),
    },
    {
      key: "exams",
      label: "Accepted Exams",
      icon: <BookOpenCheck className="w-4 h-4 text-indigo-500" />,
      render: (c) =>
        c.exams?.length > 0 ? (
          <div className="flex flex-wrap gap-1 justify-center">
            {c.exams.map((exam, i) => (
              <span
                key={i}
                className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-600 text-white font-medium"
              >
                {exam === "JEE Advanced" ? "JEE Adv." : exam}
              </span>
            ))}
          </div>
        ) : (
          "—"
        ),
    },
  ];

  // Add crown icon to header of best colleges
  const getBestInOverall = () => {
    // Count how many "best" categories each college wins
    const bestCounts = {};
    colleges.forEach(college => {
      let count = 0;
      if (isBestRating(college)) count++;
      if (isMinFees(college)) count++;
      if (isHighestPlacement(college)) count++;
      if (isHighestAvgPackage(college)) count++;
      if (isHighestPackage(college)) count++;
      if (isLargestCampus(college)) count++;
      if (isHighestStudents(college)) count++;
      bestCounts[college.id] = count;
    });
    
    const maxCount = Math.max(...Object.values(bestCounts));
    if (maxCount === 0) return null;
    
    const bestCollegeId = Object.keys(bestCounts).find(id => bestCounts[id] === maxCount);
    return colleges.find(c => c.id === parseInt(bestCollegeId));
  };
  
  const bestOverallCollege = getBestInOverall();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="border-collapse"
          style={{
            minWidth: `${160 + colleges.length * 150}px`,
            width: "100%",
          }}
        >
          <thead>
            <tr>

              <th
                className="sticky left-0 z-20 bg-gray-50 border-b border-r border-gray-200 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                style={{ minWidth: "148px", width: "148px" }}
              >
                Feature
              </th>

              {colleges.map((c, idx) => {
                const scheme = getColorScheme(idx);
                const abbr = getAbbr(c.name);
                const fullName = getFullName(c.name);
                const isOverallBest = bestOverallCollege?.id === c.id;

                return (
                  <th
                    key={c.id}
                    className={`px-3 py-3 text-center border-b border-gray-200 ${scheme.headerBg} relative`}
                    style={{ minWidth: "150px" }}
                  >
                    {isOverallBest && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        </div>
                      </div>
                    )}
                    {abbr ? (
                      <div className="flex flex-col items-center gap-1">

                        <span className="block sm:hidden text-[15px] font-extrabold text-gray-900 tracking-tight leading-none">
                          {abbr}
                        </span>


                        <span className="hidden sm:block text-[12px] md:text-lg font-bold text-gray-800 leading-snug text-center line-clamp-2">
                          {fullName}
                          {isOverallBest && (
                            <Crown className="inline-block w-4 h-4 ml-1 text-yellow-500" />
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[15px] md:text-[15px] font-bold text-gray-800 leading-snug line-clamp-2 block text-center">
                        {c.name}
                        {isOverallBest && (
                          <Crown className="inline-block w-4 h-4 ml-1 text-yellow-500" />
                        )}
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={row.key}
                className={`border-b border-gray-100 transition-colors hover:brightness-95 ${
                  rowIdx === rows.length - 1 ? "border-b-0" : ""
                }`}
              >

                <td
                  className="sticky left-0 z-10 bg-gray-50 border-r border-gray-200 px-4 py-3"
                  style={{ minWidth: "148px", width: "148px" }}
                >
                  <div className="flex items-center gap-2">
                    {row.icon && (
                      <span className="flex-shrink-0">{row.icon}</span>
                    )}
                    <span className="text-xs font-semibold text-gray-700 leading-tight">
                      {row.label}
                    </span>
                  </div>
                </td>


                {colleges.map((c, idx) => {
                  const scheme = getColorScheme(idx);
                  return (
                    <td
                      key={c.id}
                      className={`px-4 py-3 text-center ${scheme.columnBg}`}
                    >
                      {row.render(c, idx)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareTable;