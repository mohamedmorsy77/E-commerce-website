import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Categories.css";
import { fetchCategories } from "../../network/CategoriesApi";
import { categoriesSelectors } from "../../reducers/CategoriesSlice";
import Loading from "../spinner/loading/Loading";
import CategoriesCard from "./CategoriesCard";
function Categories() {
  const categories = useSelector(categoriesSelectors.selectAll);
  const { loading } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="categories py-5">
      <div className="container">
        <div className="row m-0 mb-4">
          <div className="col-12">
            <h3 className="text-success fw-medium mb-4">
              Shop Popular Categories
            </h3>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row m-0">
            {categories.map((category) => (
              <CategoriesCard key={category["_id"]} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;
