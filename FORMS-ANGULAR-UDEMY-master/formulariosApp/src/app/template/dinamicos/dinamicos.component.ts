import { Component, OnInit } from '@angular/core';




interface Persona{
  nombre:string,
  favoritos:Favorito[]
}

interface Favorito{
  id:number,
  nombre:string
}




@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  nuevoJuego: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    console.log('dsfds');
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index,1);
  }

  agregarJuego(){
    // obs: los ids son en realidad de la base de datos
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push(nuevoFavorito);
    this.nuevoJuego = '';
  }


  persona: Persona = 
              { 'nombre': 'Marcos',
                'favoritos': [
                        {id:1, 'nombre':'death note'},
                        {id:1, 'nombre':'spy x family'},
                ]
              }
  

}
