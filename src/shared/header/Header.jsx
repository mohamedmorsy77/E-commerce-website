import React from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/AuthSlice";
import { toast } from "react-toastify";
function Header() {
  const authData = useSelector((state) => state.auth);
  const { allProductCount } = useSelector((state) => state.cart);
  const { numberOfWishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    setTimeout(() => {
      toast.success("Signed out successfully");
    }, 300);
    navigate("/");
  };

  return (
    <header className={`header transition position-fixed bg-white`}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container position-relative">
          <Link className="navbar-brand d-flex align-items-center gap-1" to="/">
            <i className="ri-shopping-cart-2-line text-success fs-1"></i>{" "}
            <h1 className="mb-0 fs-4 text-success fw-bold">ElectraFit</h1>
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
            className="collapse mt-3 mt-lg-0 gap-2 flex-grow-0 navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav gap-2 me-0 me-lg-4 mb-2 mb-lg-0">
              <li className="nav-item transition">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link  active" : "nav-link "
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item transition">
                <NavLink
                  to="ourProducts"
                  className={({ isActive }) =>
                    isActive ? "nav-link  active" : "nav-link "
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item transition">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link  active" : "nav-link "
                  }
                  to="brands"
                >
                  Brands
                </NavLink>
              </li>
              <li className="nav-item transition">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link  active" : "nav-link"
                  }
                  to="categories"
                >
                  Categories
                </NavLink>
              </li>
            </ul>
            {authData.token ? (
              <ul className="d-flex list-unstyled  aligns-item-center flex-wrap flex-lg-nowrap mt-4 mt-lg-0 gap-4 m-0 p-0">
                <li>
                  <Link
                    to="allorders"
                    className="nav-link text-decoration-none position-relative"
                    aria-label="all orders"
                  >
                    <i className="ri-truck-line text-success fs-1"></i>
                  </Link>
                </li>
                <li>
                  <Link to="wishlist" className="nav-link text-decoration-none" aria-label="wishlist">
                    <div className="icon-wrapper position-relative">
                      <i className="ri-heart-line text-success fs-1"></i>
                      <span className="badge bg-danger  text-white   position-absolute">
                        {numberOfWishlist}
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="nav-link text-decoration-none position-relative"
                    aria-label="cart"
                  >
                    <div className="icon-wrapper">
                      {" "}
                      <i className="ri-shopping-cart-2-line text-success fs-1"></i>
                      <span className="badge bg-danger  text-white position-absolute">
                        {allProductCount}
                      </span>{" "}
                    </div>
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
                        Sign Out <i className="ri-arrow-right-line"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item transition settings"
                        href="#"
                      >
                        Settings <i className="ri-equalizer-line"></i>
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
