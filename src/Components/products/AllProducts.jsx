import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productsSelectors } from "../../reducers/ProductsSlice";
import ProductsCard from "./ProductsCard";

import SkeletonCard from "../skeletonCard/SkeletonCard";

function AllProducts() {
  const storedPage = localStorage.getItem("currentPage");
  const storedSearchQuery = localStorage.getItem("searchQuery");

  const [currentPage, setCurrentPage] = useState(
    storedPage ? parseInt(storedPage) : 1
  );
  const [searchQuery, setSearchQuery] = useState(storedSearchQuery || "");


  const products = useSelector(productsSelectors.selectAll);

  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("searchQuery", searchQuery);
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch, searchQuery]);

  const handleChangePage = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  // Search By Category Name and product title
  const productsAfterSearch = useMemo(() => {
    return searchQuery
      ? [...products].filter((product) => {
          return (
            product.category.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      : currentPage === 1
      ? products.slice(0, 40)
      : products.slice(40);
  }, [products, searchQuery, currentPage]);

  return (
    <section className="allProducts products mt-all py-5">
     
      <div className="container p-0">
        <div className="row mt-4 m-0 overflow-hidden">
          <div className="col-12 d-flex justify-content-between gap-3 gap-sm-4 flex-column flex-sm-row align-items-center">
            <h2 className="text-success">All Products</h2>
            <div>
              <input
                type="text"
                className="form-control search transition "
                id="exampleFormControlInput1"
                placeholder="Search by category..."
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center m-0">
          <div className="col-12 ">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center justify-content-sm-start m-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={() => handleChangePage(currentPage - 1)}
                  >
                    <span aria-hidden="true">Previous</span>
                  </button>
                </li>
                {[1, 2].map((page) => (
                  <li
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                    key={page}
                  >
                    <button
                      className="page-link"
                      onClick={() => handleChangePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage >= 2 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleChangePage(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="row mt-3 m-0 overflow-hidden">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i + 1} />
            ))
          ) : productsAfterSearch.length > 0 ? (
            productsAfterSearch.map((product) => (
              <ProductsCard key={product?._id} product={product} />
            ))
          ) : (
            <h3 className="text-center p-3">No products found.</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
