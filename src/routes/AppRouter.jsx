import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import SignUp from "../Components/signup/SignUp";
import Login from "../Components/login/Login";
import ResetPassword from "../Components/resetPassword/ResetPassword";
import ResetCode from "../Components/resetCode/ResetCode";
import NewPassword from "../Components/newPassword/NewPassword";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import ScrollToTop from "../Components/scrollToTop/ScrollToTop";
import AuthSpinner from "../Components/spinner/authSpinner/AuthSpinner";
import SpecificCategory from "../Components/categories/SpecificCategory";
import BrandsDetails from "../Components/brands/BrandsDetails";
import ProtectedRoutes from "./ProtectedRoutes";

import Checkout from "../Components/checkout/Checkout";
const Wishlist = React.lazy(() => import("../Components/wishlist/Wishlist"));
const Cart = React.lazy(() => import("../Components/cart/Cart"));
const Orders = React.lazy(() => import("../Components/allOrders/Orders"));
const Home = React.lazy(() => import("../Components/home/Home"));
const OurCategories = React.lazy(() =>
  import("../Components/categories/OurCategories")
);
const Brands = React.lazy(() => import("../Components/brands/Brands"));
const AllProducts = React.lazy(() =>
  import("../Components/products/AllProducts")
);

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<AuthSpinner />}>
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="forgetPassword" element={<ResetPassword />} />
          <Route path="resetCode" element={<ResetCode />} />
          <Route path="newPassword" element={<NewPassword />} />
          <Route
            path="/ourProducts"
            element={
              <ProtectedRoutes>
                <AllProducts />
              </ProtectedRoutes>
            }
          />
          <Route
            path="productDetails/:id"
            element={
              <ProtectedRoutes>
                <ProductDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<AuthSpinner />}>
                <ProtectedRoutes>
                  <OurCategories />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="specificCategory/:id"
            element={
              <ProtectedRoutes>
                <SpecificCategory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="brands"
            element={
              <Suspense fallback={<AuthSpinner />}>
                <ProtectedRoutes>
                  <Brands />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="specificBrand/:id"
            element={
              <ProtectedRoutes>
                <BrandsDetails />
              </ProtectedRoutes>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={<AuthSpinner />}>
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="wishlist"
            element={
              <Suspense fallback={<AuthSpinner />}>
                <ProtectedRoutes>
                  <Wishlist />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="allorders"
            element={
              <Suspense fallback={<AuthSpinner />}>
                <Orders />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
