import React from "react";
import TypingBox from "../Components/TypingBox";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const HomePage = () => {
  // console.log(auth);

  return (
    <div className="canvas">
      <Header />
      <TypingBox />
      <Footer />
    </div>
  );
};

export default HomePage;
