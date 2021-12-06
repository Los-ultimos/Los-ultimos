import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimalesComponent } from './user-animales.component';

describe('UserAnimalesComponent', () => {
  let component: UserAnimalesComponent;
  let fixture: ComponentFixture<UserAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnimalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
