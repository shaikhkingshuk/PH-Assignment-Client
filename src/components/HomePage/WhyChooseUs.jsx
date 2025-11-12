import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-base-300 mb-6">
            Why Choose <span className="text-blue-700">Our Real Estate</span>
          </h2>
          <p className="text-accent text-lg leading-relaxed mb-8">
            We help you find your dream home with transparency, trust, and
            technology. Our expert agents, verified listings, and personalized
            support make property buying or renting simple and stress-free.
            Whether you're investing or moving in, we guide you every step of
            the way.
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1504682018535-8ba8ca0afbbb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
            alt="Modern house"
            className="w-full max-w-md rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
