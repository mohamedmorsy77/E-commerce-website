import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../network/BrandsApi";
import { brandsSelectors } from "../../reducers/BrandsSlice";
import "./Brands.css";
import Loading from "../spinner/loading/Loading";
import { useNavigate } from "react-router-dom";
import BrandCard from "./BrandCard";
function Brands() {
  const brands = useSelector(brandsSelectors.selectAll);
  const { loading } = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  return (
    <section className="brands p-5 mt-all">
      <div className="container">
        <div className="row">
          <h1 className="text-success">All Brands</h1>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row mt-5">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand}  onClick={() => navigate(`/specificBrand/${brand["_id"]}`)}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Brands;
