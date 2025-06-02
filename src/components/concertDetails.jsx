'use client'

import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { BookButton } from './BookNow'

export default function ConcertDetails({ concertId = 'abc123' }) {
  const [concert, setConcert] = useState(null)

  useEffect(() => {
    const concertRef = ref(db, `concerts/${concertId}`)
    const unsubscribe = onValue(concertRef, (snapshot) => {
      const data = snapshot.val()
      if (data) setConcert({ ...data, ticketsLeft: data.ticketsLeft || 40 })
    })
    return () => unsubscribe()
  }, [concertId])

  if (!concert) {
    return <div className="p-8 text-center text-secondary text-lg font-medium">Loading concert details...</div>
  }

  const {
    artist_name,
    desc,
    Orprice,
    discount,
    imageBase64,
    location,
    date,
    ticketsLeft
  } = concert

  const imageSrc = imageBase64
    ? imageBase64.startsWith('data:image')
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`
    : null

  return (
    <div className="min-h-screen bg-light py-10 px-4 sm:px-6 lg:px-20 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Image */}
        <div className="relative  flex items-center justify-center p-4">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={desc || 'Concert'}
              className="rounded-2xl object-cover shadow-xl w-full h-full max-h-[400px]"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
              No Image Available
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">{artist_name}</h1>

          <div className="text-sm text-secondary font-medium space-y-1">
            <p>{location}</p>
            <p>{date}</p>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-primary">
            {discount ? (
              <>
                <span className="line-through text-gray-400 mr-2">Rs.{Orprice}</span>
                <span className="text-secondary">Rs.{discount}</span>
              </>
            ) : (
              <>Rs.{Orprice}</>
            )}
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{desc}</p>

          <div className="text-accent font-semibold mt-2 text-sm sm:text-base">
            🎟️ Tickets Left: <span className="text-primary">{ticketsLeft}</span>
          </div>

          <div className="pt-2">
            <BookButton concertId={concertId} />
          </div>
        </div>
      </div>
    </div>
  )
}
