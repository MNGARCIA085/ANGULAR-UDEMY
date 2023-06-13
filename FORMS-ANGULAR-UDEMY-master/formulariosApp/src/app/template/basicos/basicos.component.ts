import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  // @Input, para recibir un elemento que viene del padre
  // @Output para emitir un evento
  @ViewChild('miFormulario') miFormulario!:NgForm;


  // valores por defecto
  initForm = {
    producto:'rtx',
    precio: 0,
    existencias:10
  }


  constructor() { }

  ngOnInit(): void {
  }

  nombreValido():boolean {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched;
  }

  precioValido():boolean {
    return this.miFormulario?.controls['precio']?.value < 0 && this.miFormulario?.controls['precio']?.touched;
  }

  guardar(){
    console.log(this.miFormulario);
    // dsp. de un envío exitoso, por ejemplo hice un post a una api reseteo el form
    this.miFormulario.reset();
    /** tmb. le puedo pasar un objeto
     * 
     * reset( { precio:0, existencias:0 } ) 
     * 
     */
  }

}
