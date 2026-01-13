import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import AboutUs from './components/AboutUs';
import ProductGrid from './components/ProductGrid';
import Products from './components/Products';
import Cart from './components/Cart';
import OrderForm from './pages/OrderForm';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Footer from './components/Footer';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <main className="main-container">
      <Routes>
        <Route path="/" element={
          <>
            <HeroBanner />  {/* ✅ Slideshow only on home */}
            <AboutUs />
            <ProductGrid />
          </>
        } />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<OrderForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </main>
  </BrowserRouter>
);

export default App;
