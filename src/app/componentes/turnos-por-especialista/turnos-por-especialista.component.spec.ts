import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPorEspecialistaComponent } from './turnos-por-especialista.component';

describe('TurnosPorEspecialistaComponent', () => {
  let component: TurnosPorEspecialistaComponent;
  let fixture: ComponentFixture<TurnosPorEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPorEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPorEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
