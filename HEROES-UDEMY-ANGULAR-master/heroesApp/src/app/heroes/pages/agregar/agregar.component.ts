import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:50%;
      border-radius:5px
    }  
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc:'DC'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel'
    }
  ]

  heroe: Hero = {
    superhero:'',
    publisher:Publisher.DCComics,
    alter_ego:'',
    characters:'',
    first_appearance:''
  }


  // ActivatedRouted lo voy a usar para obtener params de la URL (el id en este caso)
  // Router para la navegación (voy a de agregar a editar dsp. de añadir exitosamente)

  constructor(private heroeService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private dialog: MatDialog
    ) { }

  ngOnInit(): void {
      

      
      console.log(this.router.url);

      if (!this.router.url.includes('editar')){
        return
      }


      // sólo se llama si estoy en editar
      this.activatedRoute.params
          .pipe(
            switchMap( ({id}) => this.heroeService.getHeroePorId(id))
          )
          .subscribe(heroe => this.heroe = heroe) // cargo los datos del héroe
  }


  guardar(){
    console.log(this.heroe);
    // validación simple
    if (this.heroe.superhero.trim().length === 0){
      return
    }


    // si hay id => edito, sino agrego
    if (this.heroe.id){
      // edito
      this.heroeService.actualizarHeroe(this.heroe)
          .subscribe(heroe => this.mostarSnackbar('Registro actualizado'))
    } else {
      // actualizo
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
           // redirecciono a editar
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostarSnackbar('Registro ingresado');
        })
     
    }

  }


  // borrar héroe
  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{
                                  width:'250px',
                                  data:this.heroe
                                });

    dialog.afterClosed().subscribe( (result) => {
          console.log(result); // es true o false según quiera o nop borrar
          if (result){
            // borro
            this.heroeService.borrarHeroe(this.heroe.id!)
                .subscribe(resp => {
                  this.router.navigate(['/heroe'])
                })
          }
    })

    
  }


  // snackbar
  mostarSnackbar(msje:string):void{
    this.snackbar.open(msje,'ok!',{duration:2500});
  }




}
