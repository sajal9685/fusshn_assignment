import React from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.avif";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.avif";
import banner5 from "../assets/banner5.avif";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


export default function Banner() {
  const banners = [banner5, banner4, banner1, banner2, banner3];

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg mb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-48 sm:h-80 md:h-96 lg:h-[32rem] bg-[#213448]">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}

