import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterfuncionarioComponent } from './manterfuncionario.component';

describe('ManterfuncionarioComponent', () => {
  let component: ManterfuncionarioComponent;
  let fixture: ComponentFixture<ManterfuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterfuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
