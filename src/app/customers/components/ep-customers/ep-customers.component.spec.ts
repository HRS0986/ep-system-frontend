import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpCustomersComponent } from './ep-customers.component';

describe('EpCustomersComponent', () => {
  let component: EpCustomersComponent;
  let fixture: ComponentFixture<EpCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
