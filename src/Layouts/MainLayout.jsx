import React, { useContext } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import white_bg from "../assets/white_bg.jpg";
import black_bg from "../assets/black_bg.jpg";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { theme } = useContext(AuthContext);
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${theme === "light" ? white_bg : black_bg})`,
      }}
    >
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
