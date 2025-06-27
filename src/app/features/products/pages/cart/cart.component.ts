import { Component, computed, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { updateCartItem, clearCart } from '../../store/products.actions';
import { selectCart, selectProducts } from '../../store/products.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemCardComponent, AsyncPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnDestroy {
  private store = inject(Store);
  cart$ = this.store.select(selectCart);
  products$ = this.store.select(selectProducts);
  totalPrice = 0;
  productsMap: { [id: string]: any } = {};
  private destroy$ = new Subject<void>();

  constructor() {
    this.products$.pipe(takeUntil(this.destroy$)).subscribe((products) => {
      this.productsMap = {};
      products.forEach((p) => (this.productsMap[p.id] = p));
    });
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe((cart) => {
      this.totalPrice = cart.reduce((total, item) => {
        const product = this.productsMap[item.productId];
        return total + (product ? product.price * item.quantity : 0);
      }, 0);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
