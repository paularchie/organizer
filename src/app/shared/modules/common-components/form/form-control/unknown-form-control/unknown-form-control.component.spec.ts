import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownFormControlComponent } from './unknown-form-control.component';

describe('UnknownFormControlComponent', () => {
  let component: UnknownFormControlComponent;
  let fixture: ComponentFixture<UnknownFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
