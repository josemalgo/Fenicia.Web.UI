import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOrderItemAddComponent } from './order-order-item-add.component';

describe('OrderOrderItemAddComponent', () => {
  let component: OrderOrderItemAddComponent;
  let fixture: ComponentFixture<OrderOrderItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOrderItemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOrderItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
