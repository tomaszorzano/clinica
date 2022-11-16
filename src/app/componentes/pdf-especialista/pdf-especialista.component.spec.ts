import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEspecialistaComponent } from './pdf-especialista.component';

describe('PdfEspecialistaComponent', () => {
  let component: PdfEspecialistaComponent;
  let fixture: ComponentFixture<PdfEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
