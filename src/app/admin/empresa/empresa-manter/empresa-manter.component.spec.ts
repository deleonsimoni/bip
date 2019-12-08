import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaManterComponent } from './empresa-manter.component';

describe('EmpresaManterComponent', () => {
  let component: EmpresaManterComponent;
  let fixture: ComponentFixture<EmpresaManterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaManterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaManterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
