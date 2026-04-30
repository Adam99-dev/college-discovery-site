import React, { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Users,
  Award,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react";

import { useParams } from "react-router-dom";
import CollegeCard from "../components/CollegeCard.jsx";

const randomImages = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200",
];

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    comment: "Amazing placements and campus life.",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    rating: 4,
    comment: "Faculty is supportive and infrastructure is good.",
  },
  {
    id: 3,
    name: "Vikram Singh",
    rating: 5,
    comment: "One of the best colleges for engineering.",
  },
];

const CollegeDetails = () => {
  const { id: collegeId } = useParams();

  const [college, setCollege] = useState(null);
  const [recommendedColleges, setRecommendedColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const heroImage =
    randomImages[Math.floor(Math.random() * randomImages.length)];

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        // SINGLE COLLEGE
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/colleges/${collegeId}`,
          {
            credentials: "include",
          }
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
          }
        );

        const recommendedData = await recommendedResponse.json();

        if (recommendedData.success) {
          const filtered = recommendedData.colleges.filter(
            (item) => item.id !== Number(collegeId)
          );

          setRecommendedColleges(filtered);
        }
      } catch (err) {
        console.error("Error fetching college:", err);

        setError("Failed to load college details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [collegeId]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500 text-2xl">
          {error || "College not found"}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <div className="sticky top-0 bg-white border-b z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HERO */}
        <div className="grid lg:grid-cols-5 gap-6 mb-10">

          {/* MAIN IMAGE */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video">

              <img
                src={heroImage}
                alt={college.name}
                className="w-full h-full object-cover"
              />

              {/* SAVE BUTTON */}
              <div className="absolute top-5 right-5">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all ${
                    isSaved
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-700"
                  }`}
                >
                </button>
              </div>

              {/* OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {college.name}
                </h1>

                <div className="flex items-center gap-2 text-white">
                  <MapPin size={18} />
                  <span>{college.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {randomImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden aspect-square shadow-md"
              >
                <img
                  src={img}
                  alt="college"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Star className="text-yellow-500" size={28} />

                  <div>
                    <p className="text-2xl font-bold">
                      {college.rating}
                    </p>

                    <p className="text-sm text-gray-500">
                      Rating
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Award className="text-green-600" size={28} />

                  <div>
                    <p className="text-2xl font-bold">
                      {college.placementPercentage}%
                    </p>

                    <p className="text-sm text-gray-500">
                      Placements
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" size={28} />

                  <div>
                    <p className="text-2xl font-bold">
                      2020
                    </p>

                    <p className="text-sm text-gray-500">
                      Established
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Users className="text-purple-600" size={28} />

                  <div>
                    <p className="text-lg font-semibold">
                      12k+
                    </p>

                    <p className="text-sm text-gray-500">
                      Students
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">
                About the College
              </h2>

              <p className="text-gray-700 leading-relaxed text-lg">
                {college.description || "No description available."}
              </p>
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Student Reviews
              </h2>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b last:border-none pb-5"
                  >
                    <div className="flex items-center justify-between mb-2">

                      <h3 className="font-semibold">
                        {review.name}
                      </h3>

                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <p className="text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-24">

              <div className="text-center mb-6">

                <p className="text-gray-500">
                  Annual Fees
                </p>

                <p className="text-4xl font-bold text-gray-900 mt-2">
                  ₹{college.fees?.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  per year
                </p>
              </div>

              <div className="space-y-4">

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-colors">
                  Apply Now
                </button>

                <button className="w-full py-4 border-2 border-gray-300 hover:border-gray-400 rounded-2xl font-semibold transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDED COLLEGES */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold mb-8">
            Recommended Colleges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;