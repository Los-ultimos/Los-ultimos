import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDecesosComponent } from './user-decesos.component';

describe('UserDecesosComponent', () => {
  let component: UserDecesosComponent;
  let fixture: ComponentFixture<UserDecesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDecesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDecesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
