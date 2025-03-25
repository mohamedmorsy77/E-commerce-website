import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../network/ProductApi";
import { productsSelectors } from "../../reducers/ProductsSlice";
import Loading from "../spinner/loading/Loading";
import ProductsCard from "./ProductsCard";
import "./Products.css";
import Slider from "react-slick";

function BestSellerProducts() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // شاشات الموبايل
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const products = useSelector(productsSelectors.selectAll);
  const { loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const bestSellerProducts =
    products && products.filter((product) => product.sold > 8000);

  return (
    <section className="products best-seller-products py-5">
      <div className="container">
        <div className="row m-0 mb-3">
          <h3 className="text-success fw-medium">Bestsellers In Your Area</h3>
          <p className="text-secondary ">
            Find the bestseller products in your area with discount.
          </p>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row m-0">
            <div className="slider-container">
              <Slider {...settings}>
                {bestSellerProducts.map((product) => (
                  <ProductsCard
                    key={product["_id"]}
                    product={product}
                    slider={true}
                  />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BestSellerProducts;
