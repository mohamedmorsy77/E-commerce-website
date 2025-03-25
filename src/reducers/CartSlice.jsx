import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  addProductsToCart,
  deleteAllProduct,
  deleteProduct,
  updateProduct,
} from "../network/CartApi";

export const cartAdapter = createEntityAdapter({
  selectId: (product) => product.product,
});

//
function sumAllProductCount(newProduct) {
  const newProductCount = newProduct.reduce((acc, curr) => acc + curr.count, 0);
  return newProductCount;
}

export function removeLoadingIds(loadingIds, actionId) {
  return loadingIds.filter((id) => id !== actionId);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState({
    error: null,
    cartInfo: {},
    allProductCount: 0,
    addProductToCartloadingIds: [],
    updateCartLoadingIds: [],
    deleteCartLoadingIds: [],
    loading: false,
  }),
  reducers: {
    updateProductCount: (state, action) => {
      console.log(action);
      const { productId, newCount } = action.payload;
      cartAdapter.updateOne(state, {
        id: productId,
        changes: { count: newCount },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductsToCart.pending, (state, action) => {
        state.addProductToCartloadingIds.push(action.meta.arg);
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductsToCart.fulfilled, (state, action) => {
        state.addProductToCartloadingIds = removeLoadingIds(
          state.addProductToCartloadingIds,
          action.meta.arg
        );

        const newProduct = action.payload?.data?.products || [];

        state.loading = false;
        state.error = null;
        cartAdapter.setAll(state, newProduct);
        state.cartInfo = action.payload || {};

        const newProductCount = sumAllProductCount(newProduct);
        state.allProductCount = newProductCount;
      })
      .addCase(addProductsToCart.rejected, (state, action) => {
        state.addProductToCartloadingIds = removeLoadingIds(
          state.addProductToCartloadingIds,
          action.meta.arg
        );
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Update Product
      .addCase(updateProduct.pending, (state, action) => {
        state.updateCartLoadingIds.push(action.meta.arg.productId);
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updateCartLoadingIds = removeLoadingIds(
          state.updateCartLoadingIds,
          action.meta.arg.productId
        );
        const newProduct = action.payload.data.products;
      
      
        const updateProductAccordingToCount = newProduct.map((product) => ({
          id: product._id,
          changes: { count: product.count },
        }));

        cartAdapter.updateMany(state, updateProductAccordingToCount);
       
        state.cartInfo = action.payload;
        const newProductCount = sumAllProductCount(newProduct);
        state.allProductCount = newProductCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateCartLoadingIds = removeLoadingIds(
          state.updateCartLoadingIds,
          action.meta.arg.productId
        );
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      // Delete Product according to specific id
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteCartLoadingIds.push(action.meta.arg);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const newProduct = action.payload.data.products;
        const newProductCount = sumAllProductCount(newProduct);
        state.allProductCount = newProductCount;
        state.deleteCartLoadingIds = removeLoadingIds(
          state.deleteCartLoadingIds,
          action.meta.arg
        );
        const productId = action.meta.arg;
        cartAdapter.removeOne(state, productId);
        state.cartInfo = action.payload;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteCartLoadingIds = removeLoadingIds(
          state.deleteCartLoadingIds,
          action.meta.arg
        );
        state.error = action.payload;
        state.loading = false;
      })
      // Delete All Product
      .addCase(deleteAllProduct.pending, (state, action) => {
        console.log(action);
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllProduct.fulfilled, (state, action) => {
        state.allProductCount = 0;
        cartAdapter.removeAll(state);
        state.cartInfo.numOfCartItems = 0;
        state.cartInfo.data.totalCartPrice = 0;

        state.loading = false;
      })
      .addCase(deleteAllProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Selectors

export const cartSelectors = cartAdapter.getSelectors((state) => state.cart);
export const { updateProductCount } = cartSlice.actions;
export { addProductsToCart, updateProduct, deleteProduct, deleteAllProduct };
export default cartSlice.reducer;
