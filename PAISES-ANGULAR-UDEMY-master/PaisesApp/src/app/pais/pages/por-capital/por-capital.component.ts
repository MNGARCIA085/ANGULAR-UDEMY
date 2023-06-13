import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino:string ='';
 hayError: boolean = false;
 paises: Country[] = [];
 
 // inyecto el servicio
 constructor( private paisService: PaisService ){};
 
 
 sugerencias(termino:string){
   this.hayError = false;
   // TODO CREAR SUGERENCIAS
 }
 
 
 buscar(termino: string){
   this.hayError = false; // quita el error anterior de haberlo
   this.termino = termino;
 
   // uso el servicio de busqueda
   this.paisService.buscarCapital(this.termino).subscribe( (paises) => {
     console.log(paises);
     this.paises = paises;
   }, (err) => {
     console.log('Error');
     this.hayError = true;
     this.paises = []; // si hay error países será un arreglo vacío
   });
 }

}
