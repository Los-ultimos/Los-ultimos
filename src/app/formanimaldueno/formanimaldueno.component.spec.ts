import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormanimalduenoComponent } from './formanimaldueno.component';

describe('FormanimalduenoComponent', () => {
  let component: FormanimalduenoComponent;
  let fixture: ComponentFixture<FormanimalduenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormanimalduenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormanimalduenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
