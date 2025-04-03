import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificadorSemanalComponent } from './planificador-semanal.component';

describe('PlanificadorSemanalComponent', () => {
  let component: PlanificadorSemanalComponent;
  let fixture: ComponentFixture<PlanificadorSemanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanificadorSemanalComponent]
    });
    fixture = TestBed.createComponent(PlanificadorSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
