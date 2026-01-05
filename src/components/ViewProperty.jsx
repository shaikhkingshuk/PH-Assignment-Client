import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const ViewProperty = () => {
  const { user, theme } = useContext(AuthContext);
  const { propertyId } = useParams();

  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const [loadingProperty, setLoadingProperty] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch property details
  useEffect(() => {
    const fetchData = async () => {
      setLoadingProperty(true);
      try {
        const res = await fetch(
          `http://localhost:3000/property/${propertyId}`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        );

        if (res.status === 401) {
          toast.error("Please login to continue");
          return;
        }
        if (res.status === 404) {
          toast.error("Property not found");
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching property:", err);
        toast.error("Failed to fetch property");
      } finally {
        setLoadingProperty(false);
      }
    };
    fetchData();
  }, [propertyId, user.accessToken]);

  // Fetch reviews
  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetch(
        `http://localhost:3000/property/reveiw/${propertyId}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );

      if (res.status === 401) {
        toast.error("Please login to view reviews");
        return;
      }

      if (res.status === 404) {
        setReviews([]);
        return;
      }

      const json = await res.json();
      setReviews(json);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      toast.error("Error fetching reviews");
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!data) return;

    const reviewData = {
      reviewer_name: user?.displayName || "Anonymous",
      property_owner: data.user_email || "Unknown",
      property_image: data.image || "",
      property_name: data.property_name || "Untitled",
      property_Id: propertyId,
      rating: Number(rating),
      review_text: review,
      review_date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/property/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (res.status === 401) {
        toast.error("Please login to continue");
        return;
      }

      if (res.status === 404) {
        toast.error("Property not found");
        return;
      }

      const result = await res.json();
      console.log("Review submitted:", result);
      toast.success("Review added successfully!");

      setRating("");
      setReview("");
      fetchReviews(); // reload reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  if (loadingProperty) return <Spinner></Spinner>;

  if (!data)
    return <p className="text-center mt-10 text-lg">Property not found.</p>;

  return (
    <>
      {/* Property Details */}
      <div
        className={`max-w-6xl mt-10 mx-auto px-4 md:px-8 py-6 md:py-10 rounded-3xl shadow-xl ${
          theme === "light"
            ? "shadow-2xl shadow-zinc-400"
            : "shadow-2xl shadow-zinc-900 bg-zinc-900/60"
        }`}
      >
        <div
          className={`rounded-2xl overflow-hidden shadow-xl ${
            theme === "light" ? "bg-zinc-900/40" : "bg-zinc-900/60"
          }`}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
              <img
                src={data.image || "https://via.placeholder.com/400x300"}
                alt={data.property_name || "Property"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div
              className={`w-full lg:w-1/2 p-5 sm:p-7 lg:p-10 flex flex-col justify-between ${
                theme === "light" ? "bg-white/20" : "bg-zinc-950/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                    theme === "light" ? "text-zinc-900" : "text-white"
                  }`}
                >
                  {data.property_name || "Untitled"}
                </h1>
                <span className="self-start sm:self-auto bg-blue-700 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-md">
                  {data.category?.toUpperCase() || "N/A"}
                </span>
              </div>

              <p className="mt-4 text-2xl sm:text-3xl font-bold text-blue-600">
                ৳ {data.price?.toLocaleString() || "0"}
              </p>

              <p
                className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  theme === "light" ? "text-zinc-800" : "text-zinc-300"
                }`}
              >
                {data.description || "No description available."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                <div
                  className={`p-4 rounded-xl shadow-md ${
                    theme === "light" ? "bg-zinc-100/20" : "bg-zinc-700/50"
                  }`}
                >
                  <h3
                    className={`text-base font-semibold ${
                      theme === "light" ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    Location
                  </h3>
                  <p
                    className={`mt-1 capitalize text-sm ${
                      theme === "light" ? "text-zinc-700" : "text-zinc-300"
                    }`}
                  >
                    {data.location || "Unknown"}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl shadow-md ${
                    theme === "light" ? "bg-zinc-100/20" : "bg-zinc-700/50"
                  }`}
                >
                  <h3
                    className={`text-base font-semibold ${
                      theme === "light" ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    Posted Date
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      theme === "light" ? "text-zinc-700" : "text-zinc-300"
                    }`}
                  >
                    {data.posted_date
                      ? new Date(data.posted_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Owner */}
              <div
                className={`mt-8 flex items-center gap-4 p-4 rounded-xl shadow-md ${
                  theme === "light" ? "bg-zinc-100/20" : "bg-zinc-700/50"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  {data.user_name?.charAt(0) || "U"}
                </div>
                <div className="min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-semibold truncate ${
                      theme === "light" ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    {data.user_name || "Unknown"}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm truncate ${
                      theme === "light" ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  >
                    {data.user_email || "No email"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        className={`mt-14 p-6 md:p-10 rounded-2xl shadow-xl border ${
          theme === "light"
            ? "bg-zinc-400/60 border-zinc-900/20"
            : "bg-zinc-800/90 border-zinc-900/40"
        }`}
      >
        <h2
          className={`text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2 ${
            theme === "light" ? "text-zinc-900" : "text-white"
          }`}
        >
          ⭐ Ratings & Reviews
        </h2>

        {/* Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className={`flex flex-col gap-5 p-5 rounded-xl shadow-inner ${
            theme === "light" ? "bg-zinc-500/70" : "bg-zinc-900/90"
          }`}
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Rating (1–5):
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="5"
                required
                className={`w-full mt-1 px-4 py-2 rounded-lg outline-none border transition ${
                  theme === "light"
                    ? "bg-white text-zinc-900 border-zinc-300 focus:border-blue-600"
                    : "bg-zinc-950 text-white border-zinc-700 focus:border-blue-500"
                }`}
              />
            </div>
            <div>
              <label
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Your Review:
              </label>
              <textarea
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write something..."
                required
                className={`w-full mt-1 px-4 py-2 rounded-lg outline-none border resize-none transition ${
                  theme === "light"
                    ? "bg-white text-zinc-900 border-zinc-300 focus:border-blue-600"
                    : "bg-zinc-950 text-white border-zinc-700 focus:border-blue-500"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="self-start bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-md"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        <div className="flex flex-col gap-4 mt-10">
          {loadingReviews ? (
            <Spinner size="w-10 h-10" color="border-yellow-400" />
          ) : reviews.length === 0 ? (
            <p
              className={`text-center mt-5 animate-pulse ${
                theme === "light" ? "text-zinc-700" : "text-zinc-400"
              }`}
            >
              No reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className={`p-5 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  theme === "light" ? "bg-zinc-500/60" : "bg-zinc-900/90"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <h4
                      className={`text-lg sm:text-xl font-bold truncate ${
                        theme === "light" ? "text-zinc-900" : "text-white"
                      }`}
                    >
                      {review.reviewer_name || "Anonymous"}
                    </h4>
                    <p
                      className={`text-xs ${
                        theme === "light" ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {review.review_date
                        ? new Date(review.review_date).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-yellow-400 text-xl sm:text-2xl font-bold shrink-0">
                    {"★".repeat(review.rating || 0)}
                    {"☆".repeat(5 - (review.rating || 0))}
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed break-words ${
                    theme === "light" ? "text-zinc-800" : "text-zinc-300"
                  }`}
                >
                  {review.review_text || "No review text"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProperty;
