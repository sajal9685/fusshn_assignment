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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      photo: base64Photo
    });

    alert("User Registered Successfully!");
  } catch (error) {
    console.error("Registration Error:", error);
    alert(error.message);
  }
};


 

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Phone Number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Age</label>
        <input
          type="number"
          className="form-control"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

     <div className="mb-3">
        <label>Profile Photo</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <a href="/SignIn">Login</a>
      </p>
    </form>
  );
}

export default Register;
