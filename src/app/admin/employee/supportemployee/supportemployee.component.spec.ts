import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportemployeeComponent } from './supportemployee.component';

describe('SupportemployeeComponent', () => {
  let component: SupportemployeeComponent;
  let fixture: ComponentFixture<SupportemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
