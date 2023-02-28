import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaleCustomersComponent } from './resale-customers.component';

describe('ResaleCustomersComponent', () => {
  let component: ResaleCustomersComponent;
  let fixture: ComponentFixture<ResaleCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResaleCustomersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaleCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
