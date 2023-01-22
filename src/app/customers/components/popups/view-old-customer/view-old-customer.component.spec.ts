import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOldCustomerComponent } from './view-old-customer.component';

describe('ViewOldCustomerComponent', () => {
  let component: ViewOldCustomerComponent;
  let fixture: ComponentFixture<ViewOldCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOldCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOldCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
