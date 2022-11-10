import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEspecialidadComponent } from './alta-especialidad.component';

describe('AltaEspecialidadComponent', () => {
  let component: AltaEspecialidadComponent;
  let fixture: ComponentFixture<AltaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
