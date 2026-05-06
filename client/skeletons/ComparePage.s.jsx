import {
  Sparkles, ChartNoAxesCombined, ArrowLeft
} from "lucide-react";

// --- Skeleton Components ---

const SkeletonBar = () => (
  <div className="mt-1 h-1 w-full max-w-[120px] rounded-full bg-gray-200 animate-pulse overflow-hidden">
    <div className="h-full w-3/4 rounded-full bg-gray-300" />
  </div>
);

const SkeletonText = ({ width = "w-full", className = "" }) => (
  <div className={`h-3 rounded-md bg-gray-200 animate-pulse ${width} ${className}`} />
);

const SkeletonCircle = ({ size = 8 }) => (
  <div className={`rounded-full bg-gray-200 animate-pulse`} style={{ width: size, height: size }} />
);

const SkeletonIcon = ({ size = 16 }) => (
  <div className={`rounded-lg bg-gray-200 animate-pulse`} style={{ width: size, height: size }} />
);

const SkeletonButton = ({ className = "" }) => (
  <div className={`h-8 w-20 rounded-lg bg-gray-200 animate-pulse ${className}`} />
);

// Card Skeleton
const CollegeCardSkeleton = ({ colorClass = "bg-gray-50", borderClass = "border-gray-200", stripClass = "bg-gray-300" }) => (
  <div className={`rounded-xl border ${borderClass} overflow-hidden shadow-lg ${colorClass}`}>
    {/* Image area */}
    <div className="relative h-32 sm:h-40 w-full bg-gray-300 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Ranking badge skeleton */}
      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
        <SkeletonCircle size={10} />
        <SkeletonText width="w-8" className="h-2" />
      </div>
    </div>

    {/* Info area */}
    <div className="p-4 space-y-2">
      <SkeletonText width="w-3/4" className="h-5" />
      <div className="flex items-center gap-1.5">
        <SkeletonIcon size={12} />
        <SkeletonText width="w-1/2" className="h-3" />
      </div>
      <div className="flex items-center gap-1.5">
        <SkeletonIcon size={12} />
        <SkeletonText width="w-1/3" className="h-3" />
      </div>
    </div>

    {/* Color strip */}
    <div className={`h-1 ${stripClass}`} />
  </div>
);

// Table Row Skeleton
const TableRowSkeleton = ({ n = 2 }) => {
  return (
    <div className="border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 border-b border-gray-200/80">
        <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
        <SkeletonText width="w-24" className="h-4" />
      </div>

      {/* Cells */}
      <div className={`grid pb-4 px-2 gap-4 grid-cols-${n}`}>
        {Array.from({ length: n }).map((_, ci) => (
          <div key={ci} className={`px-3 py-2 ${ci < n - 1 ? "border-r border-gray-200/60" : ""}`}>
            <SkeletonText width="w-20" className="h-6 mb-1" />
            <SkeletonBar />
            <div className="mt-2 flex justify-center">
              <div className="w-12 h-5 rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Verdict Item Skeleton
const VerdictItemSkeleton = () => (
  <div className="bg-white rounded-lg px-3 py-3 border border-gray-100 shadow-sm">
    <div className="flex items-center gap-1.5 mb-2">
      <div className="w-3 h-3 rounded bg-gray-200 animate-pulse" />
      <SkeletonText width="w-16" className="h-2" />
    </div>
    <SkeletonText width="w-20" className="h-3" />
  </div>
);

// Overall Winner Skeleton
const OverallWinnerSkeleton = () => (
  <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-white/80 border border-gray-200 shadow-sm">
    <div className="w-12 h-12 rounded-xl bg-gray-300 animate-pulse flex-shrink-0" />
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded bg-gray-200 animate-pulse" />
        <SkeletonText width="w-24" className="h-2" />
      </div>
      <SkeletonText width="w-32" className="h-4" />
    </div>
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
      <div className="w-3.5 h-3.5 rounded bg-gray-200 animate-pulse" />
      <SkeletonText width="w-8" className="h-4" />
    </div>
  </div>
);


const ComparePageSkeleton = () => {
  const skeletonCount = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* TOP BAR Skeleton */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-gray-200 animate-pulse">
              <ArrowLeft size={18} className="text-transparent" />
            </div>
            <div className="min-w-0 flex items-center gap-2">
              <ChartNoAxesCombined size={18} className="text-transparent" />
              <SkeletonText width="w-32" className="h-5" />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SkeletonButton className="w-24" />
            <SkeletonButton className="w-20 bg-red-100" />
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className={`grid gap-4 grid-cols-1 ${skeletonCount >= 2 ? "sm:grid-cols-2" : ""} ${skeletonCount >= 3 ? "lg:grid-cols-3" : ""}`}>
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <CollegeCardSkeleton
              key={idx}
              colorClass="bg-gray-50"
              borderClass="border-gray-200"
              stripClass="bg-gray-300"
            />
          ))}
        </div>


        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Render 4-5 skeleton rows */}
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRowSkeleton key={idx} n={skeletonCount} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 sm:p-6 bg-gray-50 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-gray-200 animate-pulse">
              <Sparkles size={16} className="text-transparent" />
            </div>
            <SkeletonText width="w-28" className="h-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <VerdictItemSkeleton key={i} />
            ))}
          </div>

          <OverallWinnerSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ComparePageSkeleton;