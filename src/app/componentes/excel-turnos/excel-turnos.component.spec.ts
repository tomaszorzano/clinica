import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelTurnosComponent } from './excel-turnos.component';

describe('ExcelTurnosComponent', () => {
  let component: ExcelTurnosComponent;
  let fixture: ComponentFixture<ExcelTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
