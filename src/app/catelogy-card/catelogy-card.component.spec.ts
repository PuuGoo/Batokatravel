import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogyCardComponent } from './catelogy-card.component';

describe('CatelogyCardComponent', () => {
  let component: CatelogyCardComponent;
  let fixture: ComponentFixture<CatelogyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatelogyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatelogyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
