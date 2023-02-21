import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackwardConfirmPopupComponent } from './backward-confirm-popup.component';

describe('BackwardConfirmPopupComponent', () => {
  let component: BackwardConfirmPopupComponent;
  let fixture: ComponentFixture<BackwardConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackwardConfirmPopupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackwardConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
