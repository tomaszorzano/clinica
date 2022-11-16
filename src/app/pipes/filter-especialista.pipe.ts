import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEspecialista'
})
export class FilterEspecialistaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    
    if(arg != null){
      for (const post of value) {
        if (post.especialidad.nombre.indexOf(arg) > -1 || post.paciente.nombre.indexOf(arg) > -1
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
