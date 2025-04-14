import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../network/OrderApi";

export const orderAdapter = createEntityAdapter({
  selectId: (order) => order._id,
});
export const orderSlice = createSlice({
  name: "orders",
  initialState: orderAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
  
    builder
      
      //Get All Orders
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        orderAdapter.setAll(state, action.payload);
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderSelectors = orderAdapter.getSelectors(
  (state) => state.orders
);
export { getAllOrders };
export default orderSlice.reducer;
