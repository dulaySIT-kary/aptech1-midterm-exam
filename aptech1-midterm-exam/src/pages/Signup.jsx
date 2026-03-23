import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  // state
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  // onChange handler (arrow function)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // onSubmit handler (arrow function)
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    // redirect after signup
    navigate("/success");
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange} // normal binding
          required
        />

        <br /><br />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          
          // INLINE HANDLER (binding technique)
          onChange={(e) => handleChange(e)}
          
          required
        />

        <br /><br />

        {/* INLINE onClick (another binding example) */}
        <button type="submit" onClick={() => console.log("Submitting...")}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;