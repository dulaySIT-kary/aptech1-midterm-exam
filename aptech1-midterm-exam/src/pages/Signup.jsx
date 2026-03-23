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
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ✅ Regex
  const nameRegex = /^[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.*[\W_]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (field, value) => {
    if (field === "name" && !nameRegex.test(value)) {
      return "Name must be at least 2 letters.";
    }
    if (field === "email" && !emailRegex.test(value)) {
      return "Invalid email.";
    }
    if (field === "password" && !passwordRegex.test(value)) {
      return "Weak password (8–16, uppercase, number, special char).";
    }
    return "";
  };

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

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    formData.name &&
    formData.email &&
    formData.password;

  // ✅ Simulated API call
  const fakeSignup = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // simulate error (10% chance)
        if (Math.random() < 0.1) {
          reject("Server error. Try again.");
        } else {
          resolve("Success");
        }
      }, 1200);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Final validation
    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      password: validate("password", formData.password),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    setLoading(true);

    try {
      await fakeSignup();

      const user = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        username: formData.email.split("@")[0],
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect after success
      navigate("/profile");
    } catch (err) {
      setSubmitError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        {/* ✅ Submit error */}
        {submitError && <p className="error">{submitError}</p>}

        <button type="submit" disabled={!isFormValid || loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;