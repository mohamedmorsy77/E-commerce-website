import React from "react";
import "./HeroInfo.css";
import sliderOne from "../../assets/images/slider-image-1.webp";
import sliderTwo from "../../assets/images/slider-image-2.webp";
import sliderThree from "../../assets/images/slider-image-3.webp";
import HeroInfoSlider from "../slider/HeroInfoSlider";
import { Link } from "react-router-dom";
function HeroInfo() {
  const infoOurProducts = [
    {
      offer: "30%",
      title: "Best Online Deals, Free Stuff",
      price: "$15.73",
      linkInfo: "Get Best Deal",
    },
    {
      offer: "20%",
      title: "Chocozay wafer-rolls Deals",
      price: "$53.33",
      linkInfo: "Shop deals now",
    },
    {
      offer: "15%",
      title: "Cokoladni Kolutici Lasta",
      price: "$5.33",
      linkInfo: "Shop this week offer",
    },

    // "title":"Only on this week... Don’t miss",
  ];
  return (
    <section className="hero-info py-5">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 col-xl-8 mt-3">
            <HeroInfoSlider
              images={[sliderOne, sliderTwo, sliderThree]}
              infoOurProducts={infoOurProducts}
            />
          </div>
          <div className="col-12 col-xl-4 shopNow  d-flex flex-column flex-lg-row flex-xl-column gap-3 gap-xl-2 mt-3">
            <div className="p-4 flex-grow-1 rounded-4">
              <h2 className="text-dark fs-2">10% cashback on<br/> personal care</h2>
              <p className="mt-3 fw-medium text-muted">Max cashback: $12</p>
              <span className="mt-3 text-muted fs-5">
                Code: <strong className="fs-4">CARE12</strong>
              </span>
              <Link className="mt-4 btn btn-dark fw-bold text-decoration-none d-block w-50">
                Shop Now
              </Link>
            </div>
            <div className="p-4 flex-grow-1 rounded-4">
              <h2 className="text-dark fs-2">Say yes to <br/> season’s fresh</h2>
              <p className="mt-3 fw-medium text-muted">Max cashback: $12</p>
              <span className="mt-3 text-muted fs-5">
              Refresh your day<br/>
              the fruity way
              </span>
              <Link className="mt-4 btn btn-dark fw-bold text-decoration-none d-block w-50">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroInfo;
