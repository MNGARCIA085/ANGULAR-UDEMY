import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
 
@Component({
 selector: 'app-pais-input',
 templateUrl: './pais-input.component.html',
 styles: [
 ]
})
export class PaisInputComponent implements OnInit { // necesito el OnInit
 
 @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); // emito un string
 
 debouncer: Subject<string> = new Subject(); // Subject permite crear un observable manualmente
       // la idea es poder usar RxJs
 
 // queremos que el debouncer se emita cuando dejo de escribir
 
 // implemento el OnInit
 // se dispara una única vez cuando el componente es creado
 ngOnInit() {
   this.debouncer.
       pipe(debounceTime(300)).subscribe( valor => { // valor es el término de búsqueda
       //console.log('debouncer:',valor);
       this.onDebounce.emit(valor);
   })
   // debounceTime(300) básicamente dice no emitas el suscribe hasta que el obsevable
   // deje de emitir valores por los próximos 300ms
 }
 
 
 termino: string = '';
 
 buscar(){
   // emito
   this.onEnter.emit(this.termino);
 }
 
 teclaPresionada(event: any) {
   this.debouncer.next(this.termino); // llamo al debouncer y emito un valor
      // el siguiente valor que emito es this.termino
      // el next esta suscrito arriba en "this.debouncer.subscribe"
      // asi cuando alguien presiona una tecla manda a llamar al next que
      // esta suscrito y hace lo que corresponda en ese parte el código
  
 }
 
 
}
