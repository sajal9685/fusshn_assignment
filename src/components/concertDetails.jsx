'use client'

import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ConcertDetails({ concertId = 'abc123' }) {
  const [concert, setConcert] = useState(null)

  useEffect(() => {
    const concertRef = ref(db, `concerts/${concertId}`)

    const unsubscribe = onValue(concertRef, (snapshot) => {
      const data = snapshot.val()
      if (data) { 
        setConcert(data)

      }
    })

    return () => unsubscribe()
  }, [concertId])

  if (!concert) {
    return <div className="p-8 text-center text-gray-600">Loading concert details...</div>
  }

  const {
    artist_name,
    desc,
    Orprice,
    discount,
    imageBase64 ,
    // highlights,
    // details,
    // reviews,
    location,
    date,
    // time
  } = concert


const imageSrc = imageBase64
  ? imageBase64.startsWith('data:image') 
    ? imageBase64 || '/placeholder.jpg' 
    : `data:image/jpeg;base64,${image}`
  : null;




  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="flex justify-between gap-40 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          
          {/* Concert image */}
          <div className="flex-shrink-0">
           {imageSrc ? (
  <img
    src={imageSrc}
    alt={desc || "Concert image"}
    className=" rounded-lg object-cover"
    width={500}
 
  />
) : (
  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
    No Image Available
  </div>
)}

          </div>

          {/* Concert info */}
          <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {artist_name}
              </h1>
              <p className="mt-1 text-lg text-gray-500">{location}</p>
              <p className="mt-1 text-md text-gray-500">{date} </p>

              <p className="text-3xl tracking-tight text-gray-900 mt-2">
                {discount ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">${Orprice}</span>
                    <span>${discount}</span>
                  </>
                ) : (
                  <>${Orprice}</>
                )}
              </p>

              {/* Reviews */}
              {/* {reviews && (
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-yellow-500' : 'text-gray-200',
                          'h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <a href={reviews.href || '#'} className="ml-2 text-sm text-indigo-600 hover:underline">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              )} */}

              {/* Description */}
              <div className="mt-6 text-base text-gray-700">
                <p>{desc}</p>
              </div>

              {/* Highlights */}
              {/* {highlights && Array.isArray(highlights) && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Details
              {details && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Details</h3>
                  <p className="mt-2 text-sm text-gray-600">{details}</p>
                </div>
              )} */}

              {/* Book button */}
              <button
                type="button"
                className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
