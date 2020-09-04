import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolhaDePontoComponent } from './folha-de-ponto.component';

describe('FolhaDePontoComponent', () => {
  let component: FolhaDePontoComponent;
  let fixture: ComponentFixture<FolhaDePontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolhaDePontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolhaDePontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
