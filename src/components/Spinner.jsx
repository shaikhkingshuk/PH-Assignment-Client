import React from "react";

const Spinner = ({ size = "w-12 h-12", color = "border-blue-600" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`border-4 ${color} border-t-transparent rounded-full animate-spin ${size}`}
      ></div>
    </div>
  );
};

export default Spinner;
