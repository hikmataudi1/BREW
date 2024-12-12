import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Rtl.css";

function Rtl() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
  };

  const slides = [
    { image: "rtl1.png" },
    { image: "rtl2.png" },
    { image: "rtl3.png" },
    { image: "rtl4.png" }
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide.image} alt="coffee" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Rtl;
