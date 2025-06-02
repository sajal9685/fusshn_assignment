import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function ArtistConcerts() {
  const { artistName } = useParams();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const concertsRef = ref(db, "concerts");

    const unsubscribe = onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredConcerts = Object.entries(data)
          .filter(([, concert]) => concert.artist_name === artistName)
          .map(([id, concert]) => ({ id, ...concert }));
        setConcerts(filteredConcerts);
      } else {
        setConcerts([]);
      }
    });

    return () => unsubscribe();
  }, [artistName]);

  return (
    <div className="bg-[#ECEFCA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#213448] mb-8 text-center">
          🎤 Concerts by {artistName}
        </h2>

        {concerts.length === 0 ? (
          <p className="text-center text-[#547792] text-lg">No concerts available for this artist.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {concerts.map((concert) => {
              const base64Image = concert.imageBase64?.startsWith("data:image")
                ? concert.imageBase64
                : `data:image/jpeg;base64,${concert.imageBase64}`;

              return (
                <Link
                  key={concert.id}
                  to={`/concerts/${concert.id}`}
                  className="group rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/4] bg-[#94B4C1]">
                    <img
                      alt={concert.desc || "Concert image"}
                      src={base64Image || "https://via.placeholder.com/300x200?text=No+Image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-[#213448] truncate">
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
                    <p className="text-sm font-medium text-green-600">
                      🎟️ {concert.tickets ?? 40} tickets left
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
