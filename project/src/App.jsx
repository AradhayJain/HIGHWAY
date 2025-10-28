// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Experiences from "./pages/Experiences";
import Slot from "./pages/Slot";
import ConfirmationPage from "./pages/ConfirmationPage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent route with shared layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Experiences/>} />
          <Route path="slots" element={<Slot/>} />
          <Route path="checkout" element={<BookingPage/>} />
          <Route path="confirmed" element={<ConfirmationPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
