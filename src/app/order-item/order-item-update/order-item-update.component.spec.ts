import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemUpdateComponent } from './order-item-update.component';

describe('OrderItemUpdateComponent', () => {
  let component: OrderItemUpdateComponent;
  let fixture: ComponentFixture<OrderItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
