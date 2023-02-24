import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTagComponent } from './add-edit-tag.component';

describe('AddEditTagComponent', () => {
  let component: AddEditTagComponent;
  let fixture: ComponentFixture<AddEditTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditTagComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
