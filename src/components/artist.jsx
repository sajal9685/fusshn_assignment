import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Artist() {
  const [concerts, setConcerts] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");

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

        const uniqueArtists = [
          ...new Set(loadedConcerts.map((concert) => concert.artist_name)),
        ];
        setArtists(uniqueArtists);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredConcerts = selectedArtist
    ? concerts.filter((concert) => concert.artist_name === selectedArtist)
    : concerts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECEFCA] to-[#94B4C1] py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl font-bold text-center text-[#213448] mb-6">
        🎤 Browse by Artist
      </h1>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedArtist("")}
          className={`px-4 py-2 rounded-full font-medium transition border ${
            selectedArtist === ""
              ? "bg-[#213448] text-white"
              : "bg-white text-[#213448] border-[#213448]"
          } hover:bg-[#547792] hover:text-white`}
        >
          All Artists
        </button>
        {artists.map((artist) => (
          <button
            key={artist}
            onClick={() => setSelectedArtist(artist)}
            className={`px-4 py-2 rounded-full font-medium transition border ${
              selectedArtist === artist
                ? "bg-[#213448] text-white"
                : "bg-white text-[#213448] border-[#213448]"
            } hover:bg-[#547792] hover:text-white`}
          >
            {artist}
          </button>
        ))}
      </div>

      {/* Artist Slider */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
      >
        {filteredConcerts.map((concert) => {
          const base64Image = concert.imageBase64?.startsWith("data:image")
            ? concert.imageBase64
            : `data:image/jpeg;base64,${concert.imageBase64}`;

          const ticketsLeft = concert.tickets ?? 30;

          return (
            <SwiperSlide key={concert.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-3 h-full">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#94B4C1]">
                  <img
                    src={base64Image}
                    alt={concert.desc || "Concert Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#213448]">
                  {concert.artist_name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-gray-400 line-through">
                    ${concert.Orprice}
                  </div>
                  <div className="text-lg font-bold text-[#213448]">
                    ${concert.discount}
                  </div>
                </div>
                <p className="mt-1 text-sm text-green-600 font-medium">
                  🎟️ {ticketsLeft} tickets left
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
