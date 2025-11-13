import React, { useState, useEffect, useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://images.unsplash.com/photo-1493606371202-6275828f90f3?auto=format&fit=crop&q=80&w=1171",
  },
  {
    url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?_gl=1*1ilklfy*_ga*NjE2MjYzOTA3LjE3NjI3ODExOTE.*_ga_8JE65Q40S6*czE3NjI4NzI1MjkkbzIkZzEkdDE3NjI4NzI4NTAkajYwJGwwJGgw",
  },
  {
    url: "https://images.pexels.com/photos/8954104/pexels-photo-8954104.jpeg?_gl=1*1mzjwpk*_ga*NjE2MjYzOTA3LjE3NjI3ODExOTE.*_ga_8JE65Q40S6*czE3NjI4NzI1MjkkbzIkZzEkdDE3NjI4NzI3NzYkajYwJGwwJGgw",
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
          height={Math.max(250, width * 0.35)} // height scales with width but not too small
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
