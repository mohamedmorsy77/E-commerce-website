import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productsSelectors } from "../../reducers/ProductsSlice";
import ProductsCard from "./ProductsCard";
import AuthSpinner from "../spinner/authSpinner/AuthSpinner";
import { ToastContainer } from "react-toastify";

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const page = useSelector((state) => state.products.currentPage);
  const products = useSelector(productsSelectors.selectAll);
  console.log(products)
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

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
      <ToastContainer />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 d-flex gap-5 align-items-center">
            <h2 className="text-success">All Products</h2>
            <div className=" flex-grow-1">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Search by category..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-12 ">
            <nav aria-label="Page navigation example">
              <ul className="pagination m-0">
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
        {loading && <AuthSpinner />}
        <div className="row mt-3">
          {productsAfterSearch.length > 0 ? (
            productsAfterSearch.map((product) => (
              <ProductsCard key={product["_id"]} product={product} />
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
