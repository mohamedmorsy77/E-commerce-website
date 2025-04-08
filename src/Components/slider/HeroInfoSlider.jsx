import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function HeroInfoSlider({ images, infoOurProducts }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="slider-container h-100">
      <Slider {...settings} className=" h-100">
        {images.map((image, index) => {
          const infoProduct = infoOurProducts[index]; 
          return (
            <div key={`slide-${index}`} className={`position-relative image-${index + 1}  rounded-4 h-100`}>
              {infoProduct && (
                <div className="info  d-flex flex-column gap-2 p-5">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-5 text-muted">Exclusive Offer</span>
                    <span className="d-flex align-items-center justify-content-center px-3 py-1 bg-danger ms-2 text-white fw-bold">
                      {infoProduct.offer}
                    </span>
                  </div>
                  <h2 className="text-dark mt-3">{infoProduct.title}</h2>
                  <p className="fw-medium fs-5">
                    Only this week... Don’t miss out!
                  </p>
                  <div>
                    <span className="fw-medium fs-5">
                      Start from{" "}
                      <span className="fw-bold fs-3 text-success">
                        {infoProduct.price}
                      </span>
                    </span>
                  </div>
                  <Link
                    to="/"
                    className="d-flex align-items-center justify-content-center px-3 py-2 text-decoration-none btn btn-success mt-4 fw-bold"
                  >
                    <span className="fs-5">{infoProduct.linkInfo}</span>
                    <i className="ri-arrow-right-line fs-5 mt-1 ms-2"></i>
                  </Link>
                </div>
              )}
             
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HeroInfoSlider;
