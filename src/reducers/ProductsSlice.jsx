import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../network/ProductApi";

export const productsAdapter = createEntityAdapter({
  selectId: (product) => product["_id"],
  sortComparer: (a, b) => a.price - b.price,
});

export const productSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    loading: false,
    error: null,
    metaData: {},
    currentpage: ""
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {

        state.loading = false;
        state.error = null;
        state.currentpage = action.payload.metadata?.currentPage;
        productsAdapter.addMany(state, action.payload.data);
        state.metaData = action.payload.metadata;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

// Selectors

export const productsSelectors = productsAdapter.getSelectors(
  (state) => state.products
);
export { fetchProducts };
export default productSlice.reducer;
