import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroempresaComponent } from './cadastroempresa.component';

describe('CadastroempresaComponent', () => {
  let component: CadastroempresaComponent;
  let fixture: ComponentFixture<CadastroempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
