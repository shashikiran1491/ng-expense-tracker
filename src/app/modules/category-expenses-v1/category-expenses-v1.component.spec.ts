import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExpensesV1Component } from './category-expenses-v1.component';

describe('CategoryExpensesV1Component', () => {
  let component: CategoryExpensesV1Component;
  let fixture: ComponentFixture<CategoryExpensesV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CategoryExpensesV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryExpensesV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
