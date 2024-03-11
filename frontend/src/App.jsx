import React from 'react';
import LoginComponent from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginComponent/>} />
      </Routes> 
    </Router>
  )
}

export default App;
