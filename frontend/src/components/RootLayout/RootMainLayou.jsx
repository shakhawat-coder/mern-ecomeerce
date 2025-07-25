import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";

const RootMainLayou = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootMainLayou;
