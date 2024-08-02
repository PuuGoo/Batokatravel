import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutmethodComponent } from './checkoutmethod.component';

describe('CheckoutmethodComponent', () => {
  let component: CheckoutmethodComponent;
  let fixture: ComponentFixture<CheckoutmethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutmethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
