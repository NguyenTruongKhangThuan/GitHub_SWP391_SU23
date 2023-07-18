import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CategoryShop from "./pages/CategoryShops";
import SpecialShop from "./pages/SpecialShop";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";


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

import Sidebar from "./admin/components/Sidebar";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Publishers from "./admin/pages/Publishers"
import GamePackages from "./admin/pages/GamePackages";
import Boardgames from "./admin/pages/Boardgames";
import Transactions from "./admin/pages/Transactions";
import Tags from "./admin/pages/Tags";


const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/auth" element={<Authentication />} />

          {/* Admin */}
          <Route path="/admin/*" element={<AdminLayout />} />

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

const AdminLayout = () => {

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex-1  bg-[#A5C0DD]">
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/users" element={<Users />}/>
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/game-packages" element={<GamePackages />} />
          <Route path="/boardgames" element={<Boardgames />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
