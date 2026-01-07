import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const RatingsList = () => {
  const { user, theme } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("reviews:", reviews, Array.isArray(reviews));

  useEffect(() => {
    if (!user?.email) return;

    const loadRatings = async () => {
      try {
        const res = await fetch(
          `https://homenest-server.onrender.com/myProductsRatings/${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
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

        if (res.status === 403) {
          toast.error("You are not allowed to access this data");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };

    loadRatings();
  }, [user]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Ratings on <span className="text-blue-700">My Properties</span>
      </h1>

      {reviews.length === 0 ? (
        <p className="text-center text-lg opacity-70">
          No reviews received yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className={`rounded-xl shadow-lg p-5 border ${
                theme === "light"
                  ? "bg-white/40 border-2 border-gray-600/20"
                  : "bg-zinc-800/40 border-2 border-zinc-700"
              }`}
            >
              {/* Property Image */}
              <img
                src={review.property_image}
                alt={review.property_name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* Property Name */}
              <h2 className="text-xl font-semibold mb-1">
                {review.property_name}
              </h2>

              {/* Reviewer Name */}
              <p className="text-sm opacity-70 mb-1">
                Reviewed by:{" "}
                <span className="font-medium">{review.reviewer_name}</span>
              </p>

              {/* Star Ratings */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm mb-3">{review.review_text}</p>

              {/* Review Date */}
              <p className="text-xs opacity-60">
                {new Date(review.review_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingsList;
