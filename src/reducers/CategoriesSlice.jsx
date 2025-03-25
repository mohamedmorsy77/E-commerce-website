import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../network/CategoriesApi";

export const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category["_id"],
//  
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        categoriesAdapter.setAll(state,action.payload.data)
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading= false;
        state.error = action.payload.message
      });
  },
});

// Selectors
 
export const categoriesSelectors = categoriesAdapter.getSelectors((state) => state.categories);
export {fetchCategories}
export default categoriesSlice.reducer;
