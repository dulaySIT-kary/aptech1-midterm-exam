import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ✅ Regex
  const nameRegex = /^[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]+$/;
  const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.*[\W_]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ Validate function
  const validate = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!nameRegex.test(value)) {
        error = "Name must be at least 2 letters only.";
      }
    }

    if (field === "email") {
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    }

    if (field === "password") {
      if (!passwordRegex.test(value)) {
        error =
          "8-16 chars, 1 uppercase, 1 number, 1 special character.";
      }
    }

    return error;
  };

  // ✅ Handle change (real-time validation)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name, value),
      }));
    }
  };

  // ✅ Handle blur (mark field as touched)
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  // ✅ Check if form is valid
  const isFormValid =
    Object.values(errors).every((err) => !err) &&
    formData.name &&
    formData.email &&
    formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = formData.email.split("@")[0];

    // Final validation check
    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      password: validate("password", formData.password),
    };

    if (!usernameRegex.test(username)) {
      newErrors.email = "Invalid username from email.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    const user = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      username,
      bio: "",
      avatar: "",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Storage error:", err);
    }

    navigate("/profile");
  };

  // ✅ Helper for styling
  const getInputClass = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "input-error" : "input-success";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("name")}
        />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("email")}
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("password")}
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <button type="submit" disabled={!isFormValid}>
          Signup
        </button>
      </form>

      {/* ✅ UX hint */}
      <small>
        Password must have uppercase, number, special character (8–16 chars).
      </small>
    </div>
  );
}

export default Signup;