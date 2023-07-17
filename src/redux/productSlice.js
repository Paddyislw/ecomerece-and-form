import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (arg) => {
    const response = await fetch(
      arg.currentTab === "all"
        ? `https://fakestoreapi.com/products?sort=${arg.sort}`
        : arg.currentTab === "men"
        ? `https://fakestoreapi.com/products/category/men's clothing?sort=${arg.sort}`
        : `https://fakestoreapi.com/products/category/women's clothing?sort=${arg.sort}`
    );
    const data = response.json();
    return data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const data = response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    cart: [],
    total: 0,
    data: [],
    products: [],
    currentProduct: {},
    statusAllProducts: "",
    statusSingleProduct: "",
  },
  reducers: {
    deleteProducts: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },
    addToFavorites: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          return { ...item, favorite: true };
        } else return item;
      });
    },
    removeFromFavorites: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload) {
          return { ...item, favorite: false };
        } else return item;
      });
    },
    addProducts: (state, action) => {
      if (state.cart.length === 0) {
        state.cart = [{ ...action.payload, count: 1 }];
      } else {
        const includeInCart = state.cart.some(
          (item) => item?.id === action.payload.id
        );
        if (includeInCart) {
          state.cart = state.cart.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, count: item.count + 1 };
            } else {
              return item;
            }
          });
        } else {
          state.cart = [...state.cart, { ...action.payload, count: 1 }];
        }
      }
    },
    removeProducts: (state, action) => {
      if (state.cart.length !== 0) {
        if (action.payload.count === 1) {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          state.cart = state.cart.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, count: item.count - 1 };
            } else {
              return item;
            }
          });
        }
      }
    },
  },
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      state.statusAllProducts = "loading";
    },
    [fetchSingleProduct.pending]: (state, action) => {
      state.statusSingleProduct = "loading";
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.statusAllProducts = "success";
      state.products = action.payload
        .filter((item) => {
          if (item.category === "electronics" || item.category === "jewelery") {
            return false;
          } else return true;
        })
        .map((item) => ({ ...item, favorite: false }));
    },
    [fetchSingleProduct.fulfilled]: (state, action) => {
      state.statusSingleProduct = "success";
      state.currentProduct = action.payload;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.statusAllProducts = "error";
    },
    [fetchSingleProduct.rejected]: (state, action) => {
      state.statusSingleProduct = "error";
    },
  },
});

export const {
  addProducts,
  removeProducts,
  addToFavorites,
  removeFromFavorites,
  deleteProducts
} = productSlice.actions;

export const selectAllProducts = (state) => state.products;
export const selectStatusAllProducts = (state) => state.statusAllProducts;
export const selectCurrentProduct = (state) => state.currentProduct;
export const selectStatusCurrentProduct = (state) => state.statusSingleProduct;
export const selectCartItems = (state) => state.cart;
export const selectTotal = (state) => state.total;
