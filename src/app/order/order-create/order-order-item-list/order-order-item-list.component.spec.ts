import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOrderItemListComponent } from './order-order-item-list.component';

describe('OrderOrderItemListComponent', () => {
  let component: OrderOrderItemListComponent;
  let fixture: ComponentFixture<OrderOrderItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOrderItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOrderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
