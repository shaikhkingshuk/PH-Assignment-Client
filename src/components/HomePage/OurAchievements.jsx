import React from "react";

const OurAchievements = () => {
  return (
    <div className="w-full bg-base-200 rounded-2xl py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-base-300 mb-4">
          Our <span className="text-blue-700">Achievements</span>
        </h2>
        <p className="text-accent mb-12 text-lg">
          We take pride in our milestones and the trust our clients place in us.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="bg-gray-50 hover:scale-105 hover:bg-[#e7e5e4] p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-5xl font-bold text-blue-700 mb-2">04+</h3>
            <p className="text-gray-700 text-lg font-medium">
              Years of Experience
            </p>
          </div>

          <div className="bg-gray-50 hover:scale-105 hover:bg-[#e7e5e4] p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-5xl font-bold text-blue-700 mb-2">500+</h3>
            <p className="text-gray-700 text-lg font-medium">Happy Clients</p>
          </div>

          <div className="bg-gray-50 hover:scale-105 hover:bg-[#e7e5e4] p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-5xl font-bold text-blue-700 mb-2">200+</h3>
            <p className="text-gray-700 text-lg font-medium">Properties Sold</p>
          </div>

          <div className="bg-gray-50 hover:scale-105 hover:bg-[#e7e5e4] p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-5xl font-bold text-blue-700 mb-2">100%</h3>
            <p className="text-gray-700 text-lg font-medium">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchievements;
