import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Trendy() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const concertsRef = ref(db, "concerts");

    const unsubscribe = onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedConcerts = Object.entries(data).map(([id, concert]) => ({
          id,
          ...concert,
        }));
        setConcerts(loadedConcerts);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#ECEFCA] py-10 px-4 sm:px-6 lg:px-10 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-[#213448] mb-8 text-center">
        🔥 Trendy Concerts
      </h2>

     <Swiper
      className="w-full"
  modules={[Pagination]}
  spaceBetween={20}
  pagination={{ clickable: true }}
  slidesPerGroup={4} // ✅ Key line: advance 4 at a time
  breakpoints={{
    320: { slidesPerView: 1, slidesPerGroup: 1 },
    640: { slidesPerView: 2, slidesPerGroup: 2 },
    1024: { slidesPerView: 3, slidesPerGroup: 3 },
    1280: { slidesPerView: 4, slidesPerGroup: 4 },
  }}
>

        {concerts.map((concert) => {
          const base64Image = concert.imageBase64?.startsWith("data:image")
            ? concert.imageBase64
            : `data:image/jpeg;base64,${concert.imageBase64}`;

          const ticketsLeft = concert.tickets ?? 40;

          return (
            <SwiperSlide key={concert.id}>
              <Link to={`/concerts/${concert.id}`} className="block group">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#94B4C1] shadow-md">
                  <img
                    alt={concert.desc || "Concert image"}
                    src={base64Image}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-1 px-1 text-[#213448]">
                  <h3 className="text-lg font-semibold">{concert.artist_name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-gray-400 line-through">
                    ${concert.Orprice}
                  </div>
                  <div className="text-lg font-bold text-[#213448]">
                    ${concert.discount}
                  </div>
                </div>
                  <p className="text-sm text-green-600 font-medium">
                    🎟️ {ticketsLeft} tickets left
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
