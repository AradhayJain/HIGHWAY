// Layout.js
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div>
      {/* Common layout elements */}
      <Navbar/>

      {/* Nested route content will appear here */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
