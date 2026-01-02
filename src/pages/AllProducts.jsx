import React, { useEffect, useState } from "react";
import RecentProperty from "../components/HomePage/RecentProperty";

const AllProducts = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/allProperties");
        const data = await response.json();
        setAllProperties(data);
      } catch (err) {
        console.error("Error fetching all properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  //  Search and sort operation

  let updatedProperties =
    searchString.trim() === ""
      ? [...allProperties]
      : allProperties.filter((property) =>
          property.property_name
            ?.toLowerCase()
            .includes(searchString.toLowerCase())
        );

  if (sortPrice === "low") {
    updatedProperties.sort((a, b) => a.price - b.price);
  }

  if (sortPrice === "high") {
    updatedProperties.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-500">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-base-300 mb-6">
        All <span className="text-blue-700">Properties</span>
      </h2>

      {/* Search and sort functionality */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by property title..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by Price</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6">
        {updatedProperties.length > 0 ? (
          updatedProperties.map((property) => (
            <RecentProperty key={property._id} val={property} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No properties found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
