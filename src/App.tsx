import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import React from 'react';
import RoughjsDemo from './page/roughjsDemo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/rough' element={<RoughjsDemo />}></Route>
      </Routes>
    </Router>
  );
}
