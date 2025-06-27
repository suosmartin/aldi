import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../store/products.reducer';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.scss',
})
export class CartItemCardComponent {
  @Input() product!: Product;
  @Input() quantity!: number;
  @Output() quantityChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<string>();
  newQuantity: number = 0;
  imageError = false;

  onQuantityChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    console.log('test', value);
    this.quantityChange.emit(this.newQuantity);
  }
  ngOnInit() {
    this.newQuantity = this.quantity;
  }
  onImgError() {
    this.imageError = true;
  }
}
