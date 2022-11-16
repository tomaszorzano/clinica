import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { elementAt, lastValueFrom, first } from 'rxjs';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { TurnosComponent } from '../turnos/turnos.component';

@Component({
  selector: 'app-cant-turnos-por-especialidad',
  templateUrl: './cant-turnos-por-especialidad.component.html',
  styleUrls: ['./cant-turnos-por-especialidad.component.css']
})
export class CantTurnosPorEspecialidadComponent implements OnInit {

  listaEspecialidades: any = [];
  listaTurnos: any = [];
  turnosPorEspecialidad: number = 0;
  dataTurnosXDia: any = [];
  cantidades: any = [];
  especialidades: any = [];

  title = 'myHighchart';

  data: any = [
  {
    name: 'Especialidades',
    data: this.cantidades
  },

  ];


  highcharts = Highcharts;
  chartOptions: any = {
    chart: {
      type: "column"
    },
    title: {
      text: "Cantidad de turnos por Especialidad"
    },
    xAxis: {
       categories: this.especialidades
    },
    yAxis: {
      title: {
        text: "Cantidad de Turnos"
      },
      allowDecimals: false
    },
    series: this.data
  };



  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuarioService) {
    this.turnoSvc.getTurnos().subscribe(turnos => {
      this.listaTurnos = turnos;
      this.cargarEspecialidades();
    });
  }

  ngOnInit(): void {
  }

  async cargarEspecialidades() {
    const aux = this.usuarioSvc.getEspecialidades().pipe(first());
    const especialidades = await lastValueFrom(aux);

    especialidades.forEach(element => {
      this.especialidades.push(element.nombre);
    });
    this.contarTurnosPorEspecialidad();

   
  }

  contarTurnosPorEspecialidad() {

    for (let i = 0; i < this.especialidades.length; i++) {
      console.log(this.especialidades.length);
      
      var item = this.especialidades[i];
      var turnosPorEspecialidad = this.listaTurnos.filter((element: any, index: any, array: any) => {
        return item == element.especialidad.nombre;
      });
      this.cantidades.push(turnosPorEspecialidad.length);
    }

    console.log(this.cantidades);


    console.log(this.chartOptions.xAxis.categories);
    console.log(this.chartOptions.series);
    Highcharts.chart('chart-line', this.chartOptions);

  }

  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      var nombreArchivo ='turnosxEspecialidad.pdf';
      PDF.save(nombreArchivo);
    });
  }

}