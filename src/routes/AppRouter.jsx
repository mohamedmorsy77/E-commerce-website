import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import SignUp from "../Components/signup/SignUp";
import Login from "../Components/login/Login";
import ResetPassword from "../Components/resetPassword/ResetPassword";
import ResetCode from "../Components/resetCode/ResetCode";
import NewPassword from "../Components/newPassword/NewPassword";

import ScrollToTop from "../Components/scrollToTop/ScrollToTop";
import ProtectedRoutes from "./ProtectedRoutes";

import Checkout from "../Components/checkout/Checkout";
import Loading from "../Components/spinner/loading/Loading";

import UpdateProfileData from "../Components/profile/UpdateProfileData";
import ChangePassword from "../Components/profile/ChangePassword";

const Profile = React.lazy(() => import("../Components/profile/Profile"));
const ProductDetails = React.lazy(() =>
  import("../Components/ProductDetails/ProductDetails")
);
const SpecificCategory = React.lazy(() =>
  import("../Components/categories/SpecificCategory")
);

const BrandsDetails = React.lazy(() =>
  import("../Components/brands/BrandsDetails")
);
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
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
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
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <ProductDetails />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <OurCategories />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="specificCategory/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <SpecificCategory />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="brands"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <Brands />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="specificBrand/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <BrandsDetails />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="wishlist"
            element={
              <Suspense fallback={<Loading />}>
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
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <Orders />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="my-profile"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              </Suspense>
            }
          />
          <Route
            path="change-profile-data"
            element={
              <ProtectedRoutes>
                <UpdateProfileData />
              </ProtectedRoutes>
            }
          />
          <Route
            path="change-password"
            element={
              <ProtectedRoutes>
                <ChangePassword />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
