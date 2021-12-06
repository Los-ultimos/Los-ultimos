import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreporteComponent } from './formreporte.component';

describe('FormreporteComponent', () => {
  let component: FormreporteComponent;
  let fixture: ComponentFixture<FormreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormreporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
