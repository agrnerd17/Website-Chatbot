import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./styles/Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Add a picture above the carousel */}
      <div className="hero-image">
        <img
          src="https://your-image-url.com/hero-image.jpg"
          alt="Featured Pastries"
          className="hero-img"
        />
      </div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://your-image-url.com/pastry1.jpg"
            alt="Pastry 1"
            className="carousel-img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://your-image-url.com/pastry2.jpg"
            alt="Pastry 2"
            className="carousel-img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://your-image-url.com/pastry3.jpg"
            alt="Pastry 3"
            className="carousel-img"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Homepage;
