import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/freshcart-logo.svg";
import { logOut } from "../../reducers/AuthSlice";
function Header() {
  const authData = useSelector((state) => state.auth);
  const { allProductCount } = useSelector((state) => state.cart);
  const { numberOfWishlist } = useSelector((state) => state.wishlist);
  const [bgHeader, setBgHeader] = useState("transparent");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBgHeader("bg-white");
      } else {
        setBgHeader("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <header
      className={`header transition position-fixed ${
        bgHeader === "bg-white" ? "bg-white" : ""
      }`}
    >
      <nav className="navbar navbar-expand-lg p-3">
        <div className="container position-relative">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <button
            className="navbar-toggler shadow-none "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse mt-3 mt-lg-0 flex-grow-0 navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav gap-lg-4 me-4 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="ourProducts" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">
                  Categories
                </Link>
              </li>
            </ul>
            {authData.token ? (
              <ul className="d-flex list-unstyled aligns-item-center gap-3 m-0 p-0">
                <li>
                  <Link className="nav-link text-decoration-none position-relative">
                    <i className="ri-truck-fill text-success fs-1"></i>
                    <span className="badge bg-danger  text-white  top-0 end-0 position-absolute">
                      0
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="wishlist"
                    className="nav-link text-decoration-none position-relative"
                  >
                    <i className="ri-heart-fill text-success fs-1"></i>
                    <span className="badge bg-danger  text-white  top-0 end-0 position-absolute">
                      {numberOfWishlist}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="nav-link text-decoration-none position-relative"
                  >
                    <i className="ri-shopping-cart-2-fill text-success fs-1"></i>
                    <span className="badge bg-danger  text-white  top-0 end-0 position-absolute">
                      {allProductCount}
                    </span>
                  </Link>
                </li>
                <li className="user dropdown-center">
                  <button
                    data-bs-target="#dropdownMenu"
                    aria-haspopup="true"
                    className="btn btn-success dropdown-toggle  d-flex gap-2 align-items-center  rounded-3 shadow "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="rounded-circle bg-white p-2">
                      <i className="ri-user-fill text-dark"></i>
                    </div>
                    <span className="user-name">{authData?.user?.name}</span>
                  </button>

                  <ul
                    className="dropdown-menu shadow border-0 overflow-hidden"
                    id="dropdownMenu"
                  >
                    <li>
                      <Link
                        className="dropdown-item transition sign-out"
                        to="/login"
                        onClick={() => handleLogout()}
                      >
                        Sign Out <i class="ri-arrow-right-line"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item transition settings"
                        href="#"
                      >
                        Settings <i class="ri-equalizer-line"></i>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <Link to="/login" className="btn btn-outline-success">
                Sign in / Sign up
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
