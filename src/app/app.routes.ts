import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./core/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/products/pages/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/test-content' },
];
