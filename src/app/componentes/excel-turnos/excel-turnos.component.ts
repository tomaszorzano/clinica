import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { TurnoService } from 'src/app/services/turno.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-turnos',
  templateUrl: './excel-turnos.component.html',
  styleUrls: ['./excel-turnos.component.css']
})
export class ExcelTurnosComponent implements OnInit {
  fileName = 'ExcelSheet.xlsx';

  @Input() usuarioAMostrar: Usuario = new Usuario();
  listaTurnos: any = [];
  turnosLista: any= [];
  lista: any= [];
  public mostrar: boolean = false;

  constructor(private turnoSvc: TurnoService) {
    console.log(this.usuarioAMostrar);
  }

  ngOnInit(): void {
    console.log(this.usuarioAMostrar);

    
  }


  async ngOnChanges(changes: SimpleChanges): Promise<void> {

    if (this.usuarioAMostrar.nombre != undefined) {
      this.mostrar = true;
      console.log("usuario");
      
      this.turnosLista = this.turnoSvc.db.collection("turnos", ref => ref.where('paciente.email', '==', this.usuarioAMostrar.email));

      this.lista = await this.buscarTurnos();
      console.log(this.lista);
    }
  }

  async buscarTurnos() {
    this.listaTurnos = new Array<Turno>();
    this.turnosLista.snapshotChanges().pipe(
      map((data: any) => {
        data.map((turno: any) => {
          var turnoNuevo: Turno = new Turno();
          console.log(turno);
          turnoNuevo.id = turno.payload.doc.id;
          turnoNuevo.idEspecialista = turno.payload.doc.data().idEspecialista;
          turnoNuevo.idPaciente = turno.payload.doc.data().idPaciente;
          turnoNuevo.especialidad = turno.payload.doc.data().especialidad;
          turnoNuevo.paciente = turno.payload.doc.data().paciente;
          turnoNuevo.especialista = turno.payload.doc.data().especialista;
          //turnoNuevo.id = historia.payload.doc.id;
          turnoNuevo.especialidad = turno.payload.doc.data().especialidad;
          turnoNuevo.fecha = turno.payload.doc.data().fecha;
          turnoNuevo.hora = turno.payload.doc.data().hora;
          turnoNuevo.comentariosAdmin = turno.payload.doc.data().comentariosAdmin;
          turnoNuevo.comentariosEspecialista = turno.payload.doc.data().comentariosEspecialista;
          turnoNuevo.comentariosPaciente = turno.payload.doc.data().comentariosPaciente;

          turnoNuevo.historiaClinica = turno.payload.doc.data().historiaClinica;
          // turnoNuevo.altura = turno.payload.doc.data().historiaClinica.altura;
          // turnoNuevo.peso = turno.payload.doc.data().historiaClinica.peso;
          // turnoNuevo.clave1 = turno.payload.doc.data().historiaClinica.clave1;
          // turnoNuevo.clave2 = turno.payload.doc.data().historiaClinica.clave2;
          // //turnoNuevo.id = historia.payload.doc.id;
          // turnoNuevo.valor1 = turno.payload.doc.data().historiaClinica.valor1;
          // turnoNuevo.valor2 = turno.payload.doc.data().historiaClinica.valor2;
          // turnoNuevo.turnoId = turno.payload.doc.data().historiaClinica.turnoId;
          this.listaTurnos.push(turnoNuevo);
          

        })
      })
    ).subscribe();
    return this.listaTurnos;
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}