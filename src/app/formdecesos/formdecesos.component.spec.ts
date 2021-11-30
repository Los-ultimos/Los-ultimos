import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdecesosComponent } from './formdecesos.component';

describe('FormdecesosComponent', () => {
  let component: FormdecesosComponent;
  let fixture: ComponentFixture<FormdecesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdecesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdecesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
