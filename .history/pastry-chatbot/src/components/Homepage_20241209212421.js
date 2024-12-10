import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Updated path for modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Homepage = () => {
    const carouselStyle = {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px 0',
      };
    
      const slideContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      };
    
      const imageStyle = {
        maxWidth: '100%',
        maxHeight: '400px',
        objectFit: 'contain',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      };
  return (
    
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#0000' }}>
        <h1>Welcome to our Pastry Shop!</h1>
        <p>Check out our pastries:</p>
        <img
          src="https://via.placeholder.com/800x400"
          alt="Delicious Pastries"
          style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }}
        />
      </section>

      {/* Swiper Carousel Section */}
      <section style={{ padding: '2rem 0', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Featured Pastries</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
           <SwiperSlide style={slideContainerStyle}>
            <img
              src="https://via.placeholder.com/800x400.png?text=Pastry+1"
              alt="Pastry 1"
              style={imageStyle}
            />
          </SwiperSlide>
          <SwiperSlide style={slideContainerStyle}>
            <img
              src="https://via.placeholder.com/800x400.png?text=Pastry+2"
              alt="Pastry 2"
              style={imageStyle}
            />
          </SwiperSlide>
          <SwiperSlide style={slideContainerStyle}>
            <img
              src="https://via.placeholder.com/800x400.png?text=Pastry+3"
              alt="Pastry 3"
              style={imageStyle}
            />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '1rem 0', textAlign: 'center' }}>
        <p>&copy; 2024 PastryBot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;