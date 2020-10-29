import React from "react";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";
import FeaturedRooms from "../Components/FeaturedRooms";
import Hero from "../Components/Hero";
import Services from "../Components/Services";

const Home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subTitle="deluxe rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default Home;
