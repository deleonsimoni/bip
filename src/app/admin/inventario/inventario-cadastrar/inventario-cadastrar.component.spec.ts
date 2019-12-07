import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioCadastrarComponent } from './inventario-cadastrar.component';

describe('InventarioCadastrarComponent', () => {
  let component: InventarioCadastrarComponent;
  let fixture: ComponentFixture<InventarioCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
