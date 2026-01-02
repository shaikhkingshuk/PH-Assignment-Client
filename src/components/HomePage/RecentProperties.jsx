import React, { useEffect, useState } from "react";
import RecentProperty from "./RecentProperty";

const RecentProperties = ({ data }) => {
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await data;
        setRecentData(result);
      } catch (err) {
        console.error("Error fetching recent properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        Loading recent properties...
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
