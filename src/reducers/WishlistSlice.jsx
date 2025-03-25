import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "../network/Wishlist";
import { removeLoadingIds } from "./CartSlice";
export const wishlistAdapter = createEntityAdapter({
  selectId: (wishlist) => wishlist,
});

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistAdapter.getInitialState({
    numberOfWishlist: 0,
    error: null,
    active: false,
    wishlistLoadingIds: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToWishlist.pending, (state, action) => {
        state.wishlistLoadingIds.push(action.meta.arg);
        state.active = true;
        state.error = null;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.wishlistLoadingIds = removeLoadingIds(
          state.wishlistLoadingIds,
          action.meta.arg
        );
        wishlistAdapter.setAll(state, action.payload.data);
        state.numberOfWishlist = action.payload.data.length;
        state.active = false;
        state.error = null;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.wishlistLoadingIds = removeLoadingIds(
          state.wishlistLoadingIds,
          action.meta.arg
        );
        state.active = false;
        state.error = action.payload;
      })
      // Delete Product From Wishlist
      .addCase(deleteProductFromWishlist.pending, (state, action) => {
        state.wishlistLoadingIds.push(action.meta.arg);
        state.error = null;
      })
      .addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
        state.wishlistLoadingIds = removeLoadingIds(
          state.wishlistLoadingIds,
          action.meta.arg
        );

        wishlistAdapter.setAll(state, action.payload.data);
        state.numberOfWishlist = action.payload.data.length;
        state.error = null;
      })
      .addCase(deleteProductFromWishlist.rejected, (state, action) => {
        state.wishlistLoadingIds = removeLoadingIds(
          state.wishlistLoadingIds,
          action.meta.arg
        );
        state.error = action.payload;
      });
  },
});

export const wishListSelectors = wishlistAdapter.getSelectors(
  (state) => state.wishlist
);

export { addProductToWishlist, deleteProductFromWishlist };
export default wishlistSlice.reducer;
