import { createAction, props } from '@ngrx/store';
import { ProductsActionTypes } from './products.action-types';
import { Product } from './products.reducer';

export interface CartItem {
  productId: string;
  quantity: number;
}

export const fetchProducts = createAction(ProductsActionTypes.FetchProducts);

export const fetchProductsSuccess = createAction(
  ProductsActionTypes.FetchProductsSuccess,
  props<{ products: Product[] }>()
);

export const addToCart = createAction(
  ProductsActionTypes.AddToCart,
  props<{ item: CartItem }>()
);

export const addManyToCart = createAction(
  ProductsActionTypes.AddManyToCart,
  props<{ items: CartItem[] }>()
);

export const clearCart = createAction(ProductsActionTypes.ClearCart);

export const updateCartItem = createAction(
  ProductsActionTypes.UpdateCartItem,
  props<{ item: { productId: string; quantity: number } }>()
);

export const removeFromCart = createAction(
  ProductsActionTypes.RemoveFromCart,
  props<{ productId: string }>()
);
