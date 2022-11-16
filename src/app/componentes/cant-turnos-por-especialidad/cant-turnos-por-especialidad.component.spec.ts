import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantTurnosPorEspecialidadComponent } from './cant-turnos-por-especialidad.component';

describe('CantTurnosPorEspecialidadComponent', () => {
  let component: CantTurnosPorEspecialidadComponent;
  let fixture: ComponentFixture<CantTurnosPorEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantTurnosPorEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantTurnosPorEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
