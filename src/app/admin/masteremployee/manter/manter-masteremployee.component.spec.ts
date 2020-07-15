import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterMasterEmployeeComponent } from './manter-masteremployee.component';

describe('ManterMasterEmployeeComponent', () => {
  let component: ManterMasterEmployeeComponent;
  let fixture: ComponentFixture<ManterMasterEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterMasterEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterMasterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
