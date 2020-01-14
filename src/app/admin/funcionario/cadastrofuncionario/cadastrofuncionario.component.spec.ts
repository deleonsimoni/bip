import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrofuncionarioComponent } from './cadastrofuncionario.component';

describe('CadastrofuncionarioComponent', () => {
  let component: CadastrofuncionarioComponent;
  let fixture: ComponentFixture<CadastrofuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrofuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrofuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
