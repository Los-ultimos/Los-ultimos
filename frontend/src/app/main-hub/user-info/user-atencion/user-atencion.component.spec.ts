import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAtencionComponent } from './user-atencion.component';

describe('UserAtencionComponent', () => {
  let component: UserAtencionComponent;
  let fixture: ComponentFixture<UserAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
