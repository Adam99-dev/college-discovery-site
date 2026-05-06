/* Determines the college with the best rating */
export const getBestRatingCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((best, current) => {
    const bestRating = best?.rating || 0;
    const currentRating = current?.rating || 0;
    return currentRating > bestRating ? current : best;
  }, null);
};

/* Gets the highest rating value */
export const getBestRating = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.rating || 0));
};

/* Determines the college with minimum fees */
export const getMinFeesCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((min, current) => {
    const minFees = min?.feesMin || Infinity;
    const currentFees = current?.feesMin || Infinity;
    return currentFees < minFees ? current : min;
  }, null);
};

/* Gets the minimum fees value */
export const getMinFees = (colleges) => {
  if (!colleges?.length) return null;
  const minFees = Math.min(...colleges.map(c => c.feesMin || Infinity));
  return minFees === Infinity ? null : minFees;
};

/* Determines the college with highest placement rate */
export const getHighestPlacementCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((best, current) => {
    const bestRate = best?.placementPercentage || 0;
    const currentRate = current?.placementPercentage || 0;
    return currentRate > bestRate ? current : best;
  }, null);
};

/* Gets the highest placement rate value */
export const getHighestPlacementRate = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.placementPercentage || 0));
};

/* Determines the college with highest average package */
export const getHighestAvgPackageCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((best, current) => {
    const bestPackage = best?.averagePackage || 0;
    const currentPackage = current?.averagePackage || 0;
    return currentPackage > bestPackage ? current : best;
  }, null);
};

/* Gets the highest average package value */
export const getHighestAvgPackage = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.averagePackage || 0));
};

/* Determines the college with highest package */
export const getHighestPackageCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((best, current) => {
    const bestPackage = best?.highestPackage || 0;
    const currentPackage = current?.highestPackage || 0;
    return currentPackage > bestPackage ? current : best;
  }, null);
};

/* Gets the highest package value  */
export const getHighestPackage = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.highestPackage || 0));
};

/* Determines the college with largest campus area */
export const getLargestCampusCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((largest, current) => {
    const largestArea = largest?.campusArea || 0;
    const currentArea = current?.campusArea || 0;
    return currentArea > largestArea ? current : largest;
  }, null);
};

/* Gets the largest campus area value */
export const getLargestCampusArea = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.campusArea || 0));
};

/* Determines the college with highest total students */
export const getHighestTotalStudentsCollege = (colleges) => {
  if (!colleges?.length) return null;
  return colleges.reduce((highest, current) => {
    const highestStudents = highest?.totalStudents || 0;
    const currentStudents = current?.totalStudents || 0;
    return currentStudents > highestStudents ? current : highest;
  }, null);
};

/* Gets the highest total students value */
export const getHighestTotalStudents = (colleges) => {
  if (!colleges?.length) return null;
  return Math.max(...colleges.map(c => c.totalStudents || 0));
};

/* Checks if a college is the best in a specific category */
export const isBestInMetric = (college, colleges, metric, isHighest = true) => {
  if (!college || !colleges?.length) return false;
  
  if (isHighest) {
    const bestValue = Math.max(...colleges.map(c => c[metric] || 0));
    return college[metric] === bestValue && bestValue > 0;
  } else {
    const bestValue = Math.min(...colleges.map(c => c[metric] || Infinity));
    return college[metric] === bestValue && bestValue !== Infinity;
  }
};

/* Gets all best colleges information */
export const getAllBestMetrics = (colleges) => {
  if (!colleges?.length) return null;
  
  return {
    bestRating: {
      college: getBestRatingCollege(colleges),
      value: getBestRating(colleges)
    },
    minFees: {
      college: getMinFeesCollege(colleges),
      value: getMinFees(colleges)
    },
    highestPlacement: {
      college: getHighestPlacementCollege(colleges),
      value: getHighestPlacementRate(colleges)
    },
    highestAvgPackage: {
      college: getHighestAvgPackageCollege(colleges),
      value: getHighestAvgPackage(colleges)
    },
    highestPackage: {
      college: getHighestPackageCollege(colleges),
      value: getHighestPackage(colleges)
    },
    largestCampus: {
      college: getLargestCampusCollege(colleges),
      value: getLargestCampusArea(colleges)
    },
    highestTotalStudents: {
      college: getHighestTotalStudentsCollege(colleges),
      value: getHighestTotalStudents(colleges)
    }
  };
};