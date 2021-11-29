import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadertoolbarComponent } from './headertoolbar.component';

describe('HeadertoolbarComponent', () => {
  let component: HeadertoolbarComponent;
  let fixture: ComponentFixture<HeadertoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadertoolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadertoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
