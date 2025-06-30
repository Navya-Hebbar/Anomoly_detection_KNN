import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/ui/Home";
import PredictPage from "./components/ui/PredictPage";
import RealtimePage from "./components/ui/RealtimePage";
import ContactUs from "./components/ui/ContactUs";
import AboutUs from "./components/ui/AboutUs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/realtimesimulation" element={<RealtimePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}
