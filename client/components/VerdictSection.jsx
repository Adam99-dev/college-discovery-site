// VerdictSection.jsx
import React from "react";
import {
  Crown,
  Star,
  IndianRupee,
  TrendingUp,
  Award,
  LandPlot,
  UsersRound,
  Trophy,
  ThumbsUp,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import {
  getBestRatingCollege,
  getMinFeesCollege,
  getHighestPlacementCollege,
  getHighestAvgPackageCollege,
  getHighestPackageCollege,
  getLargestCampusCollege,
  getHighestTotalStudentsCollege,
  getBestRating,
  getMinFees,
  getHighestPlacementRate,
  getHighestAvgPackage,
  getHighestPackage,
  getLargestCampusArea,
  getHighestTotalStudents,
} from "../utils/compareHelper.js";

const VerdictSection = ({ colleges }) => {
  if (!colleges || colleges.length === 0) return null;

  // Calculate best colleges for each category
  const bestRatingCollege = getBestRatingCollege(colleges);
  const bestRating = getBestRating(colleges);

  const minFeesCollege = getMinFeesCollege(colleges);
  const minFees = getMinFees(colleges);

  const highestPlacementCollege = getHighestPlacementCollege(colleges);
  const highestPlacement = getHighestPlacementRate(colleges);

  const highestAvgPackageCollege = getHighestAvgPackageCollege(colleges);
  const highestAvgPackage = getHighestAvgPackage(colleges);

  const highestPackageCollege = getHighestPackageCollege(colleges);
  const highestPackage = getHighestPackage(colleges);

  const largestCampusCollege = getLargestCampusCollege(colleges);
  const largestCampus = getLargestCampusArea(colleges);

  const highestStudentsCollege = getHighestTotalStudentsCollege(colleges);
  const highestStudents = getHighestTotalStudents(colleges);

  // Count wins for each college to determine overall best
  const winCounts = {};
  colleges.forEach((college) => {
    let count = 0;
    let categories = [];

    if (bestRatingCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Rating",
        value: `${bestRating}/5`,
        icon: Star,
      });
    }
    if (minFeesCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Lowest Fees",
        value: `₹${(minFees / 100000).toFixed(1)}L`,
        icon: IndianRupee,
      });
    }
    if (highestPlacementCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Placement Rate",
        value: `${highestPlacement}%`,
        icon: TrendingUp,
      });
    }
    if (highestAvgPackageCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Avg. Package",
        value: `₹${highestAvgPackage.toLocaleString()}L`,
        icon: Award,
      });
    }
    if (highestPackageCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Highest Package",
        value: `₹${highestPackage.toLocaleString()}L`,
        icon: Trophy,
      });
    }
    if (largestCampusCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Campus Area",
        value: `${largestCampus} Acres`,
        icon: LandPlot,
      });
    }
    if (highestStudentsCollege?.id === college.id) {
      count++;
      categories.push({
        metric: "Student Strength",
        value: highestStudents?.toLocaleString(),
        icon: UsersRound,
      });
    }

    winCounts[college.id] = { count, categories, college };
  });

  // Find overall best college (most wins)
  let overallBest = null;
  let maxWins = -1;
  Object.values(winCounts).forEach(({ count, college }) => {
    if (count > maxWins) {
      maxWins = count;
      overallBest = college;
    }
  });

  const overallBestData = winCounts[overallBest?.id];

  // Generate personalized recommendations based on user priorities
  const getRecommendation = () => {
    const recommendations = [];

    if (highestAvgPackage > 15) {
      recommendations.push({
        title: "💰 High Salary Potential",
        description: `${highestAvgPackageCollege?.name} offers an impressive average package of ₹${highestAvgPackage.toLocaleString()}L, making it ideal for career-focused students.`,
        icon: Award,
      });
    }

    if (highestPlacement > 90) {
      recommendations.push({
        title: "🎯 Excellent Placement Record",
        description: `With ${highestPlacement}% placement rate, ${highestPlacementCollege?.name} ensures strong career opportunities for its graduates.`,
        icon: TrendingUp,
      });
    }

    if (minFees && minFees < 500000) {
      recommendations.push({
        title: "💸 Budget-Friendly Option",
        description: `${minFeesCollege?.name} offers quality education at just ₹${(minFees / 100000).toFixed(1)}L, providing great value for money.`,
        icon: IndianRupee,
      });
    }

    if (bestRating && bestRating >= 4.5) {
      recommendations.push({
        title: "⭐ Top-Rated Institute",
        description: `${bestRatingCollege?.name} boasts an outstanding ${bestRating}/5 rating, reflecting excellent academic standards and student satisfaction.`,
        icon: Star,
      });
    }

    if (largestCampus && largestCampus > 100) {
      recommendations.push({
        title: "🏛️ Expansive Campus",
        description: `${largestCampusCollege?.name} features a sprawling ${largestCampus}-acre campus with world-class infrastructure.`,
        icon: LandPlot,
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Overall Best College - Hero Section */}
      {overallBest && overallBestData && overallBestData.count > 0 && (
        <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-lg border border-yellow-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-yellow-500 rounded-full p-2 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Verdict</h3>
              <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Recommended
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                {overallBest.name}
              </h2>
              <p className="text-gray-600 text-lg">
                {overallBest.location && `${overallBest.location} • `}
                {overallBest.type || "Premier Institute"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {overallBestData.categories.slice(0, 4).map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {category.metric}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {category.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Why We Recommend This College
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {overallBest.name} stands out as the top choice, excelling in{" "}
                {overallBestData.count} key metrics including{" "}
                {overallBestData.categories.map((c, i) => (
                  <span key={i}>
                    {c.metric.toLowerCase()}
                    {i < overallBestData.categories.length - 2
                      ? ", "
                      : i === overallBestData.categories.length - 2
                        ? " and "
                        : ""}
                  </span>
                ))}
                . This makes it the most well-rounded option for students
                seeking quality education and excellent career prospects.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category-wise Best Colleges */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Category Leaders
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            See which college excels in each specific area
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            {
              title: "Highest Rated",
              college: bestRatingCollege,
              value: `${bestRating}/5`,
              icon: Star,
              color: "text-amber-500",
              bgColor: "bg-amber-50",
              description:
                "Based on academic excellence, faculty quality, and student satisfaction ratings.",
            },
            {
              title: "Most Affordable",
              college: minFeesCollege,
              value: `₹${(minFees / 100000).toFixed(1)}L`,
              icon: IndianRupee,
              color: "text-emerald-500",
              bgColor: "bg-emerald-50",
              description:
                "Lowest tuition fees while maintaining quality education standards.",
            },
            {
              title: "Best Placements",
              college: highestPlacementCollege,
              value: `${highestPlacement}%`,
              icon: TrendingUp,
              color: "text-blue-500",
              bgColor: "bg-blue-50",
              description:
                "Highest placement percentage ensuring strong career opportunities.",
            },
            {
              title: "Highest Average Package",
              college: highestAvgPackageCollege,
              value: `₹${highestAvgPackage.toLocaleString()}L`,
              icon: Award,
              color: "text-purple-500",
              bgColor: "bg-purple-50",
              description:
                "Top colleges offering the best return on investment.",
            },
            {
              title: "Highest Package Offered",
              college: highestPackageCollege,
              value: `₹${highestPackage.toLocaleString()}L`,
              icon: Trophy,
              color: "text-red-500",
              bgColor: "bg-red-50",
              description:
                "Record-breaking salary packages achieved by students.",
            },
            {
              title: "Largest Campus",
              college: largestCampusCollege,
              value: `${largestCampus} Acres`,
              icon: LandPlot,
              color: "text-green-500",
              bgColor: "bg-green-50",
              description:
                "Expansive campuses with world-class infrastructure and facilities.",
            },
          ]
            .map((item, idx) => {
              if (!item.college) return null;
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${item.bgColor} rounded-xl p-3 flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <div className="bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-lg font-bold text-gray-800">
                            {item.value}
                          </span>
                        </div>
                      </div>
                      <p className="font-medium text-gray-800 mb-1">
                        {item.college.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      {item.college.location && (
                        <p className="text-xs text-gray-400 mt-2">
                          {item.college.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
            .filter(Boolean)}
        </div>
      </div>
    </div>
  );
};

export default VerdictSection;
