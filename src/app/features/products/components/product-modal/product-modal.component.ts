import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../store/products.reducer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  @Input() product!: Product | null;
  @Input() amount!: number;
  @Output() amountChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<{ product: Product; amount: number }>();
  imageError = false;
  onAdd() {
    if (this.product) {
      this.add.emit({ product: this.product, amount: this.amount });
    }
  }
  onImgError() {
    this.imageError = true;
  }
}
