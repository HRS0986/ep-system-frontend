import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTagsComponent } from './all-tags.component';

describe('CustomerTagsComponent', () => {
  let component: AllTagsComponent;
  let fixture: ComponentFixture<AllTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTagsComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
