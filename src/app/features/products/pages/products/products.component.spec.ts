import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { Product } from '../../store/products.reducer';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore;
  const initialState = {
    products: {
      products: [
        {
          id: '1',
          name: 'Red apples',
          img: 'img-url',
          availableAmount: 10,
          minOrderAmount: 1,
          price: 5,
        },
      ],
      cart: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product cards', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(cards.length).toBe(1);
  });

  it('should open modal when showDetails is emitted', () => {
    const product: Product = initialState.products.products[0];
    component.openProductModal(product);
    fixture.detectChanges();
    expect(component.selectedProduct).toEqual(product);
  });

  it('should close modal', () => {
    component.selectedProduct = initialState.products.products[0];
    component.closeModal();
    expect(component.selectedProduct).toBeNull();
  });
});
