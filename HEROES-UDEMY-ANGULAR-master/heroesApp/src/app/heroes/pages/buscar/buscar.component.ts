import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  heroes: Hero[] = [];
  heroeSeleccionado: Hero | undefined;


  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  



  buscando() {

    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes );

  }

  
  
  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}


