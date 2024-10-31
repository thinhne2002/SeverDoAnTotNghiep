import React from "react";
import Home from "./Views/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";


function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App;
