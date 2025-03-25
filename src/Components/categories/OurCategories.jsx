import React from "react";
import { categoriesSelectors } from "../../reducers/CategoriesSlice";
import Loading from "../spinner/loading/Loading";
import { useSelector } from "react-redux";
import CategoriesCard from "./CategoriesCard";
import { useNavigate } from "react-router-dom";
function OurCategories() {
  const navigate = useNavigate()  
  const categories = useSelector(categoriesSelectors.selectAll);
  const { loading } = useSelector((state) => state.categories);
  return (
    <section className="categories mt-all p-5">
      <div className="container">
        <h1 className="mb-4 text-success">All Categories</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {categories.map((category) => (
              <CategoriesCard key={category["_id"]} category={category} onClick= {() => navigate(`/specificCategory/${category["_id"]}`)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default OurCategories;
