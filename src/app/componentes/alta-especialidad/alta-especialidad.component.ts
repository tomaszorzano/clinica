import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent implements OnInit {

  formulario!: FormGroup;
  especialidad!: string;

  constructor(public fv: FormBuilder, private usuarioSvc: UsuarioService) { 
    this.formulario = fv.group({
      especialidad: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.especialidad = this.formulario.controls['especialidad'].value;
    this.usuarioSvc.addEspecilidad(this.especialidad);
  }

}