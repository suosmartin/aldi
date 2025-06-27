import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  activePage: string = 'products';
  menus: { label: string; url: string; active: boolean; disabled: boolean }[] =
    [];
  ngOnInit() {
    this.menus = [
      {
        label: 'Products',
        url: '/products',
        active: false,
        disabled: false,
      },
      {
        label: 'Cart',
        url: '/products/cart',
        active: false,
        disabled: false,
      },
    ];
    this.activePage = this.router.url.endsWith('/cart')
      ? '/products/cart'
      : '/products';
    this.menus.forEach((menu) => {
      menu.active = menu.url === this.router.url;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.url.endsWith('/cart')
          ? '/products/cart'
          : '/products';
        this.menus.forEach((menu) => {
          menu.active = menu.url === event.url;
        });
      }
    });
  }
}
