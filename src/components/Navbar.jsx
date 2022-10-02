import React from "react";

export const Navbar = ({ user, logout }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>Navbar</h3>
      <h3>{user.name}</h3>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};
