import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styles: [`
    mat-card{
      margintop:20px;
    }
  `]
})
export class ListadosComponent implements OnInit {

  heroes: Hero[] = [];

  constructor( private heroeService: HeroesService) { }

  ngOnInit(): void {

      this.heroeService.getHeroes()
          .subscribe(heroes => 
                this.heroes = heroes
              );

  }

}
