import React, { useState, useEffect, useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    title: "Find Your Perfect Apartment",
    description:
      "Buy or rent verified apartments with real photos and transparent pricing.",
  },
  {
    url: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    title: "Buy & Sell Lands with Confidence",
    description:
      "Explore residential and commercial lands with location and pricing details.",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    title: "Commercial Spaces for Business",
    description:
      "Shops, offices, and commercial properties in prime locations.",
  },
];

const HomeSlider = () => {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // overlay slide index
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ✅ Guard currentIndex to always be valid
  const safeIndex =
    typeof currentIndex === "number" &&
    currentIndex >= 0 &&
    currentIndex < slides.length
      ? currentIndex
      : 0;

  const currentSlide = slides[safeIndex];

  return (
    <div ref={containerRef} className="w-full relative">
      {width > 0 && (
        <SimpleImageSlider
          width={width}
          height={Math.max(250, width * 0.35)}
          images={slides.map((s) => ({ url: s.url }))}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.5}
          loop={true}
          onStartSlide={(index) => setCurrentIndex(index)}
        />
      )}

      {/* Overlay text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start px-16 sm:px-24 pointer-events-none">
        <div className="text-white max-w-lg bg-black/40 p-6 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            {currentSlide?.title || ""}
          </h2>
          <p className="text-sm sm:text-base">
            {currentSlide?.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
