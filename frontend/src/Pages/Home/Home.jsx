import React from "react";
import Banner from "../../components/Homepage/Banner/Banner";
import FlashSale from "../../components/Homepage/FlashSale/FlashSale";
import Category from "../../components/Homepage/Category/Category";
import Bestsell from "../../components/Homepage/BestSale/Bestsell";
import ExploreProduct from "../../components/Homepage/ExproleProduct/ExploreProduct";
import Advertise from "../../components/Homepage/Advertise/Advertise";
import CountDown from "../../components/CommonComponents/CountDown";
import NewArrival from "../../components/Homepage/NewArrival/NewArrival";
import CustomerService from "../../components/Homepage/CustomerService/CustomerService";

const Home = () => {
  return (
    <>
      <Banner />
      <FlashSale />
      <Category />
      <Bestsell />
      <Advertise />
      <ExploreProduct />
      <NewArrival />
      <CustomerService />
    </>
  );
};

export default Home;
