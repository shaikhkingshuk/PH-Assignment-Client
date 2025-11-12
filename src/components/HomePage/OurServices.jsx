import React from "react";
import { PiBuildingApartment } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const OurServices = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-base-300 mb-4">
          Our <span className="text-blue-700">Services</span>
        </h2>
        <p className="text-accent mb-12 text-lg">
          We offer a full range of real estate services to make your journey
          easier.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-50 hover:bg-[#e5e5e5] hover:scale-105 p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center">
            <div className="flex justify-center mb-3 text-black">
              <PiBuildingApartment size={25} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Buy Property
            </h3>
            <p className="text-gray-600">
              Find verified listings and discover your dream home with ease.
            </p>
          </div>

          <div className="bg-gray-50 hover:bg-[#e5e5e5] hover:scale-105 p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center">
            <div className="flex justify-center mb-3 text-black">
              <BsCashCoin size={25} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sell Property
            </h3>
            <p className="text-gray-600">
              Get the best value for your property through expert marketing.
            </p>
          </div>

          <div className="bg-gray-50 hover:bg-[#e5e5e5] hover:scale-105 p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center">
            <div className="flex justify-center mb-3 text-black">
              <FaHome size={25} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Rent Property
            </h3>
            <p className="text-gray-600">
              Browse the best rental homes with flexible pricing and options.
            </p>
          </div>

          <div className="bg-gray-50 hover:bg-[#e5e5e5] hover:scale-105 p-8 rounded-2xl shadow-md hover:shadow-2xl transition text-center">
            <div className="flex justify-center mb-3 text-black">
              <BiSupport size={25} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Agent Support
            </h3>
            <p className="text-gray-600">
              Get personalized help from experienced real estate professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
