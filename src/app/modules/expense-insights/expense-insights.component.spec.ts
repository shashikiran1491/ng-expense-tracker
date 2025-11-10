import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseInsightsComponent } from './expense-insights.component';

describe('ExpenseInsightsComponent', () => {
  let component: ExpenseInsightsComponent;
  let fixture: ComponentFixture<ExpenseInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ExpenseInsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
