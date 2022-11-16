import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPaciente'
})
export class FilterPacientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    
    if(arg != null){
      console.log(value);
      
      for (const post of value) {
        if (post.especialidad.nombre.indexOf(arg) > -1 || post.especialista.nombre.indexOf(arg) > -1
        || post.especialista.apellido.indexOf(arg) > -1 || post.paciente.nombre.indexOf(arg) > -1
        || post.paciente.apellido.indexOf(arg) > -1) {

          resultPosts.push(post);
        };
      };
      return resultPosts;
    }
    else{
      return value;
    }
    
  }

}
