import React from "react";
import "./HeroInfo.css";
import sliderOne from "../../assets/images/slider-image-1.webp";
import sliderTwo from "../../assets/images/slider-image-2.webp";
import sliderThree from "../../assets/images/slider-image-3.webp";
import HeroInfoSlider from "../slider/HeroInfoSlider";
import ShopCard from "./ShopCard";
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
        <div className="row">
          <div className="col-12 col-xl-8 mt-3">
            <HeroInfoSlider
              images={[sliderOne, sliderTwo, sliderThree]}
              infoOurProducts={infoOurProducts}
            />
          </div>
          <div className="col-12 col-xl-4 shopNow align-items-stretch  d-flex flex-column flex-lg-row flex-xl-column gap-3 gap-xl-2 mt-3">
            <ShopCard
              title="10% cashback on personal care"
              description="Max cashback: $12"
              code="CARE12"
              buttonText="Shop Now"
              link="ourProducts"
            />
            <ShopCard
              title="Say yes to season’s fresh"
              description="Max cashback: $12"
              code="FRESH20"
              buttonText="Shop Now"
              link="ourProducts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroInfo;
