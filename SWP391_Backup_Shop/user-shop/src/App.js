import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'

import LandingPage from './landing-page/LandingPage'
import Authentication from './authentication/Authentication'

import SideBar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/shop' element={<Home />} />
          <Route path='/shop/product/:id' element={<ProductDetails />} />
        </Routes>
        <SideBar />
      </Router>
    </div>
  )



};

export default App;
