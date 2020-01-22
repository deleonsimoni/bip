import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterempresaComponent } from './manterempresa.component';

describe('ManterempresaComponent', () => {
  let component: ManterempresaComponent;
  let fixture: ComponentFixture<ManterempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
