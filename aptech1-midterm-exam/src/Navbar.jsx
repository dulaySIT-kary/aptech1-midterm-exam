import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333" }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <Link to="/signup" style={linkStyle}>Signup</Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
};

export default Navbar;