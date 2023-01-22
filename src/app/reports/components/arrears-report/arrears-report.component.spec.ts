import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrearsReportComponent } from './arrears-report.component';

describe('ArrearsReportComponent', () => {
  let component: ArrearsReportComponent;
  let fixture: ComponentFixture<ArrearsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrearsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
