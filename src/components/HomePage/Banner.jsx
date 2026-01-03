import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full h-[420px] rounded-xl overflow-hidden carousel-auto">
      {/* Slide 1 */}
      <div className="carousel-item w-full relative">
        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
          className="w-full object-cover"
          alt="Apartments"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="text-white max-w-xl px-10 space-y-4">
            <h1 className="text-4xl font-bold">Find Your Perfect Apartment</h1>
            <p>
              Buy or rent verified apartments with real photos and transparent
              pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="carousel-item w-full relative">
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
          className="w-full object-cover"
          alt="Land"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="text-white max-w-xl px-10 space-y-4">
            <h1 className="text-4xl font-bold">
              Buy & Sell Lands with Confidence
            </h1>
            <p>
              Explore residential and commercial lands with location and pricing
              details.
            </p>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="carousel-item w-full relative">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c"
          className="w-full object-cover"
          alt="Commercial"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="text-white max-w-xl px-10 space-y-4">
            <h1 className="text-4xl font-bold">
              Commercial Spaces for Business
            </h1>
            <p>Shops, offices, and commercial properties in prime locations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
