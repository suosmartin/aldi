import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../store/products.reducer';
import { OutOfStockPipe } from '../../../../shared/pipes/out-of-stock.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, OutOfStockPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();
  @Output() showDetails = new EventEmitter<Product>();

  imgSrc: string | null = null;
  imageError = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.imgSrc = this.product?.img || null;
      this.imageError = false;
    }
  }

  onImgError() {
    this.imageError = true;
  }

  // unimplemented :(
  onCardClick() {
    if (this.product?.id) {
      window.open(`/products/product/${this.product.id}`, '_blank');
    }
  }
  openDetailsModal(event: MouseEvent) {
    this.showDetails.emit(this.product);
  }
  isDisabled(product: Product): boolean {
    return product.availableAmount === 0;
  }
}
