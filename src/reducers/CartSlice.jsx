import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  addProductsToCart,
  deleteAllProduct,
  deleteProduct,
  getCart,
  updateProduct,
} from "../network/CartApi";
import { createCashOrder, createOnlineCashOrder } from "../network/OrderApi";
import { logOut } from "./AuthSlice";

export const cartAdapter = createEntityAdapter({
  selectId: (product) => product.product,
});

//
function sumAllProductCount(newProduct) {
  const newProductCount = newProduct.reduce((acc, curr) => acc + curr.count, 0);
  return newProductCount;
}

function deleteAllInCart(state, cartAdapter) {
  state.allProductCount = 0;
  cartAdapter.removeAll(state);
  state.cartInfo.numOfCartItems = 0;
  state.cartInfo.data.totalCartPrice = 0;
  state.cartInfo = {};
}
export function removeLoadingIds(loadingIds, actionId) {
  return loadingIds.filter((id) => id !== actionId);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState({
    error: null,
    cartInfo: {},
    cartOwner: "",
    allProductCount: 0,
    addProductToCartloadingIds: [],
    updateCartLoadingIds: [],
    deleteCartLoadingIds: [],
    loading: false,
  
    sessionUrl: "",
  }),
  reducers: {
    updateProductCount: (state, action) => {
      const { productId, newCount } = action.payload;
      cartAdapter.updateOne(state, {
        id: productId,
        changes: { count: newCount },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut, (state) => {
        state.allProductCount = 0;
        state.cartOwner = "";
        state.cartInfo = {};
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const newProduct = action.payload?.data?.products || [];
        const cartProducts = newProduct.map((cart) => ({
          count: cart.count,
          _id: cart._id,
          product: cart.product.id,
          price: cart.price,
        }));
        state.cartInfo = action.payload;
        state.cartInfo.numOfCartItems = action.payload.numOfCartItems;
        state.cartInfo.data.totalCartPrice = action.payload.data.totalCartPrice;

        state.allProductCount = sumAllProductCount(newProduct);
        cartAdapter.setAll(state, cartProducts);
        state.loading = false;
       
        console.log(action.payload);
        state.cartOwner = action.payload.data?.cartOwner || "";
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
        state.cartOwner = action.payload.data?.cartOwner || "";

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
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllProduct.fulfilled, (state, action) => {
        deleteAllInCart(state, cartAdapter);
        state.loading = false;
      })
      .addCase(deleteAllProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //Create Orders
      .addCase(createCashOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCashOrder.fulfilled, (state, action) => {
        deleteAllInCart(state, cartAdapter);
        state.loading = false;
      })

      .addCase(createCashOrder.rejected, (state, action) => {
        state.loading = false;
      }) // Online Payment
      .addCase(createOnlineCashOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOnlineCashOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionUrl = action.payload.session.url;
        deleteAllInCart(state, cartAdapter);
        console.log(action.payload);
      })
      .addCase(createOnlineCashOrder.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors

export const cartSelectors = cartAdapter.getSelectors((state) => state.cart);
export const { updateProductCount } = cartSlice.actions;
export {
  getCart,
  addProductsToCart,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
  createCashOrder,
  createOnlineCashOrder,
};
export default cartSlice.reducer;
