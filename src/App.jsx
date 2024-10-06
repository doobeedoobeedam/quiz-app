import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;