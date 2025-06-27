import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsLoading,
} from '../../store/products.selectors';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../store/products.reducer';
import { FormsModule } from '@angular/forms';
import { addToCart } from '../../store/products.actions';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductModalComponent,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private store = inject(Store);
  products$ = this.store.select(selectProducts);
  loading$ = this.store.select(selectProductsLoading);

  selectedProduct: Product | null = null;
  amount: number = 1;

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.amount = product.minOrderAmount;
  }

  closeModal() {
    this.selectedProduct = null;
  }

  addToCart(product: Product, amount: number) {
    this.store.dispatch(
      addToCart({ item: { productId: product.id, quantity: amount } })
    );
    this.closeModal();
  }
}
