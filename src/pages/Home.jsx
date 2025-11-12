import React from "react";
import HomeSlider from "../components/HomeSlider";
import OurAchievements from "../components/HomePage/OurAchievements";
import OurServices from "../components/HomePage/OurServices";
import WhyChooseUs from "../components/HomePage/WhyChooseUs";

const Home = () => {
  return (
    <>
      <HomeSlider></HomeSlider>
      <WhyChooseUs></WhyChooseUs>
      <OurAchievements></OurAchievements>
      <OurServices></OurServices>
    </>
  );
};

export default Home;
