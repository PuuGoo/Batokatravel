import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogiesComponent } from './catelogies.component';

describe('CatelogiesComponent', () => {
  let component: CatelogiesComponent;
  let fixture: ComponentFixture<CatelogiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatelogiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatelogiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
