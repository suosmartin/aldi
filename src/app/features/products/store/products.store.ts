import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { productsReducer } from './products.reducer';
import { ProductsEffects } from './products.effects';

export const productsStore = [
  provideState({ name: 'products', reducer: productsReducer }),
  provideEffects([ProductsEffects]),
];
