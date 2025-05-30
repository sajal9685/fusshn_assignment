import React, { useState } from "react";
import { ref as dbRef, push, set } from "firebase/database";
import { db } from "../firebase";  // your firebase config

export default function Dashboard() {
  const [formData, setFormData] = useState({
    image: null,
    artist_name: "",
    date: "",
    Orprice: "",
    discount: "",
    desc:"",
    location: ""
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
        desc: formData.desc
      })
        .then(() => {
          alert("Concert added with image!");
          setFormData({
            image: null,
            artist_name: "",
            date: "",
            Orprice: "",
            discount: "",
            location: "",
            desc:""
          });
        })
        .catch((error) => alert("Error: " + error.message));
    };

    reader.readAsDataURL(formData.image);
  };
  return (
     <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Add concert</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">concert artist name </label>
          <input
            type="text"
            value={formData.artist_name}
            onChange={(e) => handleInputChange("artist_name", e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description </label>
          <input
            type="text"
            value={formData.desc}
            onChange={(e) => handleInputChange("desc", e.target.value)}
            className="w-full  border border-gray-300 rounded p-2 text-sm"
            
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="pune..."
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Original Price</label>
            <input
              type="number"
              value={formData.Orprice}
              onChange={(e) => handleInputChange("Orprice", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Discount Price</label>
            <input
              type="number"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
         
            <input
              type="date"
              placeholder="Left"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
           
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Add Concert
        </button>
      </div>
    </div>
  )
}
