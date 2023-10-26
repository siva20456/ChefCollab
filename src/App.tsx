import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import SignInterface from './components/SignInterface';
import RestaurantRegister from './components/RestaurantSignFace';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register-signin' element={<SignInterface />} />
        <Route path='/restaurent-sign' element={<RestaurantRegister />} />
        <Route path='/ChefHome' element={<div>Chef Home</div>} />
        <Route path='/RestHome' element={<div>Restaurant Home</div>} />
      </Routes>
    </Router>
  )
}

export default App;
