import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspecialidadComponent } from './lista-especialidad.component';

describe('ListaEspecialidadComponent', () => {
  let component: ListaEspecialidadComponent;
  let fixture: ComponentFixture<ListaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
