import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.css']
})
export class LogIngresosComponent implements OnInit {

  logs:Array<any> = [];

  constructor(private usuarioSvc: UsuarioService) {
    this.usuarioSvc.getCollection("logIngresosClinica")
    .subscribe((lista)=>{
      this.logs = lista;
    });
   }

  ngOnInit(): void {
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "logsUsuarios.xlsx");

  }
}