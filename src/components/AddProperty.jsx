import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AddProperty = () => {
  const { user, theme } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    property_name: "",
    description: "",
    category: "",
    price: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProperty = {
      ...formData,
      user_name: user.displayName,
      user_email: user.email,
      posted_date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3000/addNewProperty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProperty),
      });

      const data = await res.json();

      if (data.insertedId) {
        alert("Property added successfully!");
        setFormData({
          property_name: "",
          description: "",
          category: "",
          price: "",
          location: "",
          image: "",
        });
      }
    } catch (err) {
      alert("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div
      className={`mt-20 w-full max-w-3xl mx-auto p-8 rounded-2xl shadow-xl
        ${
          theme === "light"
            ? "bg-black/50 text-black font-semibold"
            : "bg-zinc-700/50 text-white font-semibold border-2 border-amber-50/30"
        }`}
    >
      <h2 className="text-2xl font-bold mb-6">Add Property</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="property_name"
          value={formData.property_name}
          onChange={handleChange}
          placeholder="Property Name"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full bg-gray-200 text-black"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-200 text-black"
        />
        <button
          type="submit"
          className={`btn mt-4 ${
            theme === "light"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
