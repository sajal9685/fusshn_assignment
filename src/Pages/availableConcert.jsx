import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom'

export default function AvailableConcert() {
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Available Concerts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {concerts.map((concert) => {
            const base64Image = concert.imageBase64?.startsWith("data:image")
              ? concert.imageBase64
              : `data:image/jpeg;base64,${concert.imageBase64}`;

            return (
              <Link key={concert.id} to={`/concerts/${concert.id}`}>
                <img
                  alt={concert.desc || "Concert image"}
                  src={
                    base64Image ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                />
                <div className="grid grid-cols-2 gap-4">
                  {" "}
                  <h3 className="mt-2 text-lg text-gray-700">
                    {concert.artist_name}
                  </h3>
                  <div className="flex ">
                    {" "}
                    <p className="mt-3 text-sm font-medium text-gray-400 line-through">
                      ${concert.Orprice}
                    </p>
                    <p className="mt-2 pl-1 text-lg font-medium text-gray-900">
                      ${concert.discount}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
