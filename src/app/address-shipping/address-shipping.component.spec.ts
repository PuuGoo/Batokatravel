import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressShippingComponent } from './address-shipping.component';

describe('AddressShippingComponent', () => {
  let component: AddressShippingComponent;
  let fixture: ComponentFixture<AddressShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressShippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
