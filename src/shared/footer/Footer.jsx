import React from "react";
import { footer } from "../FooterData";
import amazonPay from '../../assets/images/amazonpay.svg';
import americanExpress from '../../assets/images/american-express.svg';
import mastercard from '../../assets/images/mastercard.svg';
import paypal from '../../assets/images/paypal.svg';
import visa from '../../assets/images/visa.svg';
import appleStore from '../../assets/images/appstore-btn.svg';
import googlePlay from '../../assets/images/googleplay-btn.svg';
import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer position-relative py-3">
      <div className="container">
        <div className="d-grid m-0 p-0 brd-bottom ">
          {footer.map(({ title, text }, index) => (
            <div key={index + 1} className="flex-grow-1 text-center text-md-start   mt-5 ">
              <h6 className="heading-color fw-bold">{title}</h6>
              <ul className="list-unstyled mt-4 info">
                {text.map(({ list }, index) => (
                  <li className="mt-3"  key={index + 1}><Link className="transition  text-decoration-none">{list}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-2"></div>
          <div className="col-2"></div>
        </div>
        <div className="row py-4 brd-bottom m-0 align-items-center">
          <div className="col-12 col-xl-5">
              <ul className="list-unstyled m-0 d-flex gap-2 align-items-center justify-content-center justify-content-md-start">
                <li className="fw-bold">Payment Partners</li>
                <li className="fw-bold"><Link aria-label="amazon pay"><img height={28} width={44} src={amazonPay} alt="amazonPay" /></Link></li>
                <li className="fw-bold"><Link aria-label="american express"><img height={28} width={44} src={americanExpress} alt="americanExpress" /></Link></li>
                <li className="fw-bold"><Link aria-label="mastercard"><img height={28} width={44} src={mastercard} alt="mastercard" /></Link></li>
                <li className="fw-bold"><Link aria-label="paypal"><img height={28} width={44} src={paypal} alt="paypal" /></Link></li>
                <li className="fw-bold"><Link aria-label="visa"><img height={28} width={44} src={visa} alt="visa" /></Link></li>
              </ul>
          </div>
          <div className="col-12 col-xl-7 d-flex flex-column flex-md-row align-items-center justify-content-start mt-4 mt-xl-0 justify-content-xl-end gap-3">
            <p className="m-0 fw-medium">Get deliveries with FreshCart</p>
            <ul className="m-0 list-unstyled d-flex align-items-center gap-2">
              <li className="fw-bold"><Link aria-label="apple store" className="nav-link text-secondary text-decoration-none"><img src={appleStore} alt="appleStore" /></Link></li>
              <li className="fw-bold"><Link aria-label="google play" className="nav-link text-secondary text-decoration-none"><img src={googlePlay} alt="googlePlay" /></Link></li>
  
            </ul>

          </div>
        </div>
        <div className="row m-0 py-3">
         <div className="col-12 col-lg-8">
            <span className="copy-right text-dark">
            © 2022 - 2025 FreshCart eCommerce HTML Template. All rights reserved. Powered by<br/>
            <Link className="nav-link text-success text-secondary text-decoration-none" to="https://codescandy.com/">Codescandy.</Link>
            </span>
         </div>
         <div className="col-12 col-lg-4">
            <ul className="list-inline m-0 mt-3 mt-lg-0 d-flex gap-2 align-items-center justify-content-start justify-content-lg-end social">
              <li className="text-dark me-4">Follow us on</li>
              <li className="list-inline-item  d-flex align-items-center justify-content-center"><Link aria-label="facebook" className="nav-link transition rounded-2  px-2 py-1 text-decoration-none" to="#"><i className="ri-facebook-circle-fill"></i></Link></li>
              <li className="list-inline-item d-flex align-items-center justify-content-cente "><Link aria-label="twitter" className="nav-link transition  rounded-2  text-decoration-none d-flex align-items-center px-2 py-1 justify-content-center" to="#"><i className="ri-twitter-fill"></i></Link></li>
              <li className="list-inline-item d-flex align-items-center justify-content-cente"><Link aria-label="instagram" className="nav-link transition  rounded-2  text-decoration-none d-flex align-items-center px-2 py-1 justify-content-center" to="#"><i className="ri-instagram-line"></i></Link></li>
            </ul>
         </div>
        </div>
      </div>
     
    </footer>
  );
}

export default Footer;