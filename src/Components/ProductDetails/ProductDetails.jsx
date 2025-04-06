import React, { useEffect, useMemo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsSelectors } from "../../reducers/ProductsSlice";
import ReviewProduct from "../review/ReviewProduct";
import { addProductsToCart } from "../../network/CartApi";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { cartSelectors } from "../../reducers/CartSlice";
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";

function ProductDetails() {
  const addProductToCartloadingIds = useSelector(
    (state) => state.cart.addProductToCartloadingIds
  );
  const { id } = useParams();
  const productInfo = useSelector((state) =>
    productsSelectors.selectById(state, id)
  );
  const productItem = useSelector((state) =>
    cartSelectors.selectById(state, id)
  );
  console.log(productItem);
  const [currentDisplayImage, setCurrentDisplayImage] = useState(
    productInfo.imageCover
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle rating product reviews.
  const fullStar = Math.floor(productInfo.ratingsAverage);
  const halfStar = productInfo.ratingsAverage % 1 >= 0.5;
  const emptystar = 5 - fullStar - halfStar;

  // handle Loading
  const isLoading = useMemo(
    () => addProductToCartloadingIds.includes(id),
    [id, addProductToCartloadingIds]
  );
  const changeProductImage = (e) => {
    if (e.target.tagName === "IMG") {
      setCurrentDisplayImage(e.target.src);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);
  const handleAddToCart = async () => {
    try {
      const action = await dispatch(addProductsToCart(id)).unwrap();
      toast.success(action?.message, {
        position: "top-center",
      });
    } catch (err) {
      navigate("/login");
      setTimeout(() => {
        toast.error(err?.message || "Something went wrong", {
          position: "top-center",
        });
      }, 500);
    }
  };
  return (
    <section className="product-details mt-all py-5">
      <ToastContainer />
      <div className="container  w-100 d-flex align-items-center justify-content-center">
        <div className="row w-100  align-items-start ">
          <div className="col-12 py-4 align-self-center flex-lg-row flex-column   col-lg-6 product-images">
            <div className="shadow rounded-3">
              <TransformWrapper>
                <TransformComponent className="w-100">
                  <img
                    src={currentDisplayImage}
                    alt={productInfo.title}
                    className="w-100 rounded-3 base-image "
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className="product-collection d-flex mt-3">
              {productInfo.length > 1 && productInfo.images.slice(0, 4).map((image, i) => (
                <div
                  key={i + 1}
                  className="mt-2 border  border-success"
                  onClick={changeProductImage}
                >
                  <img className="img-fluid" src={image} alt="product-image" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 p-md-3 p-xl-5  flex-lg-row  flex-column    col-lg-6 product-description">
            <h5 className="text-success fs-6">{productInfo.title}</h5>
            <p  className="mt-4 text-muted">{productInfo.description}</p>
            <ReviewProduct
              product={productInfo}
              fullStar={fullStar}
              halfStar={halfStar}
              emptystar={emptystar}
            />
            <div className="price fs-5 py-4 border-2 border-bottom mt-4 d-flex justify-content-between align-items-center">
              {productInfo.priceAfterDiscount ? (
                <div className="d-flex align-items-center">
                  <p className="text-danger fw-bold me-1 m-0">
                    ${productInfo.priceAfterDiscount}
                  </p>
                  <p className="text-secondary text-decoration-line-through fw-small me-1 m-0">
                    ${productInfo.price}
                  </p>
                </div>
              ) : (
                <span className="text-danger fw-bold me-1">
                  ${productInfo.price}
                </span>
              )}
              <span
                className={`stock fw-medium ${
                  productInfo.quantity > 0 ? "text-success" : "text-danger"
                }`}
              >
                {productInfo.quantity > 0 ? "IN STOCK" : "Out Of Stock"}
              </span>
            </div>

            <div className="addCard border-2 border-bottom d-flex flex-column gap-4  justify-content-start   py-4 border-2 border-bottom">
              <div className="d-flex gap-2  align-items-center">
                <button
                  data-bs-custom-class="custom-tooltip"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="You can add multiple items by clicking repeatedly"
                  onClick={handleAddToCart}
                  className="btn transition btn-success fs-5  fw-bold w-100 rounded-2 add-to-cart d-flex justify-content-center gap-2 align-items-center"
                >
                  <i className="ri-shopping-cart-2-line me-2"></i>
                  Add To Cart{" "}
                  {isLoading && <PulseLoader color="#69ca46" size={10} />}
                </button>
                <button
                  title="wishList"
                  className="wishList btn border-0 fs-5  shadow-sm transition"
                >
                  <i class="ri-heart-line"></i>
                </button>
              </div>
            </div>

            <table className="mt-5 w-100 text-muted fs-6">
              <tbody>
                <tr>
                  <td>Sold: </td>
                  <td>{productInfo.sold}</td>
                </tr>

                <tr>
                  <td>Available in stock: </td>
                  <td>{productInfo.quantity}</td>
                </tr>
                <tr>
                  <td>Brand: </td>
                  <td>{productInfo.brand.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
