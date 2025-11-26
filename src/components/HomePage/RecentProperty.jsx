import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const RecentProperty = ({ val }) => {
  const { theme } = useContext(AuthContext);
  //   console.log(val);
  return (
    <div
      className={`relative group ${
        theme === "light" ? " bg-zinc-900/10" : "bg-white/50"
      } rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="relative">
        <img
          src={val.image}
          alt={val.property_name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-md">
          <span className="font-black">৳</span> {val.price.toLocaleString()}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-black group-hover:text-blue-700 transition-colors duration-300">
          {val.property_name}
        </h2>

        <p className="capitalize text-sm font-medium text-gray-800 mt-1">
          {val.category}
        </p>

        <p className="text-slate-800 text-sm mt-2 truncate">
          {val.description.length > 90
            ? val.description.slice(0, 90) + "..."
            : val.description}
        </p>

        <div className="flex items-center justify-between mt-4 mb-5 text-sm">
          <span className="text-stone-700 flex items-center gap-1">
            📍 <span className="capitalize">{val.location}</span>
          </span>

          <span className="text-xs text-gray-800 italic">
            Posted: {new Date(val.posted_date).toLocaleDateString()}
          </span>
        </div>

        {/* 🔘 View Details Button */}
        <Link
          to={`/property/${val._id}`}
          className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecentProperty;
