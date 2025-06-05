import React, { useState } from "react";
import { ref as dbRef, push, set } from "firebase/database";
import { db } from "../firebase";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    image: null,
    artist_name: "",
    date: "",
    Orprice: "",
    discount: "",
    desc: "",
    location: "",
    tickets: "40",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = () => {
    if (!formData.image) {
      alert("Please upload an image");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      const concertsRef = dbRef(db, "concerts");
      const newConcertRef = push(concertsRef);

      set(newConcertRef, {
        artist_name: formData.artist_name,
        date: formData.date,
        Orprice: formData.Orprice,
        discount: formData.discount,
        location: formData.location,
        imageBase64: base64Image,
        desc: formData.desc,
        tickets: formData.tickets, // ✅ Save number of tickets
      })
        .then(() => {
          alert("Concert added successfully!");
          setFormData({
            image: null,
            artist_name: "",
            date: "",
            Orprice: "",
            discount: "",
            desc: "",
            location: "",
            tickets: "40", // ✅ Reset to default
          });
        })
        .catch((error) => alert("Error: " + error.message));
    };

    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-light rounded-2xl shadow-lg text-primary">
      <h2 className="text-2xl font-bold mb-6 text-center">🎵 Add New Concert</h2>

      <div className="space-y-5">
            <div>
          <label className="block text-sm font-semibold mb-1">Artist Name</label>
          <input
            type="text"
            value={formData.artist_name}
            onChange={(e) => handleInputChange("artist_name", e.target.value)}
            className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={formData.desc}
            onChange={(e) => handleInputChange("desc", e.target.value)}
            className="w-full border border-secondary rounded-xl p-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g., Pune"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Original Price</label>
            <input
              type="number"
              value={formData.Orprice}
              onChange={(e) => handleInputChange("Orprice", e.target.value)}
              className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Discount Price</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
              className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* ✅ Tickets Input */}
        <div>
          <label className="block text-sm font-semibold mb-1">Total Tickets</label>
          <input
            type="number"
            value={formData.tickets}
            onChange={(e) => handleInputChange("tickets", e.target.value)}
            className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Date and Image */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full border border-secondary rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary text-light font-semibold rounded-xl hover:bg-secondary transition duration-300"
          >
            Add Concert
          </button>
        </div>
      </div>
    </div>
  );
}
