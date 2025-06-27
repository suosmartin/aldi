import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartSidebarComponent } from '../../features/products/components/cart-sidebar/cart-sidebar.component';
import { ProductsActionTypes } from '../../features/products/store/products.action-types';
import {
  selectProducts,
  selectCartTotalItems,
} from '../../features/products/store/products.selectors';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    CartSidebarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private store = inject(Store);
  private router = inject(Router);
  isMobile = window.innerWidth <= 900;
  products$ = this.store.select(selectProducts);
  cartTotalItems$ = this.store.select(selectCartTotalItems);

  ngOnInit() {
    this.store.dispatch({ type: ProductsActionTypes.FetchProducts });
    // this.products$.subscribe((products) => {
    //   if (!products || products.length === 0) {
    //     this.store.dispatch({ type: ProductsActionTypes.FetchProducts });
    //   }
    // });
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 1400;
  }
  get onCartPage() {
    return this.router.url.endsWith('/cart');
  }
}
