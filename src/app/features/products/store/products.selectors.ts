import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectTestState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(selectTestState, (state) => {
  return state.products;
});
export const selectProductsLoading = createSelector(
  selectTestState,
  (state) => {
    return state.loading;
  }
);
export const selectCart = createSelector(selectTestState, (state) =>
  state.cart.filter((item) => item.quantity > 0)
);

export const selectCartTotalItems = createSelector(selectCart, (cart) =>
  cart.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCart,
  selectProducts,
  (cart, products) =>
    cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? total + product.price * item.quantity : total;
    }, 0)
);
