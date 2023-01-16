import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInstallmentComponent } from './change-installment.component';

describe('ChangeInstallmentComponent', () => {
  let component: ChangeInstallmentComponent;
  let fixture: ComponentFixture<ChangeInstallmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInstallmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
