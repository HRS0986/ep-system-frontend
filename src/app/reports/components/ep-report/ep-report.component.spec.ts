import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpReportComponent } from './ep-report.component';

describe('EpReportComponent', () => {
  let component: EpReportComponent;
  let fixture: ComponentFixture<EpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
