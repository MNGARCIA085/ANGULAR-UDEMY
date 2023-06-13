import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';
 
@Component({
 selector: 'app-por-pais',
 templateUrl: './por-pais.component.html',
 styles: [ `
    li{
      cursor:pointer
    }  
  `
 ]
})
export class PorPaisComponent {
 
 termino:string ='';
 hayError: boolean = false;
 paises: Country[] = [];
 paisesSugeridos: Country[] = [];
 mostrarSugerencias: boolean = false;
 
 // inyecto el servicio
 constructor( private paisService: PaisService ){};
 
 
 sugerencias( termino: string ) {
  this.hayError = false;
  this.termino = termino;
  this.mostrarSugerencias = true;
  
  this.paisService.buscarPais( termino )
    .subscribe( 
      paises => this.paisesSugeridos = paises.splice(0,5),
      (err) => this.paisesSugeridos = []
    );

    console.log(this.paisesSugeridos);

}

buscarSugerido( termino: string ) {
  this.buscar( termino );
}
 
 
 buscar(termino: string){
   this.hayError = false; // quita el error anterior de haberlo
   this.termino = termino;
 
   // uso el servicio de busqueda
   this.paisService.buscarPais(this.termino).subscribe( (paises) => {
     console.log(paises);
     this.paises = paises;
   }, (err) => {
     console.log('Error');
     this.hayError = true;
     this.paises = []; // si hay error países será un arreglo vacío
   });
 }



}
