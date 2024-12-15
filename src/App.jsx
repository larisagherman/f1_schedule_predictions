import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home.jsx';
function App() {

  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
 
  );
}

export default App
