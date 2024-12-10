import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Homepage = () => {
  const carouselStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px 0',
  };

  const slideStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1>Welcome to Pastry Bot</h1>
        <p>Explore our delicious pastries and more!</p>
      </section>

      {/* Image Carousel */}
      <section style={carouselStyle}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          <SwiperSlide style={slideStyle}>
            <img src="/path/to/your-image1.jpg" alt="Pastry 1" style={imageStyle} />
          </SwiperSlide>
          <SwiperSlide style={slideStyle}>
            <img src="/path/to/your-image2.jpg" alt="Pastry 2" style={imageStyle} />
          </SwiperSlide>
          <SwiperSlide style={slideStyle}>
            <img src="/path/to/your-image3.jpg" alt="Pastry 3" style={imageStyle} />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px 0', background: '#f8f8f8' }}>
        <p>© 2024 Pastry Bot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
