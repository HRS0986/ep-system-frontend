import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldCustomersComponent } from './old-customers.component';

describe('OldCustomersComponent', () => {
  let component: OldCustomersComponent;
  let fixture: ComponentFixture<OldCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
