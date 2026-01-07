import React, { useEffect, useState } from "react";
import RecentProperty from "./RecentProperty";
import Spinner from "../Spinner";

const RecentProperties = () => {
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://homenest-server.onrender.com/recentProperties"
        );

        if (!res.ok) throw new Error("Failed to fetch recent properties");

        const data = await res.json();

        setRecentData(data);
      } catch (err) {
        console.error("Error fetching recent properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (recentData.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        No recent properties found
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-base-300 mb-6">
        Recent <span className="text-blue-700">Properties</span>
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {recentData.map((val) => (
          <RecentProperty key={val._id} val={val}></RecentProperty>
        ))}
      </div>
    </div>
  );
};

export default RecentProperties;
