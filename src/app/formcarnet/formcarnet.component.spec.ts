import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcarnetComponent } from './formcarnet.component';

describe('FormcarnetComponent', () => {
  let component: FormcarnetComponent;
  let fixture: ComponentFixture<FormcarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
