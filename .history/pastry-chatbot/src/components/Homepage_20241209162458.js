import React from 'react';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Updated path for modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Homepage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#f8f9fa' }}>
        <h1>Welcome to PastryBot</h1>
        <p>Your personalized assistant for all things pastry!</p>
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
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          modules={[Pagination, Navigation]} // Use modules
        >
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Pastry 1"
              style={{ width: '100%', maxWidth: '400px', height: 'auto', margin: '0 auto', borderRadius: '10px' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Pastry 2"
              style={{ width: '100%', maxWidth: '400px', height: 'auto', margin: '0 auto', borderRadius: '10px' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Pastry 3"
              style={{ width: '100%', maxWidth: '400px', height: 'auto', margin: '0 auto', borderRadius: '10px' }}
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
