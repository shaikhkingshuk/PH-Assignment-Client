import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const MyProperties = () => {
  const { user, theme } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const borderColor = theme === "light" ? "border-gray-700" : "border-zinc-300";
  useEffect(() => {
    fetch(`http://localhost:3000/myProperties/${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.log(err));
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/properties/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      if (data.deletedCount > 0) {
        setProperties(properties.filter((p) => p._id !== id));
        alert("Deleted!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Properties ({properties.length})
      </h1>

      <div className="w-full overflow-x-auto border-2 border-gray-400 rounded-lg">
        <table
          className={`w-full border-2  text-left min-w-[800px] rounded-lg overflow-hidden  ${
            theme === "light" ? "bg-white/50" : "bg-zinc-900/80"
          }`}
        >
          <thead>
            <tr
              className={`${theme === "light" ? "bg-gray-400" : "bg-gray-800"}`}
            >
              <th className={`p-3 border-2 ${borderColor} `}>Property Name</th>
              <th className={`p-3 border-2 ${borderColor} `}>Category</th>
              <th className={`p-3 border-2 ${borderColor} `}>Price</th>
              <th className={`p-3 border-2 ${borderColor} `}>Location</th>
              <th className={`p-3 border-2 ${borderColor} `}>Posted Date</th>
              <th className={`p-3 border-2 ${borderColor} `}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr
                key={p._id}
                className={`${
                  theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-800"
                }  transition`}
              >
                <td className="p-3 border border-gray-400">
                  {p.property_name}
                </td>
                <td className="p-3 border border-gray-400 capitalize">
                  {p.category}
                </td>
                <td className="p-3 border border-gray-400">${p.price}</td>
                <td className="p-3 border border-gray-400">{p.location}</td>
                <td className="p-3 border border-gray-400">
                  {new Date(p.posted_date).toLocaleDateString()}
                </td>

                <td className="p-3 border">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/property/${p._id}`}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                      View
                    </Link>

                    <Link
                      to={`/updateProperty/${p._id}`}
                      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProperties;
