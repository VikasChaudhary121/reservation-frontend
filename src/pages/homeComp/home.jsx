// import React from "react";
import Featured from "../../components/featured/featured";
import FeaturedProperties from "../../components/featuredProperties/featuredProperties";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import MailList from "../../components/mailList/mailList";
import Navbar from "../../components/navbar/Nav";
import PropertyList from "../../components/propertyList/propertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse By Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes Guests Love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
