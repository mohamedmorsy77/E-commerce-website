// import {  configureStore } from "@reduxjs/toolkit";
// import authSlice from "../reducers/AuthSlice";
// import categoriesSlice from "../reducers/CategoriesSlice";
// import productSlice from "../reducers/ProductsSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     categories: categoriesSlice,
//     products: productSlice,

//   },
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/AuthSlice";
import categoriesSlice from "../reducers/CategoriesSlice";
import productSlice from "../reducers/ProductsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import brandsSlice from "../reducers/BrandsSlice";
import cartSlice from "../reducers/CartSlice";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import wishlistSlice from "../reducers/WishlistSlice";
import orderSlice from "../reducers/OrderSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["categories", "products", "brands", "cart", "wishlist", "orders"],
  blacklist: ["searchQuery", "orderId", "sessionUrl"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  categories: categoriesSlice,
  products: productSlice,
  brands: brandsSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  orders: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
export const persistedStore = persistStore(store);
