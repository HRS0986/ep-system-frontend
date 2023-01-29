import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTablesComponent } from './customer-tables.component';

describe('CustomerTablesComponent', () => {
  let component: CustomerTablesComponent;
  let fixture: ComponentFixture<CustomerTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
