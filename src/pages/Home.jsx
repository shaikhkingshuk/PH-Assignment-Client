import React from "react";
import OurAchievements from "../components/HomePage/OurAchievements";
import OurServices from "../components/HomePage/OurServices";
import WhyChooseUs from "../components/HomePage/WhyChooseUs";
import HomeSlider from "../components/HomePage/HomeSlider";
import RecentProperties from "../components/HomePage/RecentProperties";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <WhyChooseUs />
      <RecentProperties />
      <OurAchievements />
      <OurServices />
    </>
  );
};

export default Home;
