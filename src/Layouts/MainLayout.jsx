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
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${theme === "light" ? white_bg : black_bg})`,
        }}
      ></div>

      <div className="min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
