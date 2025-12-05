import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ViewProperty = () => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const { propertyId } = useParams();
  const [data, setData] = useState(null);
  // console.log(user);
  const { theme } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/property/reveiw/${propertyId}`
      );
      const json = await res.json();
      setReviews(json);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const reviewData = {
      reviewer_name: user?.displayName || "Anonymous",
      property_owner: data.user_email,
      property_image: data.image || "",
      property_name: data.property_name,
      property_Id: propertyId,

      rating: Number(rating),
      review_text: review,
      review_date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/property/addReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const result = await res.json();
      console.log("Review submitted:", result);
      alert("Review added successfully!");

      setRating("");
      setReview("");
      fetchReviews(); ///to reload the comments
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/property/${propertyId}`);
        const json = await res.json(); // convert to JSON
        setData(json);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };

    fetchData();
  }, [propertyId]);
  console.log(data);
  if (!data) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 md:p-10">
        <div className=" shadow-xl rounded-2xl overflow-hidden ">
          <div className="flex  flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-72 md:h-auto">
              <img
                src={data.image}
                alt={data.property_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className={`w-full md:w-1/2 p-6 md:p-10 border-y-2 border-zinc-500/20  ${
                theme === "light" ? "bg-white/5  " : "bg-zinc-950/80 "
              } flex flex-col justify-between `}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-base-content">
                  {data.property_name}
                </h1>

                <span className="bg-blue-700 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-md">
                  {data.category.toUpperCase()}
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-primary">
                ৳ {data.price.toLocaleString()}
              </p>

              <p className="mt-5 text-accent text-lg leading-relaxed">
                {data.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-base-200 shadow-md">
                  <h3 className="text-lg font-semibold text-base-content">
                    Location
                  </h3>
                  <p className="text-neutral mt-1 capitalize">
                    {data.location}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-base-200 shadow-md">
                  <h3 className="text-lg font-semibold text-base-content">
                    Posted Date
                  </h3>
                  <p className="text-neutral mt-1">
                    {new Date(data.posted_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4 p-4 bg-base-200 rounded-xl shadow-md">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {data.user_name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-base-content">
                    {data.user_name}
                  </h3>
                  <p className="text-neutral">{data.user_email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-14 bg-base-100 p-6 md:p-10 rounded-2xl border border-base-200 shadow-xl">
        <h2 className="text-3xl font-bold text-base-content mb-8 flex items-center gap-2">
          ⭐ Ratings & Reviews
        </h2>

        {/* REVIEW FORM */}
        <form
          className="flex flex-col gap-5 bg-base-200 p-5 rounded-xl shadow-inner"
          onSubmit={handleSubmitReview}
        >
          <div className="flex flex-col md:flex-col md:gap-5">
            <div className="flex-1">
              <label className="font-semibold text-base-content">
                Rating (1–5):
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="input input-bordered focus:outline-none  w-full mt-1 bg-base-100 text-base-content"
                placeholder="5"
                required
              />
            </div>

            <div className="flex-1">
              <label className="font-semibold text-base-content">
                Your Review:
              </label>
              <textarea
                className="textarea textarea-bordered focus:outline-none w-full mt-1 bg-base-100 text-base-content"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write something..."
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-102"
          >
            Submit Review
          </button>
        </form>

        {/* ALL REVIEWS LIST */}
        <div className="flex flex-col gap-4 mt-10">
          {reviews.length === 0 ? (
            <p className="text-neutral text-center mt-5 animate-pulse">
              No reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-200 p-6 rounded-xl shadow-lg  hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-base-content">
                      {review.reviewer_name}
                    </h4>
                    <p className="text-xs text-neutral">
                      {new Date(review.review_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="text-yellow-500 text-2xl font-bold tracking-tight">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                </div>

                <p className="text-neutral text-sm leading-relaxed break-words whitespace-normal">
                  {review.review_text}
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
