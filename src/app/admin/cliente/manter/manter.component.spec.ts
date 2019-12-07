import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterComponent } from './manter.component';

describe('ManterComponent', () => {
  let component: ManterComponent;
  let fixture: ComponentFixture<ManterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
