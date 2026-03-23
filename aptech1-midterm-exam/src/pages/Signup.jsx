import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]+$/;
  const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.*[\W_]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const username = email.split("@")[0];

    // ✅ Validation
    if (!nameRegex.test(name)) {
      alert("Name must be at least 2 letters only.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!usernameRegex.test(username)) {
      alert("Username contains invalid characters.");
      return;
    }
//Hardcoded password validation for demonstration purposes. In production, use a proper authentication system.
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be 8-16 chars, include 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    // Build user object
    const user = {
      name,
      email,
      username,
      bio: "",
      avatar: "",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Failed to save user:", err);
    }

    navigate("/profile");
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
