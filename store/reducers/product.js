import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/product";
import Product from "../../models/product";
import { ActivityIndicatorComponent } from "react-native";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.id,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pId
      );
      const updatedProduct = new Product(
        action.pId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pId
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] === updatedProduct;
      return {
        ...state,
        availableProducts: updateAvailableProducts,
        userProducts: updateUserProducts,
      };
      return {
        ...state,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pId
        ),
      };
  }
  return state;
};
