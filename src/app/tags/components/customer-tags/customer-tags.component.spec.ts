import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTagsComponent } from './customer-tags.component';

describe('CustomerTagsComponent', () => {
  let component: CustomerTagsComponent;
  let fixture: ComponentFixture<CustomerTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTagsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
