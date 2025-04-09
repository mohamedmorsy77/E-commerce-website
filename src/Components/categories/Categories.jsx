import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../network/CategoriesApi";
import { categoriesSelectors } from "../../reducers/CategoriesSlice";
import CategoriesCard from "./CategoriesCard";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import "./Categories.css";
function Categories() {

  const categories = useSelector(categoriesSelectors.selectAll);
  const { loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return (
    <section className="categories py-5">
      <div className="container p-0">
        <div className="row m-0 mb-4">
          <div className="col-12">
            <h3 className="text-success fw-medium mb-4">
              Shop Popular Categories
            </h3>
          </div>
        </div>

        <div className="row m-0">
          {loading
            ? Array.from({ length: categories.length }).map((_, i) => (
                <SkeletonCard key={i + 1} />
              ))
            : categories.map((category, index) => (
                <CategoriesCard key={category["_id"]} category={category} index={index}/>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
