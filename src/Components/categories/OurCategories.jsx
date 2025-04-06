import React from "react";
import { categoriesSelectors } from "../../reducers/CategoriesSlice";
import Loading from "../spinner/loading/Loading";
import { useSelector } from "react-redux";
import CategoriesCard from "./CategoriesCard";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../skeletonCard/SkeletonCard";
function OurCategories() {
  console.log("yes")
  const navigate = useNavigate();
  const categories = useSelector(categoriesSelectors.selectAll);
  const { loading } = useSelector((state) => state.categories);
  return (
    <section className="categories mt-all py-5 px-3">
      <div className="container">
        <h1 className="mb-4 text-success">All Categories</h1>

        <div className="row">
          {loading
            ? Array.from({ length: categories.length }).map((_, i) => (
                <SkeletonCard key={i + 1} />
              ))
            : categories.map((category) => (
                <CategoriesCard
                  key={category["_id"]}
                  category={category}
                  onClick={() =>
                    navigate(`/specificCategory/${category["_id"]}`)
                  }
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default OurCategories;
