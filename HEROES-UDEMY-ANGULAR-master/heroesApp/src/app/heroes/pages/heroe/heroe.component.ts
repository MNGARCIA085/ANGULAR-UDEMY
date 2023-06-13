import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [` 
    img {
      width:100%;
      border-radius:5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Hero;

  constructor(private activatedRoute: ActivatedRoute,
              private heroeService: HeroesService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroeService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe)
  }

  // para ir a los listados
  regresar(){
    this.router.navigate(['heroes/listado']);
  }




}
