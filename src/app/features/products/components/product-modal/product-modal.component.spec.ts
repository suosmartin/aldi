import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductModalComponent } from './product-modal.component';
import { Product } from '../../store/products.reducer';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit add event with product and amount when onAdd is called', () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      img: 'test.jpg',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
    };
    component.product = product;
    component.amount = 2;
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith({ product, amount: 2 });
  });

  it('should emit close event when close button is clicked', () => {
    component.product = {
      id: '1',
      name: 'Test Product',
      img: 'test.jpg',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
    };
    fixture.detectChanges();
    spyOn(component.close, 'emit');
    const closeBtn = fixture.debugElement.query(By.css('.close-btn'));
    closeBtn.nativeElement.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit amountChange event when amount input changes', () => {
    component.product = {
      id: '1',
      name: 'Test Product',
      img: 'test.jpg',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
    };
    fixture.detectChanges();
    spyOn(component.amountChange, 'emit');
    const input = fixture.debugElement.query(By.css('input[type="number"]'));
    input.nativeElement.value = '3';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new Event('ngModelChange'));
    fixture.detectChanges();
    expect(component.amountChange.emit).toHaveBeenCalled();
  });

  it('should set imageError to true when onImgError is called', () => {
    component.imageError = false;
    component.onImgError();
    expect(component.imageError).toBeTrue();
  });
});
