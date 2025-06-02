import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [photoFile, setPhotoFile] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to register.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let base64Photo = "";
      if (photoFile) {
        base64Photo = await toBase64(photoFile);
      }

      await set(ref(db, "Users/" + user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        phone: phone,
        age: parseInt(age),
        photo: base64Photo,
      });

      alert("User Registered Successfully!");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEFCA] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#213448]">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-[#213448]">First Name</label>
            <input
              type="text"
              required
              onChange={(e) => setFname(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Last Name</label>
            <input
              type="text"
              onChange={(e) => setLname(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="Last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Phone Number</label>
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Age</label>
            <input
              type="number"
              required
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="Age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-[#94B4C1] file:text-white
                         hover:file:bg-[#547792]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213448]">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-[#94B4C1] rounded-md shadow-sm focus:ring-[#547792] focus:border-[#547792] text-[#213448]"
              placeholder="Enter password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#213448] hover:bg-[#547792] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#547792]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-[#547792]">
          Already registered?{" "}
          <a href="/SignIn" className="font-medium text-[#213448] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
