import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCollectorComponent } from './listar-collector.component';

describe('ListarCollectorComponent', () => {
  let component: ListarCollectorComponent;
  let fixture: ComponentFixture<ListarCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
