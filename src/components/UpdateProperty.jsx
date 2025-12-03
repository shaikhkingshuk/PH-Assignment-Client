import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";

const UpdateProperty = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { user, theme } = useContext(AuthContext);
  console.log(propertyId);

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  const [formData, setFormData] = useState({
    property_name: "",
    description: "",
    category: "",
    price: "",
    location: "",
    image: "",
  });
  console.log(property);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const res = await fetch(`http://localhost:3000/property/${propertyId}`);
        const data = await res.json();

        setProperty(data);

        setFormData({
          property_name: data.property_name,
          description: data.description,
          category: data.category,
          price: data.price,
          location: data.location,
          image: data.image,
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    loadProperty();
  }, [propertyId]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/updateProperty/${propertyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (result.updatedProperty) {
        alert("Property updated successfully!");
        navigate(`/property/${propertyId}`); // Redirect to details page
      }
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div
      className={`min-h-screen flex justify-center items-start py-12 px-6 
      ${theme === "light" ? "bg-white/40" : "bg-black/40"}
    `}
    >
      <form
        onSubmit={handleUpdate}
        className={`w-full max-w-2xl p-8 rounded-2xl shadow-xl border-4
        ${
          theme === "light"
            ? "bg-blue-200/30 border-gray-400"
            : "bg-zinc-900/60 text-white"
        }
      `}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Property</h2>

        {/* Property Name */}
        <div className="mb-4">
          <label className="font-medium">Property Name</label>
          <input
            name="property_name"
            value={formData.property_name}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mt-1"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Image Link */}
        <div className="mb-4">
          <label className="font-medium">Image Link</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        {/* Read-only User Name */}
        <div className="mb-4">
          <label className="font-medium">User Name (Read Only)</label>
          <input
            value={user.displayName}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-200 text-black cursor-not-allowed"
          />
        </div>

        {/* Read-only Email */}
        <div className="mb-4">
          <label className="font-medium">User Email (Read Only)</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-200 text-black cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
