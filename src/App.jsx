import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home.jsx';
import SignInForm from './components/pages/SignInWithGoogle.jsx';
import CustomPage from './components/pages/CustomPage.jsx';
import HomeCustom from './components/pages/HomeCustom.jsx';
import About from './components/pages/About.jsx';
import ViewRaceSchedule from './components/pages/ViewRaceSchedule.jsx';
//import RacePrediction from './components/pages/MakePrediction.jsx';
import MakePrediction from './components/pages/MakePrediction.jsx';
import LeaderBoard from './components/pages/LeaderBoard.jsx';

function App() {

  return (
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignInForm" element={<SignInForm />} />
        <Route path="/CustomPage" element={<CustomPage />} />
        <Route path="/HomeCustom" element={<CustomPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/ViewRaceSchedule" element={<ViewRaceSchedule />} />
        <Route path="/MakePrediction" element={<MakePrediction />} />
        <Route path="/LeaderBoard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
 
  );
}

export default App
