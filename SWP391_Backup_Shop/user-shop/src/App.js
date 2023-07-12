import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import CategoryShop from './pages/CategoryShops'
import SpecialShop from './pages/SpecialShop'
import ViewCart from './pages/ViewCart';
import Checkout from './pages/Checkout';
import Admin from './admin/Admin'

import LandingPage from './landing-page/LandingPage'
import Authentication from './authentication/Authentication'

import SideBar from './components/Sidebar'

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/shop' element={<Home />} />
          <Route path='/shop/product/:id' element={<ProductDetails />} />
          <Route path='/shop/category' element={<CategoryShop/>}/>
          <Route path='/shop/special' element={<SpecialShop/>}/>
          <Route path='/shop/cart' element={<ViewCart/>}/>
          <Route path='/shop/checkout' element={<Checkout/>}/>
        </Routes>
        <SideBar />
      </Router>
    </div>
  )



};

export default App;
