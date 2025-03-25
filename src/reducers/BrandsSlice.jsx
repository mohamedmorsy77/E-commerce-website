import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "../network/BrandsApi";

export const BrandsAdapter = createEntityAdapter({
  selectId: (brand) => brand["_id"],
//  
});

export const brandsSlice = createSlice({
  name: "brands",
  initialState: BrandsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        BrandsAdapter.setAll(state,action.payload.data)
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading= false;
        state.error = action.payload.message
      });
  },
});

// Selectors
 
export const brandsSelectors = BrandsAdapter.getSelectors((state) => state.brands);
export {fetchBrands}
export default brandsSlice.reducer;
