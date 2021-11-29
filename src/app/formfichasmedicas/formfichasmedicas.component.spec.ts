import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfichasmedicasComponent } from './formfichasmedicas.component';

describe('FormfichasmedicasComponent', () => {
  let component: FormfichasmedicasComponent;
  let fixture: ComponentFixture<FormfichasmedicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormfichasmedicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfichasmedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
