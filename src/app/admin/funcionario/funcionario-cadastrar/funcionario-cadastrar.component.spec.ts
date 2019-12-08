import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCadastrarComponent } from './funcionario-cadastrar.component';

describe('FuncionarioCadastrarComponent', () => {
  let component: FuncionarioCadastrarComponent;
  let fixture: ComponentFixture<FuncionarioCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
