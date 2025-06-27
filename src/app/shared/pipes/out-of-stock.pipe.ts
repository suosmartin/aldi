import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/products/store/products.reducer';

@Pipe({
  name: 'outOfStock',
  standalone: true,
})
export class OutOfStockPipe implements PipeTransform {
  transform(product: Product | null | undefined): boolean {
    if (!product) return true;
    return (
      product.availableAmount <= 0 ||
      product.availableAmount < product.minOrderAmount
    );
  }
}
