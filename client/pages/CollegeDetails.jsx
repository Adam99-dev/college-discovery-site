import React, { useEffect, useState } from "react";
import {
  MapPin,
  Users,
  Star,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  School,
  Ruler,
  Calendar,
  Briefcase,
  Trophy,
  BookOpen,
  CheckCircle,
  Mail,
  Phone,
  Share,
  Download,
  Check,
} from "lucide-react";

import { useParams, Link } from "react-router-dom";
import CollegeCard from "../components/CollegeCard.jsx";
import CollegeDetailsSkeleton from "../skeletons/CollageDetails.s.jsx";

const randomImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200",
];

const CollegeDetails = () => {
  const { slug } = useParams();
  const [text, setText] = useState("Share");
  const [college, setCollege] = useState(null);
  const [recommendedColleges, setRecommendedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        // SINGLE COLLEGE
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/colleges/${slug}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (data.success) {
          setCollege(data.college);
        } else {
          setError(data.message);
        }

        // RECOMMENDED COLLEGES
        const recommendedResponse = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/colleges?page=1&limit=3",
          {
            credentials: "include",
          },
        );

        const recommendedData = await recommendedResponse.json();

        if (recommendedData.success) {
          const filtered = recommendedData.colleges.filter(
            (item) => item.id !== Number(),
          );

          setRecommendedColleges(filtered);
        }

        const reviewsResponse = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/reviews/${slug}`,
          {
            credentials: "include",
          },
        );

        const reviewsData = await reviewsResponse.json();

        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
        }
      } catch (err) {
        console.error("Error fetching college:", err);
        setError("Failed to load college details.");
      } finally {
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  const formatNumber = (value, isLakhs = false) => {
    if (!value && value !== 0) return "NA";
    if (isLakhs) return value.toLocaleString("en-IN");
    return value.toLocaleString("en-IN");
  };

  if (loading) {
    return <CollegeDetailsSkeleton />;
  }

  if (error || !college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-red-500 text-2xl font-semibold mb-2">
            {error || "College not found"}
          </h1>
          <Link
            to="/"
            className="text-orange-600 hover:underline mt-4 inline-block"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const shareCollege = () => {
    navigator.clipboard.writeText(window.location.href);
    setText("Copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={shareCollege}
                className="text-orange-600 border-orange-200 inline-flex items-center gap-2 bg-orange-200 px-2 py-1 hover:bg-orange-100 rounded-xl transition-colors"
              >
                {text === "Share" ? <Share size={20} /> : <Check size={20} />}{" "}
                {text}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  {college.ranking && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Trophy size={14} /> Rank #{college.ranking}
                    </span>
                  )}
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    Est. {college.establishedYear || "N/A"}
                  </span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-3">
                  {college.name}
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400" />
                    <span>{college.rating} / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {randomImages.slice(1, 5).map((img, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <img
                  src={img}
                  alt="college gallery"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "courses", "placements", "admissions", "reviews"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold capitalize transition-colors relative ${
                    activeTab === tab
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "overview" && (
              <>
                {/* KEY STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-xl">
                        <Star className="text-yellow-500" size={24} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {college.rating || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-xl">
                        <TrendingUp className="text-green-600" size={24} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {college.placementPercentage || "N/A"}%
                        </p>
                        <p className="text-sm text-gray-500">Placement Rate</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-xl">
                        <Briefcase className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          ₹{college.averagePackage || "N/A"}L
                        </p>
                        <p className="text-sm text-gray-500">Avg Package</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-xl">
                        <Trophy className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          #{college.ranking || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">National Rank</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="text-orange-600" />
                    About the College
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {college.description || "No description available."}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">
                    Infrastructure & Facilities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {college.campusArea && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Ruler className="text-orange-600" size={20} />
                            <span className="font-medium">Campus Area</span>
                          </div>
                          <span className="font-semibold">
                            {college.campusArea} acres
                          </span>
                        </div>
                      )}
                      {college.totalStudents && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Users className="text-orange-600" size={20} />
                            <span className="font-medium">Total Students</span>
                          </div>
                          <span className="font-semibold">
                            {college.totalStudents.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {college.facultyCount && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <School className="text-orange-600" size={20} />
                            <span className="font-medium">Faculty Count</span>
                          </div>
                          <span className="font-semibold">
                            {college.facultyCount}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Calendar className="text-orange-600" size={20} />
                          <span className="font-medium">Established</span>
                        </div>
                        <span className="font-semibold">
                          {college.establishedYear || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <DollarSign className="text-orange-600" size={20} />
                          <span className="font-medium">
                            Annual Fees (in Lakhs)
                          </span>
                        </div>
                        <span className="font-semibold">
                          ₹{formatNumber(college.feesMin / 100000)} - ₹
                          {formatNumber(college.feesMax / 100000)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {college.exams && college.exams.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4">Exams Accepted</h2>
                    <div className="flex flex-wrap gap-3">
                      {college.exams.map((exam, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl font-medium"
                        >
                          {exam}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "courses" && college.courses && (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                      Courses Offered
                    </h2>
                    <p className="text-gray-500 mt-1">
                      Choose your path to success
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid gap-6">
                  {college.courses.map((course, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600 rounded-l-2xl"></div>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                              {course.name}
                            </h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {course.duration}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-orange-50 rounded-lg">
                                <svg
                                  className="w-4 h-4 text-orange-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Duration
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {course.duration}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-orange-50 rounded-lg">
                                <svg
                                  className="w-4 h-4 text-orange-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Total Fees
                                </p>
                                <p className="font-semibold text-gray-800">
                                  ₹{course.fees?.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-orange-50 rounded-lg">
                                <svg
                                  className="w-4 h-4 text-orange-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Available Seats
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {course.seats}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Apply Now →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "placements" && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">
                  Placement Statistics
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <p className="text-gray-600 mb-1">Placement Percentage</p>
                      <p className="text-3xl font-bold text-green-600">
                        {college.placementPercentage || "N/A"}%
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-indigo-50 rounded-xl">
                      <p className="text-gray-600 mb-1">Average Package</p>
                      <p className="text-3xl font-bold text-orange-600">
                        ₹{college.averagePackage || "N/A"} LPA
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl">
                      <p className="text-gray-600 mb-1">Highest Package</p>
                      <p className="text-3xl font-bold text-orange-600">
                        ₹{college.highestPackage || "N/A"} LPA
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <p className="text-gray-600 mb-1">Top Recruiters</p>
                      <p className="font-medium">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admissions" && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Admission Process</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Fill Application Form
                      </h3>
                      <p className="text-gray-600">
                        Complete the online application form with your personal
                        and academic details.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Entrance Exam</h3>
                      <p className="text-gray-600">
                        Appear for the required entrance exams accepted by the
                        college.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Counseling & Selection
                      </h3>
                      <p className="text-gray-600">
                        Shortlisted candidates will be called for counseling
                        based on merit.
                      </p>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl mt-4">
                    <h3 className="font-semibold mb-2">Important Dates</h3>
                    <p className="text-gray-600">
                      Check official website for application deadlines and exam
                      dates.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

                {reviewsLoading ? (
                  <div className="text-center py-10 text-gray-500">
                    Loading reviews...
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-gray-100 rounded-2xl p-5 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {review.user.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-IN",
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Star
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />

                            <span className="font-semibold">
                              {review.rating}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No reviews available.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 top-24">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm">Annual Fees</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  ~ ₹{formatNumber(college.feesMin / 100000)} - ₹
                  {formatNumber(college.feesMax / 100000)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-bold">Lakhs</span> per year
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-2xl font-semibold transition-all transform hover:scale-[1.02]">
                  Apply Now
                </button>
                <button className="w-full py-4 border-2 border-gray-300 hover:border-orange-600 hover:bg-orange-50 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Brochure
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Course Duration</span>
                    <span className="font-semibold">4 Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mode of Study</span>
                    <span className="font-semibold">Full Time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Accreditation</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <CheckCircle size={14} /> A+ Grade
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Contact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span>+91 1234567890</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">admissions@college.edu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {recommendedColleges.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recommended Colleges</h2>
              <Link
                to="/colleges"
                className="text-orange-600 hover:underline font-extrabold"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDetails;
