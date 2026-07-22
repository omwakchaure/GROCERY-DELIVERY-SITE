import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SerachResults from "./pages/SerachResults";
import FlashDeals from "./pages/FlashDeals";
import ProductDetail from "./pages/productDetail";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderTracking from "./pages/OrderTracking";
import Addresses from "./pages/Addresses";
import ProtectedRoutes from "./components/ProtectedRoutes";
const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1B3022",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <Routes>
        {/* Auth pages - No Navbar/Footer */}
        <Route path="/login" element={<Login />} />

        {/* Main pages - With Navbar/Footer */}

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="search" element={<SerachResults />} />
          <Route path="deals" element={<FlashDeals />} />

          <Route element = <ProtectedRoutes />>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
