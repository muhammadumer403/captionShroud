import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./componets/Body";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
