import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAtencionComponent } from './register-atencion.component';

describe('RegisterAtencionComponent', () => {
  let component: RegisterAtencionComponent;
  let fixture: ComponentFixture<RegisterAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
