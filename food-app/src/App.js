import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import AdminProducts from "./pages/AdminDashboard/AdminProducts";
import AddProduct from "./pages/AdminDashboard/AddProduct";
import SingleUpload from "./pages/AdminDashboard/SingleUpload";
import BulkUpload from "./pages/AdminDashboard/BulkUpload";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import AdminLogin from "./pages/Login/AdminLogin";
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? <Home /> : <Login />
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-products" element={<AdminProducts />} />
          <Route path="/admin-add-product" element={<AddProduct />} />
          <Route path="/admin-single-upload" element={<SingleUpload />} />
          <Route path="/admin-bulk-upload" element={<BulkUpload />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
