import { Component, Input  } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
})
export class HeroeTarjetaComponent {

  constructor() { }

  // para recibir el héroe
  @Input() heroe!:Hero;

}
