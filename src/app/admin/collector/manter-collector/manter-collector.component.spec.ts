import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterCollectorComponent } from './manter-collector.component';

describe('ManterCollectorComponent', () => {
  let component: ManterCollectorComponent;
  let fixture: ComponentFixture<ManterCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
