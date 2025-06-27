import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
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
      cart: [{ productId: '1', quantity: 2 }],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards', async () => {
    await fixture.whenStable();

    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('app-cart-item-card'));
    expect(cards.length).toBe(1);
  });

  it('should call onQuantityChange', () => {
    spyOn(component, 'onQuantityChange');
    const card = fixture.debugElement.query(By.css('app-cart-item-card'));
    // Manually call the handler as Angular would
    card.triggerEventHandler('quantityChange', 3);
    // The first argument (productId) is resolved from the template context, which is '1' in your mock data
    expect(component.onQuantityChange).toHaveBeenCalledWith('1', 3);
  });

  it('should call onRemoveItem when remove is triggered', () => {
    spyOn(component, 'onRemoveItem');
    const card = fixture.debugElement.query(By.css('app-cart-item-card'));
    card.triggerEventHandler('remove', '1');
    expect(component.onRemoveItem).toHaveBeenCalledWith('1');
  });
});
