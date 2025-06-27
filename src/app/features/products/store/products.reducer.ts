import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';

export interface Product {
  id: string;
  name: string;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
  price: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ProductsState {
  loading?: boolean;
  products: Product[];
  cart: CartItem[];
}

export const initialState: ProductsState = {
  loading: false,
  products: [],
  cart: [],
};

export const productsReducer = createReducer(
  initialState,

  on(ProductActions.fetchProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.fetchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductActions.addToCart, (state, { item }) => {
    const existing = state.cart.find((ci) => ci.productId === item.productId);
    let cart;
    let products = state.products.map((p) =>
      p.id === item.productId
        ? { ...p, availableAmount: p.availableAmount - item.quantity }
        : p
    );
    if (existing) {
      cart = state.cart.map((ci) =>
        ci.productId === item.productId
          ? { ...ci, quantity: ci.quantity + item.quantity }
          : ci
      );
    } else {
      cart = [...state.cart, item];
    }
    return { ...state, cart, products };
  }),

  on(ProductActions.addManyToCart, (state, { items }) => {
    let cart = [...state.cart];
    let products = [...state.products];

    items.forEach((item) => {
      // Decrease
      products = products.map((p) =>
        p.id === item.productId
          ? { ...p, availableAmount: p.availableAmount - item.quantity }
          : p
      );

      // Add or update cart item
      const existing = cart.find((ci) => ci.productId === item.productId);
      if (existing) {
        cart = cart.map((ci) =>
          ci.productId === item.productId
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        );
      } else {
        cart = [...cart, item];
      }
    });

    return { ...state, cart, products };
  }),

  //   (set quantity)
  on(ProductActions.updateCartItem, (state, { item }) => {
    // Find previous quantity in cart
    const prevCartItem = state.cart.find(
      (ci) => ci.productId === item.productId
    );
    const prevQuantity = prevCartItem ? prevCartItem.quantity : 0;
    const diff = item.quantity - prevQuantity;

    // Update quantity
    const cart = state.cart.map((ci) =>
      ci.productId === item.productId ? { ...ci, quantity: item.quantity } : ci
    );

    // Update availableAmount
    const products = state.products.map((p) =>
      p.id === item.productId
        ? { ...p, availableAmount: p.availableAmount - diff }
        : p
    );

    return { ...state, cart, products };
  }),

  on(ProductActions.removeFromCart, (state, { productId }) => ({
    ...state,
    cart: state.cart.filter((ci) => ci.productId !== productId),
  })),

  on(ProductActions.clearCart, (state) => {
    // Restore availableAmount for each product in the cart
    const products = state.products.map((product) => {
      const cartItem = state.cart.find((ci) => ci.productId === product.id);
      if (cartItem) {
        return {
          ...product,
          availableAmount: product.availableAmount + cartItem.quantity,
        };
      }
      return product;
    });
    return {
      ...state,
      cart: [],
      products,
    };
  })
);
