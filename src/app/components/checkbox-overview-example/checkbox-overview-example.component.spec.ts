import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxOverviewExampleComponent } from './checkbox-overview-example.component';

describe('CheckboxOverviewExampleComponent', () => {
  let component: CheckboxOverviewExampleComponent;
  let fixture: ComponentFixture<CheckboxOverviewExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxOverviewExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
