import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Homepage = () => {
    return (
        <div>
            <section className="hero">
                <h1>Welcome to PastryBot Bakery</h1>
                <p>Delicious pastries at your fingertips</p>
            </section>
            <section className="carousel">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    <SwiperSlide><img src="/path/to/your-image1.jpg" alt="Pastry 1" /></SwiperSlide>
                    <SwiperSlide><img src="/path/to/your-image2.jpg" alt="Pastry 2" /></SwiperSlide>
                    <SwiperSlide><img src="/path/to/your-image3.jpg" alt="Pastry 3" /></SwiperSlide>
                </Swiper>
            </section>
            <footer>
                <p>© 2024 PastryBot Bakery. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
