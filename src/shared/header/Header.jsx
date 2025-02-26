import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
function Header() {
  const [bgHeader, setBgHeader] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBgHeader("bg-white");
      } else {
        setBgHeader("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })
  return (
    <header className={`header transition position-fixed ${bgHeader === "bg-white"? "bg-white": ""}`}>
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
                <Link className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Categories</Link>
              </li>
            </ul>
            <Link to="/login" className="btn btn-outline-success">Sign in / Sign up</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
