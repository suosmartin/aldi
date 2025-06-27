import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCart, selectProducts } from '../../store/products.selectors';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { clearCart, updateCartItem } from '../../store/products.actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  imports: [
    CartItemCardComponent,
    CurrencyPipe,
    AsyncPipe,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.scss',
})
export class CartSidebarComponent {
  private store = inject(Store);
  cart$ = this.store.select(selectCart);
  products$ = this.store.select(selectProducts);
  totalPrice = 0;
  productsMap: { [id: string]: any } = {};

  constructor() {
    this.products$.subscribe((products) => {
      this.productsMap = {};
      products.forEach((p) => (this.productsMap[p.id] = p));
    });
    this.cart$.subscribe((cart) => {
      this.totalPrice = cart.reduce((total, item) => {
        const product = this.productsMap[item.productId];
        return total + (product ? product.price * item.quantity : 0);
      }, 0);
    });
  }
  onQuantityChange(productId: string, quantity: number) {
    this.store.dispatch(updateCartItem({ item: { productId, quantity } }));
  }
  onRemoveItem(productId: string) {
    this.store.dispatch(updateCartItem({ item: { productId, quantity: 0 } }));
  }
  clearCart() {
    this.store.dispatch(clearCart());
  }
}
