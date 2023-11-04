import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignInterface from './components/SignInterface';
import RestaurantRegister from './components/RestaurantSignFace';
import Home from './components/RestHome/HomePage';
import ChefHome from './components/ChefHome/ChefHome';
import Portfolio from './components/Portfolios/RestPortfolio';
import ChefPortfolio from './components/Portfolios/ChefPortfolio';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register-signin' element={<SignInterface />} />
        <Route path='/restaurent-sign' element={<RestaurantRegister />} />
        <Route path='/ChefHome' element={<ChefHome />} />
        <Route path='/RestHome' element={<Home />} />
        <Route path='/RestPortfolio' element={<Portfolio />} />
        <Route path='/ChefPortfolio' element={<ChefPortfolio />} />
      </Routes>
    </Router>
  )
}

export default App;
