import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import React from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </Router>
  );
}
