import React, { useMemo, useState } from "react";
import "./HeroInfo.css";
import sliderOne from "../../assets/images/slider-image-1.webp";
import sliderTwo from "../../assets/images/slider-image-2.webp";
import sliderThree from "../../assets/images/slider-image-3.webp";
import HeroInfoSlider from "../slider/HeroInfoSlider";
import ShopCard from "./ShopCard";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../reducers/ProductsSlice";
import SearchResultCard from "./SearchResultCard";
function HeroInfo() {
  const products = useSelector(productsSelectors.selectAll);
  const [showOption, setShowOption] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowOption(true);
  };

  const productFiltered = useMemo(() => {
    if(!searchQuery) {
      return []
    }
    const lowerCaseQuery = searchQuery.toLowerCase()
    return (
      searchQuery &&
      products.filter(
        (product) =>
          product.category.name
            .toLowerCase()
            .includes(lowerCaseQuery) ||
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.brand.name.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [products, searchQuery]);
  return (
    <section className="hero-info py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="search position-relative px-4 py-2 rounded-5 d-flex align-items-center gap-3">
              <i className="ri-search-line fs-3 fw-bold text-success"></i>
              <input
                onChange={handleSearch}
                type="text"
                value={searchQuery}
                placeholder="Search for a product, category, or Brand"
                className="flex-grow-1 bg-transparent border-0 outline-0 "
              />
              {showOption && searchQuery && (
                <div className="product-after-search  px-4 py-3 rounded-3 position-absolute w-100 overflow-y-scroll overflow-hidden">
                  {productFiltered.length > 0 ? (
                    productFiltered.map((product) => (
                      <SearchResultCard key={product._id} product={product} />
                    ))
                  ) : (
                    <p className="m-0 fw-medium text-center text-white">
                      No matching results found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
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
