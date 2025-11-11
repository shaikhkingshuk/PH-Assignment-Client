import React, { useState, useEffect, useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://images.unsplash.com/photo-1493606371202-6275828f90f3?auto=format&fit=crop&q=80&w=1171",
  },
  {
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1080",
  },
  {
    url: "https://images.unsplash.com/photo-1520106392146-ef585c111254?auto=format&fit=crop&q=80&w=1125",
  },
];

const HomeSlider = () => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setWidth(containerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {width > 0 && (
        <SimpleImageSlider
          width={width}
          height={Math.max(250, width * 0.4)} // height scales with width but not too small
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.5}
          loop={true}
        />
      )}
    </div>
  );
};

export default HomeSlider;
