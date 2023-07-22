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
import UserDetails from "./admin/pages/UserDetails";
import Publishers from "./admin/pages/Publishers"
import PublisherDetails from "./admin/pages/PublisherDetails"
import AddPublishers from "./admin/pages/AddPublishers";
import GamePackages from "./admin/pages/GamePackages";
import DetailGamePackage from "./admin/pages/DetailGamePackage";
import Boardgames from "./admin/pages/Boardgames";
import AddBoardgames from "./admin/pages/AddBoardgames";
import DetailBoardgame from "./admin/pages/DetailBoardgame";
import UpdateBoardgame from "./admin/pages/UpdateBoardgame";
import Tags from "./admin/pages/Tags";
import Transactions from "./admin/pages/Transactions";
import DetailTransations from "./admin/pages/DetailTransations";
import AdminAccount from "./admin/components/AdminAccount";
import Footer from "./components/Footer";


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
    <div>
      <div className="flex w-full h-full overflow-auto">
        <Sidebar />
        <div className="flex-1  bg-[#A5C0DD]">
          <AdminAccount/>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/dashboard" element={<Dashboard/>} />
  
            {/* Users: R */}
            <Route path="/users" element={<Users />}/>
            <Route path="/users/details/:id" element={<UserDetails/>}/>
  
            {/* Publisher: C,R,D */}
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/publishers/create" element={<AddPublishers/>} />
            <Route path="/publisher/details/:id" element={<PublisherDetails/>}/>
  
            {/* GamePackages: R */}
            <Route path="/game-packages" element={<GamePackages />} />
            <Route path="/game-packages/details/:id" element={<DetailGamePackage/>}/>
  
            {/* Boardgames: C,R,U,D */}
            <Route path="/boardgames" element={<Boardgames />} />
            <Route path="/boardgames/details/:id" element={<DetailBoardgame/>}/>
            <Route path="/boardgames/update/:id" element={<UpdateBoardgame/>}/>
            <Route path="/boardgames/create" element={<AddBoardgames/>} />
  
            {/* Transactions: R */}
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/details/:id" element={<DetailTransations/>}/>
  
            {/* Tags: C,R,U,D */}
            <Route path="/tags" element={<Tags />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
