import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdocumentoComponent } from './formdocumento.component';

describe('FormdocumentoComponent', () => {
  let component: FormdocumentoComponent;
  let fixture: ComponentFixture<FormdocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
