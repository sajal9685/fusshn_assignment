import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import app from '../firebase';

export default function AllConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [editConcertId, setEditConcertId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({
          ...prev,
          imageBase64: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const db = getDatabase(app);
    const concertsRef = ref(db, 'concerts');

    const unsubscribe = onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const concertList = Object.entries(data).map(([concertId, concert]) => ({
          concertId,
          ...concert,
        }));
        setConcerts(concertList);
      } else {
        setConcerts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (concert) => {
    setEditConcertId(concert.concertId);
    setEditData(concert);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const db = getDatabase(app);
    const { concertId, ...dataToUpdate } = editData;
    const concertRef = ref(db, `concerts/${editConcertId}`);
    update(concertRef, dataToUpdate)
      .then(() => {
        setEditConcertId(null);
        setEditData({});
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  const handleDelete = async (concertId) => {
    if (window.confirm('Are you sure you want to delete this concert?')) {
      const db = getDatabase(app);
      const concertRef = ref(db, `concerts/${concertId}`);
      await remove(concertRef);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-light min-h-screen">
      <h2 className="text-2xl font-bold text-primary mb-6">All Concerts</h2>

      {concerts.length === 0 ? (
        <p className="text-secondary">No concerts found.</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Artist</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Discount</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert) =>
                  editConcertId === concert.concertId ? (
                    <tr key={concert.concertId} className="bg-accent/10">
                      <td className="p-3 border">
                        {editData.imageBase64 ? (
                          <img src={editData.imageBase64} alt="Concert" className="w-20 h-20 object-cover rounded mb-2" />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 text-sm" />
                      </td>
                      <td className="p-3 border">
                        <input name="artist_name" value={editData.artist_name || ''} onChange={handleChange}
                          className="w-full border p-1 rounded" />
                      </td>
                      <td className="p-3 border">
                        <input type="date" name="date" value={editData.date || ''} onChange={handleChange}
                          className="w-full border p-1 rounded" />
                      </td>
                      <td className="p-3 border">
                        <input type="number" name="Orprice" value={editData.Orprice || ''} onChange={handleChange}
                          className="w-full border p-1 rounded" />
                      </td>
                      <td className="p-3 border">
                        <input type="number" name="discount" value={editData.discount || ''} onChange={handleChange}
                          className="w-full border p-1 rounded" />
                      </td>
                      <td className="p-3 border">
                        <textarea name="desc" value={editData.desc || ''} onChange={handleChange}
                          className="w-full border p-1 rounded" rows={3} />
                      </td>
                      <td className="p-3 border flex flex-col gap-2">
                        <button onClick={handleSave} className="bg-green-600 text-white py-1 rounded hover:bg-green-700">
                          Save
                        </button>
                        <button onClick={() => { setEditConcertId(null); setEditData({}); }}
                          className="bg-gray-300 text-black py-1 rounded hover:bg-gray-400">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={concert.concertId}>
                      <td className="p-3 border">
                        {concert.imageBase64 ? (
                          <img src={concert.imageBase64} alt={concert.artist_name}
                            className="w-20 h-20 object-cover rounded" />
                        ) : (
                          <span className="text-gray-400 italic">No image</span>
                        )}
                      </td>
                      <td className="p-3 border">{concert.artist_name}</td>
                      <td className="p-3 border">{concert.date}</td>
                      <td className="p-3 border">₹{concert.Orprice}</td>
                      <td className="p-3 border">₹{concert.discount}</td>
                      <td className="p-3 border">{concert.desc}</td>
                      <td className="p-3 border flex flex-col gap-2">
                        <button onClick={() => handleEdit(concert)}
                          className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(concert.concertId)}
                          className="bg-red-600 text-white py-1 rounded hover:bg-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {concerts.map((concert) => (
              <div key={concert.concertId} className="bg-white border border-gray-200 rounded p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={concert.imageBase64 || 'https://via.placeholder.com/100'}
                    alt={concert.artist_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary">{concert.artist_name}</h3>
                    <p className="text-sm text-gray-600">Date: {concert.date}</p>
                    <p className="text-sm text-gray-600">Price: ₹{concert.Orprice} | Discount: ₹{concert.discount}</p>
                  </div>
                </div>
                <p className="text-sm mt-2 text-gray-700">{concert.desc}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleEdit(concert)}
                    className="flex-1 bg-secondary text-white py-1 rounded hover:bg-secondary/90">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(concert.concertId)}
                    className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
