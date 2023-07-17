import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CategoryShop from "./pages/CategoryShops";
import SpecialShop from "./pages/SpecialShop";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import Admin from "./admin/Admin";

import LandingPage from "./landing-page/LandingPage";
import Authentication from "./authentication/Authentication";

import SideBar from "./components/Sidebar";

import AddPage from "./publisher/page/AddPage";
import ViewDetails from "./publisher/page/ViewDetails";
import HomePage from "./publisher/page/HomePage";
import UpdateDetails from "./publisher/page/UpdateDetails";

import PaymentResult from "./pages/PaymentResult";
import UserProfile from "./pages/UserProfile";
import UserPaymentDetails from "./pages/UserPaymentDetails";
import UserOrderDetails from "./pages/UserOrderDetails";
import Sales from "./publisher/page/Sales";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/auth" element={<Authentication />} />

          <Route path="/admin" element={<Admin />} />

          {/* Shop - User */}
          <Route path="/shop" element={<Home />} />
          <Route path="/shop/product/:id" element={<ProductDetails />} />
          <Route path="/shop/category" element={<CategoryShop />} />
          <Route path="/shop/special" element={<SpecialShop />} />
          <Route path="/shop/cart" element={<ViewCart />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/paymentresult" element={<PaymentResult />} />

          {/* User - Information */}
          <Route path="/shop/user/profile" element={<UserProfile/>}/>
          <Route path="/shop/user/paymentdetails" element={<UserPaymentDetails/>}/>
          <Route path="/shop/user/orderdetails" element={<UserOrderDetails/>}/>

          {/* Shop - Publisher */}
          <Route path="/shop/publisher" element={<HomePage />} />
          <Route path="/shop/publisher/product/:id" element={<ViewDetails />} />
          <Route
            path="/shop/publisher/product/update/:id"
            element={<UpdateDetails />}
          />
          <Route path="/shop/publisher/product/add" element={<AddPage />} />
          <Route path="/shop/publisher/viewsales" element={<Sales/>}/>
        </Routes>
        <SideBar />
      </Router>
    </div>
  );
};

export default App;
