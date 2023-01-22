import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedCustomersComponent } from './advanced-customers.component';

describe('AdvancedCustomersComponent', () => {
  let component: AdvancedCustomersComponent;
  let fixture: ComponentFixture<AdvancedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
