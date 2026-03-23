import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeStyle = { fontWeight: "bold", textDecoration: "underline" };
  return (
    <nav style={{ padding: 16 }}>
      <NavLink to="/" end style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Home
      </NavLink>
      {' '}
      |{' '}
      <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Profile
      </NavLink>
      {' '}
      |{' '}
      <NavLink to="/signup" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Signup
      </NavLink>
      {' '}
      |{' '}
      <NavLink to="/success" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Success
      </NavLink>
    </nav>
  );
}