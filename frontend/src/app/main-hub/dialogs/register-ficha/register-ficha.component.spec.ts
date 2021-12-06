import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFichaComponent } from './register-ficha.component';

describe('RegisterFichaComponent', () => {
  let component: RegisterFichaComponent;
  let fixture: ComponentFixture<RegisterFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
