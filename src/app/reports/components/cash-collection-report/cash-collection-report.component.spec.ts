import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollectionReportComponent } from './cash-collection-report.component';

describe('CashCollectionReportComponent', () => {
  let component: CashCollectionReportComponent;
  let fixture: ComponentFixture<CashCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
